import json
import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np
from supabase_py import create_client
from collections import defaultdict
from multiprocessing import Pool
from flask import Flask, request, jsonify
import logging
import requests

# Initialize logging
logging.basicConfig(level=logging.DEBUG)

# Initialize Supabase client
supabase = create_client("https://kngkkgipbghzkzrmoawb.supabase.co/", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuZ2trZ2lwYmdoemt6cm1vYXdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczMTgxMzcsImV4cCI6MjAxMjg5NDEzN30.2nfCbx_C2UsoiGUFpNrfCjf1E3zWsOyZVYw1U2Nr-O8")

# Initialize Flask
app = Flask(__name__)

@app.route('/get_uuid', methods=['POST'])
def get_uuid():
    uuid = request.json
    print(uuid)
    if uuid:
        return {"message": f"Received UUID: {uuid}"}, 200
    else:
        return {"message": "UUID not found in header"}, 400

# Function to fetch data from Supabase and convert to pandas DataFrame
def fetch_and_convert_to_dataframe(supabase, table_name):
    rows = supabase.table(table_name).select("*").execute()
    if rows['data']:
        print(f"Data fetched from {table_name}")
        return pd.DataFrame(rows['data'])
    else:
        print(f"No data in {table_name} or table doesn't exist.")
        return None
    # Fetch a profile directly from Supabase using HTTP requests
def fetch_profile_directly(profile_id):
    url = "https://kngkkgipbghzkzrmoawb.supabase.co/rest/v1/profiles"
    params = {
      "select": "*",
      "id": f"eq.{profile_id}"
    }
    headers = {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuZ2trZ2lwYmdoemt6cm1vYXdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczMTgxMzcsImV4cCI6MjAxMjg5NDEzN30.2nfCbx_C2UsoiGUFpNrfCjf1E3zWsOyZVYw1U2Nr-O8"} 
    response = requests.get(url, params=params, headers=headers, verify=False)

    # Debugging lines
    print("Status Code:", response.status_code)
    print("Response:", response.text)

    # Checking if the request was successful
    if response.status_code == 200:
        try:
            return response.json()
        except json.JSONDecodeError:
            print("Could not decode the response into JSON.")
            return None
    else:
        print(f"Failed to get data: {response.reason}")
        return None
        return response.json()  # This will return the data from Supabase as a JSON object
# Update user details in the Supabase table named 'profiles'
def update_user_in_supabase(supabase, user_id, updated_data):
    response = supabase.table('profiles').update(updated_data, ['id']).eq('id', user_id).execute()
    if 'error' in response:
        print(f"Failed to update user {user_id}. Error: {response['error']}")
        return False
    else:
        print(f"Successfully updated user {user_id}")
        return True
# Fetch a profile using Supabase-py and profile ID
def fetch_profile_by_id(supabase, profile_id):
    #rows = supabase.table("profiles").select("*").eq("id", profile_id).execute()
    profile_id = "2117d52b-726d-4dab-a61a-67c0ca5ed6c6"  # Replace with the actual profile_id you are using
    rows = fetch_profile_directly(profile_id)
    if rows['data']:
        return pd.DataFrame(rows['data']).iloc[0]
    else:
        print(f"No profile found with ID {profile_id}")
        return None
    
# Function to check if friends are present in an event
def friends_present(row, friend_list, np_events):
    if friend_list is None:
        return 0
    for attendee in np_events[row, 8]:  # Assuming attendees are in the 8th index
        if attendee in friend_list:
            return 1
    return 0

def auth_is_friend(row, friend_list, np_events):
    if friend_list is None:
        return 0
    return 1 if np_events[row, 2] in friend_list else 0  # Assuming organizer is in the 2nd index

num_events = 36  # Replace with the actual number of events you have
num_features = 2  # Right now we have 2 features: friendsPresent, AuthIsFriend
friend_list = np_profiles[row, 10]
feature_matrix = np.zeros((num_events, num_features))
np_events = 36

# Populate the feature matrix
for row in range(num_events):
    feature_matrix[row, 0] = friends_present(row, friend_list, np_events)
    feature_matrix[row, 1] = auth_is_friend(row, friend_list, np_events)


#generate labels
y = np.random.rand(num_events)
#train that guy
model = LinearRegression()
model.fit(feature_matrix, y)
# A placeholder function for event scoring based on a user profile
def compute_event_score(profile_id, event_row,  trained_model):
    new_feature_vector = np.zeros(num_features)
    new_feature_vector[0] = friends_present(profile_id, friend_list, event_row)
    new_feature_vector[1] = auth_is_friend(profile_id, friend_list, event_row)
    # Use the trained model to make a prediction
    predicted_score = trained_model.predict([new_feature_vector])
    return predicted_score
# Compute a score for a specific user-event pair
def compute_score_for_user_event_pair(user_row, event_row):
    user_id = user_row['id']
    event_id = event_row['id']
    score = compute_event_score(user_row, event_row)
    return user_id, event_id, score

# Entry point of the Python script
if __name__ == '__main__':
    profile_id = "2117d52b-726d-4dab-a61a-67c0ca5ed6c6" 
 # Fetch profile by ID
    user = fetch_profile_by_id(supabase, profile_id)
    friendList = None
    if user['friends'] is not None:
        friendList = set(user['friends'])
    
    # Number of ML variables
    numMLvars = 49

    # Fetch data from Supabase
    data_events = fetch_and_convert_to_dataframe(supabase, "events")

    np_events = data_events.to_numpy()
    with open("debug_output.txt", "w") as f:
        f.write(str(np_events[0, 8]))

    logging.debug(f"Debug: Fetched data: {np_events[0, 8]}")

    ml_vars_np = np.zeros((np_events.shape[0], 52))

# Main function to rank events for users
    def rank_events_for_users(data_profiles, data_events):
        if data_profiles is None or data_events is None:
            print("One of the dataframes is None. Exiting.")
            return None

        if data_profiles.empty or data_events.empty:
            print("One of the dataframes is empty. Exiting.")
            return None

        user_event_scores = defaultdict(dict)
        pool = Pool()
        user_event_pairs = [(user_row, event_row) for _, user_row in data_profiles.iterrows() for _, event_row in data_events.iterrows()]
        scores = pool.starmap(compute_score_for_user_event_pair, user_event_pairs)

        for user_id, event_id, score in scores:
            user_event_scores[user_id][event_id] = score

        pool.close()
        pool.join()

        for user_id in user_event_scores.keys():
            top_event_id = max(user_event_scores[user_id], key=user_event_scores[user_id].get)
            update_user_in_supabase(supabase, user_id, {'top_event_id': top_event_id})
        
        return user_event_scores

   # Run the Flask app

app.run(debug=True)
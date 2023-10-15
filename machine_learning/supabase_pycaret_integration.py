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

# Your existing functions
def fetch_and_convert_to_dataframe(supabase, table_name):
    rows = supabase.table(table_name).select("*").execute()
    if rows['data']:
        print(f"Data fetched from {table_name}")
        return pd.DataFrame(rows['data'])
    else:
        print(f"No data in {table_name} or table doesn't exist.")
        return None
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

def update_user_in_supabase(supabase, user_id, updated_data):
    response = supabase.table('profiles').update(updated_data, ['id']).eq('id', user_id).execute()
    if 'error' in response:
        print(f"Failed to update user {user_id}. Error: {response['error']}")
        return False
    else:
        print(f"Successfully updated user {user_id}")
        return True

def fetch_profile_by_id(supabase, profile_id):
    #rows = supabase.table("profiles").select("*").eq("id", profile_id).execute()
    profile_id = "2117d52b-726d-4dab-a61a-67c0ca5ed6c6"  # Replace with the actual profile_id you are using
    rows = fetch_profile_directly(profile_id)
    if rows['data']:
        return pd.DataFrame(rows['data']).iloc[0]
    else:
        print(f"No profile found with ID {profile_id}")
        return None

def compute_event_score(profile_id, event_row):
    model = LinearRegression()
    import random
    return random.random()

def compute_score_for_user_event_pair(user_row, event_row):
    user_id = user_row['id']
    event_id = event_row['id']
    score = compute_event_score(user_row, event_row)
    return user_id, event_id, score

# Your existing code logic remains largely the same
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

    # Define the function to rank events for users
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
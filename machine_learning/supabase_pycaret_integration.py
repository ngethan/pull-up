# Importing required libraries
import json  # For JSON operations
import pandas as pd  # Data manipulation library
from sklearn.linear_model import LinearRegression  # Machine learning model
import numpy as np  # Numerical operations
from supabase_py import create_client  # Supabase client
from collections import defaultdict  # Dictionary subclass
from multiprocessing import Pool  # Parallel processing
from flask import Flask, request, jsonify  # Web framework
import logging  # Logging utility
import requests  # HTTP requests

# Initialize logging
logging.basicConfig(level=logging.DEBUG)

# Create a Supabase client to interact with your Supabase database
# Replace the URL and key with your own
supabase = create_client("your_url", "your_key")

# Initialize a Flask app
app = Flask(__name__)

# Define an endpoint to get a UUID from a POST request
@app.route('/get_uuid', methods=['POST'])
def get_uuid():
    uuid = request.json  # Get JSON data from request
    # Log and return the received UUID, else return an error message
    if uuid:
        return {"message": f"Received UUID: {uuid}"}, 200
    else:
        return {"message": "UUID not found in header"}, 400

# Fetch data from Supabase and convert it into a pandas DataFrame
def fetch_and_convert_to_dataframe(supabase, table_name):
    rows = supabase.table(table_name).select("*").execute()
    if rows['data']:
        return pd.DataFrame(rows['data'])
    else:
        return None

# Fetch a user profile directly using HTTP requests
def fetch_profile_directly(profile_id):
    # Set the URL and headers
    url = "your_url"
    params = {"select": "*", "id": f"eq.{profile_id}"}
    headers = {"Authorization": "Bearer your_token"}
    # Make the request and handle the response
    response = requests.get(url, params=params, headers=headers, verify=False)
    if response.status_code == 200:
        return response.json()
    else:
        return None

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
# Update a user's details in a Supabase table
def update_user_in_supabase(supabase, user_id, updated_data):
    response = supabase.table('profiles').update(updated_data, ['id']).eq('id', user_id).execute()
    if 'error' in response:
        return False  # Update failed
    else:
        return True  # Update succeeded

# Fetch a profile using the profile ID
def fetch_profile_by_id(supabase, profile_id):
    rows = fetch_profile_directly(profile_id)
    if rows['data']:
        return pd.DataFrame(rows['data']).iloc[0]  # Convert to DataFrame and get the first row
    else:
        return None  # Return None if no data or errors

# Check if friends are attending an event
def friends_present(row, friend_list, np_events):
    if friend_list is None:
        return 0  # Return 0 if friend_list is empty
    for attendee in np_events[row, 8]:
        if attendee in friend_list:
            return 1  # Return 1 if a friend is attending
    return 0  # Return 0 otherwise

# Check if the organizer is a friend
def auth_is_friend(row, friend_list, np_events):
    if friend_list is None:
        return 0  # Return 0 if friend_list is empty
    return 1 if np_events[row, 2] in friend_list else 0  # Return 1 if organizer is a friend, 0 otherwise

# Mock data setup (will be replaced by actual data from API)
num_events = 36  # Number of events (mock data)
num_features = 2  # Number of features used in ML model (mock data)
friend_list = np_profiles[row, 10]  # Friend list of a user (mock data)
feature_matrix = np.zeros((num_events, num_features))  # Initialize feature matrix
np_events = 36  # Number of events (mock data, to be replaced)

# Populate the feature matrix with values
for row in range(num_events):
    feature_matrix[row, 0] = friends_present(row, friend_list, np_events)
    feature_matrix[row, 1] = auth_is_friend(row, friend_list, np_events)

# Generate labels (mock data)
y = np.random.rand(num_events)

# Train a linear regression model
model = LinearRegression()
model.fit(feature_matrix, y)

# Function to Compute Event Score
# This function takes a profile ID, a row from the event data, and a trained ML model as arguments.
# It uses two features: whether friends are present and whether the organizer is a friend.
def compute_event_score(profile_id, event_row, trained_model):
    # Initialize a feature vector with zeros
    new_feature_vector = np.zeros(num_features)
    # Populate the first feature: whether friends are present at the event.
    # Calls the 'friends_present()' function and passes the profile_id, friend_list, and event_row.
    new_feature_vector[0] = friends_present(profile_id, friend_list, event_row)
    # Populate the second feature: whether the event organizer is a friend.
    # Calls the 'auth_is_friend()' function and passes the profile_id, friend_list, and event_row.
    new_feature_vector[1] = auth_is_friend(profile_id, friend_list, event_row)
    # Use the trained ML model to predict an event score based on the feature vector
    return trained_model.predict([new_feature_vector])

# Function to Compute Score for Specific User-Event Pair
# This function takes a row representing a user and a row representing an event.
# It calls 'compute_event_score()' to get a score for the user-event pair.
def compute_score_for_user_event_pair(user_row, event_row):
    user_id = user_row['id']  # Extract the user ID from the user row
    event_id = event_row['id']  # Extract the event ID from the event row
    # Call 'compute_event_score()' to get the score for this user-event pair.
    # Passes the user_row, event_row, and the globally defined 'model'.
    score = compute_event_score(user_row, event_row, model)
    return user_id, event_id, score  # Return the user ID, event ID, and the computed score

# Main Function to Rank Events for Users
# This function takes two DataFrames: one for profiles and another for events.
# It utilizes multiprocessing to compute scores for all user-event pairs.
def rank_events_for_users(data_profiles, data_events):
    if data_profiles is None or data_events is None:
        return None  # Return None if either DataFrame is empty or not provided

    # Initialize a defaultdict to store scores for each user-event pair
    user_event_scores = defaultdict(dict)
    # Create a multiprocessing pool
    pool = Pool()
    # Generate all possible user-event pairs by iterating over both DataFrames
    user_event_pairs = [(user_row, event_row) for _, user_row in data_profiles.iterrows() for _, event_row in data_events.iterrows()]
    # Use the pool to compute scores for all user-event pairs in parallel
    scores = pool.starmap(compute_score_for_user_event_pair, user_event_pairs)
    # Populate the defaultdict with computed scores
    for user_id, event_id, score in scores:
        user_event_scores[user_id][event_id] = score

    pool.close()  # Close the multiprocessing pool
    pool.join()  # Wait for all processes to finish

    # Loop over all users to find and update their 'top_event_id' in Supabase
    for user_id in user_event_scores.keys():
        # Find the event ID with the highest score for this user
        top_event_id = max(user_event_scores[user_id], key=user_event_scores[user_id].get)
        # Update this user's 'top_event_id' in Supabase
        update_user_in_supabase(supabase, user_id, {'top_event_id': top_event_id})

# Run the Flask App
# This line ensures the Flask app only runs when this script is executed directly (not imported)
if __name__ == '__main__':
    app.run(debug=True)  # Run the Flask app in debug mode

# Import necessary libraries
import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np
from supabase_py import create_client, Client
from collections import defaultdict
from multiprocessing import Pool

# Initialize Supabase client
supabase_url = "https://kngkkgipbghzkzrmoawb.supabase.co/"
supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuZ2trZ2lwYmdoemt6cm1vYXdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczMTgxMzcsImV4cCI6MjAxMjg5NDEzN30.2nfCbx_C2UsoiGUFpNrfCjf1E3zWsOyZVYw1U2Nr-O8"  # Replace with your actual key
supabase = create_client(supabase_url, supabase_key)

# Fetch and convert table to DataFrame
def fetch_and_convert_to_dataframe(supabase, table_name):
    rows = supabase.table(table_name).select("*").execute()
    print(f"Debug: Fetched data: {rows}")
    if rows['data']:
        print(f"Data fetched from {table_name}")
        return pd.DataFrame(rows['data'])
    else:
        print(f"No data in {table_name} or table doesn't exist.")
        return None

# Update user data in Supabase
def update_user_in_supabase(supabase, user_id, updated_data):
    response = supabase.table('profiles').update(updated_data, ['id']).eq('id', user_id).execute()
    if 'error' in response:
        print(f"Failed to update user {user_id}. Error: {response['error']}")
        return False
    else:
        print(f"Successfully updated user {user_id}")
        return True

def fetch_profile_by_id(supabase, profile_id):
    rows = supabase.table("profiles").select("*").eq("id", profile_id).execute()
    if rows['data']:
        return pd.DataFrame(rows['data']).iloc[0]  # Assuming IDs are unique, so only one row should match
    else:
        print(f"No profile found with ID {profile_id}")
        return None

# Placeholder function for Drew's ML logic --------------------------------------------------------------------
def compute_event_score(profile_id, event_row):

    np.array()
    model= LinearRegression()
    import random
    return random.random()

# Compute score for user-event pair
def compute_score_for_user_event_pair(user_row, event_row):
    user_id = user_row['id']
    event_id = event_row['id']
    score = compute_event_score(user_row, event_row)
    return user_id, event_id, score

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

    # Example: Update user in Supabase based on the calculated score
    for user_id in user_event_scores.keys():
        top_event_id = max(user_event_scores[user_id], key=user_event_scores[user_id].get)
        update_user_in_supabase(supabase, user_id, {'top_event_id': top_event_id})
        return user_event_scores
# Fetch data
data_events = fetch_and_convert_to_dataframe(supabase, "events")
#data_profiles = fetch_and_convert_to_dataframe(supabase, "profiles")

np_events=data_events.to_numpy()

ml_vars_np=np.zeros((np_events.shape[1],52))


# Rank events for users
if data_events is not None and data_profiles is not None:
    user_event_scores = rank_events_for_users(data_profiles, data_events)
    # Do something with user_event_scores
else:
    print("Data fetch failed. Please check your Supabase tables.")
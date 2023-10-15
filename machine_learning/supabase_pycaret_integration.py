# Import necessary libraries
import pandas as pd
from pytest import console_main
from sklearn.linear_model import LinearRegression
import numpy as np
from supabase_py import create_client, Client
from collections import defaultdict
from multiprocessing import Pool
from flask import Flask, request

app = Flask(__name__)

@app.route('/get_uuid', methods=['GET'])
def get_uuid():
    uuid = request.headers.get('uuid', None)
    if uuid:
        return {"message": f"Received UUID: {uuid}"}, 200
    else:
        return {"message": "UUID not found in header"}, 400

if __name__ == '__main__':
    app.run(debug=True)

if __name__ == '__main__':
    app.run(debug=True)

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

id=get_uuid()
user=fetch_profile_by_id(id)
friendsList=None
if user['friends'] is not None:
    friendsList=set(user['friends'])
orgList=None
if user['organizations'] is not None:
    orgList=set(user['organizations'])

# Fetch data
data_events = fetch_and_convert_to_dataframe(supabase, "events")

np_events=data_events.to_numpy()

def friendsPresent(row):
    if friendsList is not None:
        for attendee in np_events[row,8]:
            if attendee in friendsList:
                return 1
    return 0

def orgMatch(row):
    if is not None:
        for org in user['organizations']:
            if org in 

# org for event 9

pastSize=0
for r in range(np_events.shape[0]):
    tags=np_events[r,10]
    if "385b1a6e-b851-4bd9-a5af-55f08f806292" in tags:
        pastSize+=1

past=np.zeros((pastSize,np_events.shape[1]))
curRow=0
for r in range(np_events.shape[0]):
    tags=np_events[r,10]
    if "385b1a6e-b851-4bd9-a5af-55f08f806292" in tags:
        past[curRow]=np_events[r]
        curRow+=1
model=LinearRegression()
target=[]
for i in range(past.shape[0]):
    if id in past[i,8]:
        target.append(1)
    target.append(0)
y=np.array(target)
ml_vars_np=np.zeros((np_events.shape[0],2))
X_train =np.zeros((pastSize,2))
for row in np_events.shape[0]:
    ml_vars_np[row,0]=friendsPresent(row)
    X_train[row,0]=friendsPresent(row)
for row in np_events.shape[0]:
    ml_vars_np[row,1]=friendsPresent(row)
    X_train[row,1]=friendsPresent(row)


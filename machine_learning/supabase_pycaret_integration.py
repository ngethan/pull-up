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

def fetch_profile_by_id(supabase, profile_id):
    rows = supabase.table("profiles").select("*").eq("id", profile_id).execute()
    if rows['data']:
        return pd.DataFrame(rows['data']).iloc[0]  # Assuming IDs are unique, so only one row should match
    else:
        print(f"No profile found with ID {profile_id}")
        return None

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
    if orgList is not None:
        for org in orgList:
            if org in np_events[row,9]:
                return 1
    return 0
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
    ml_vars_np[row,1]=orgMatch(row)
    X_train[row,1]=orgMatch(row)
model.fit(X_train,y)
scores=model.predict(ml_vars_np)
print(scores)


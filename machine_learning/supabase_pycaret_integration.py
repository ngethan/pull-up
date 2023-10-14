# Import necessary libraries
import pandas as pd
from pycaret.regression import *
from supabase_py import create_client, Client

# Initialize Supabase client
supabase_url: str = "https://obolytrplcssvybfsjxq.supabase.co/"
supabase_key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ib2x5dHJwbGNzc3Z5YmZzanhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcyOTY4MDksImV4cCI6MjAxMjg3MjgwOX0.SY0V5seRlIW-zTddSW6L62411RXgD_eziJ8K1CBfehM"
supabase: Client = create_client(supabase_url, supabase_key)

# Fetch the data from your Supabase table
table_name = "your_table_name"
rows = supabase.table(table_name).select("*").execute()
data = pd.DataFrame(rows['data'])

# Initialize PyCaret setup
# Target variable is 'event_score' - replace if you use a different name
reg = setup(data, target='event_score', session_id=123)

# Compare models to find the best one
top3 = compare_models(n_select=3)

# Create the best model
best_model = create_model('lr')

# Tune the model for better performance
tuned_model = tune_model(best_model)

# Evaluate the model
evaluate_model(tuned_model)

# Finalize the model for deployment
final_model = finalize_model(tuned_model)

# Save the model
save_model(final_model, 'final_model')

# Predict the event score for the original data or new data
predictions = predict_model(final_model, data=data)

# Add predictions to your DataFrame
data['Predicted_Score'] = predictions['Label']

# Update the Supabase table with the predicted scores
supabase.table(table_name).upsert(data.to_dict(orient="records")).execute()

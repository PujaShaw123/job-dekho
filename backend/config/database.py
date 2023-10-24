from pymongo import MongoClient

client = MongoClient(
    "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority"
)

# MongoDB database named 'job_app'
db = client.job_app

# MongoDB collections under database named 'job_app'
collection_job_name = db["job_list"]
collection_app_job_name = db["applied_job_list"]
collection_user_name = db["candidate"]

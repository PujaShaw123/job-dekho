from fastapi import APIRouter
from config.database import (
    collection_job_name,
    collection_app_job_name,
    collection_user_name,
)
from models.joblist_model import Job, AppliedJob, User
from schemas.joblist_schema import jobs_serializer, app_jobs_serializer
from bson import ObjectId
from urllib.parse import unquote

job_api_router = APIRouter()


@job_api_router.get("/")
async def get_jobs():
    jobs = jobs_serializer(collection_job_name.find())
    return {"status": "ok", "data": jobs}


@job_api_router.get("/{jid}")
async def get_job(jid: str):
    job = jobs_serializer(collection_job_name.find({"jid": jid}))
    return {"status": "ok", "data": job}


@job_api_router.get("/jobid/{id}")
async def get_job_uid(id: str):
    job = jobs_serializer(collection_job_name.find({"_id": ObjectId(id)}))
    return {"status": "ok", "data": job}


@job_api_router.post("/")
async def post_job(job: Job):
    _id = collection_job_name.insert_one(dict(job))
    job = jobs_serializer(collection_job_name.find({"_id": _id.inserted_id}))
    return {"status": "ok", "data": job}


@job_api_router.put("/{id}")
async def update_job(id: str, job: Job):
    collection_job_name.find_one_and_update({"_id": ObjectId(id)}, {"$set": dict(job)})
    job = jobs_serializer(collection_job_name.find({"_id": ObjectId(id)}))
    return {"status": "ok", "data": job}


@job_api_router.delete("/{id}")
async def delete_job(id: str):
    collection_job_name.find_one_and_delete({"_id": ObjectId(id)})

    return {"status": "ok", "data": []}


@job_api_router.post("/signup")
async def signup(user: User):
    existing_user = collection_user_name.find_one({"email": user.email})
    if existing_user:
        return {"message": "User already exists"}
    collection_user_name.insert_one(user.dict())
    return {"message": "User created"}


@job_api_router.post("/login")
async def login(user: User):
    existing_user = collection_user_name.find_one(
        {"email": user.email, "password": user.password}
    )
    if existing_user:
        return {"message": "Login successful"}
    return {"message": "Login failed"}


@job_api_router.post("/apply")
async def apply_job(aJob: AppliedJob):
    collection_app_job_name.insert_one(aJob.dict())
    return {"status": "ok", "data": "Applied Job Stored"}


@job_api_router.get("/applied/{user}")
async def get_job(user: str):
    decoded_user = unquote(user)
    appJob = app_jobs_serializer(
        collection_app_job_name.find({"user_id": decoded_user})
    )
    return {"status": "ok", "data": appJob}

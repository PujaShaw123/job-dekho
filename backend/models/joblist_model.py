from pydantic import BaseModel


class Job(BaseModel):
    jid: str
    title: str
    company: str
    exp: str
    salary: int
    location: str
    desc: str
    alink: str


class AppliedJob(BaseModel):
    user_id: str
    applied_job_id: str
    applied_job_title: str
    applied_job_location: str


class User(BaseModel):
    email: str
    password: str

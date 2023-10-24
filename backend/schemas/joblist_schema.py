def job_serializer(job) -> dict:
    return {
        "id": str(job["_id"]),
        "jid": job["jid"],
        "title": job["title"],
        "company": job["company"],
        "exp": job["exp"],
        "salary": job["salary"],
        "location": job["location"],
        "desc": job["desc"],
        "alink": job["alink"],
    }


def jobs_serializer(jobs) -> list:
    return [job_serializer(job) for job in jobs]


def app_job_serializer(appJob) -> dict:
    return {
        "id": str(appJob["_id"]),
        "user_id": appJob["user_id"],
        "applied_job_id": appJob["applied_job_id"],
        "applied_job_title": appJob["applied_job_title"],
        "applied_job_location": appJob["applied_job_location"],
    }


def app_jobs_serializer(appJobs) -> list:
    return [app_job_serializer(appJob) for appJob in appJobs]

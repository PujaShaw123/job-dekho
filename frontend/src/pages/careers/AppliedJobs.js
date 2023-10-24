import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
function AppliedJobs({ userEmail }) {
  const { user } = useParams();
  const [appJob, setAppliedJob] = useState([]);

  useEffect(() => {
    if (userEmail !== "") {
      axios.get(`http://127.0.0.1:8000/applied/${userEmail}`).then((res) => {
        setAppliedJob(res.data.data);
      });
    }
  }, []);

  function han(id) {
    console.log(id);
  }
  console.log(appJob);
  return (
    <div className="careers-layout">
      <h2>Your Applied Jobs</h2>
      <div className="careers">
        {appJob.map((appJob) => (
          <Link key={appJob.applied_job_id} onClick={han(appJob.id)}>
            <p>{appJob.applied_job_id}</p>
            <p>{appJob.applied_job_title}</p>
            <p>{appJob.applied_job_location}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AppliedJobs;

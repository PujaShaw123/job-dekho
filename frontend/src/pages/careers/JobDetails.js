import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
function JobDetails({ checkLogin, userEmail }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cjob, setCjob] = useState({});
  const applyData = {
    user_id: userEmail,
    applied_job_id: cjob.jid,
    applied_job_title: cjob.title,
    applied_job_location: cjob.location,
  };

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/${id}`).then((res) => {
      setCjob(res.data.data[0]);
    });
  }, []);

  const handleApply = async () => {
    try {
      if (applyData.user_id !== "") {
        const response = await axios.post(
          "http://localhost:8000/apply",
          applyData
        );
        if (response.status === 200) {
          navigate("/applied");
        } else {
          console.log("Job Applied");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="career-details carbox">
      <h2>
        Title : <span className="main-f">{cjob.title}</span>
      </h2>
      <p>
        Company : <span className="main-f">{cjob.company}</span>
      </p>
      <p>
        Starting salary : <span className="main-f">{cjob.salary}</span>
      </p>
      <p>
        Exp required: <span className="main-f">{cjob.exp}</span>
      </p>
      <p>
        Location : <span className="main-f">{cjob.location}</span>
      </p>
      <p>
        Job Id : <span className="main-f">{cjob.jid}</span>
      </p>
      <div className="details">
        <p className="main-f">{cjob.desc}</p>
      </div>

      {checkLogin ? (
        <button className="but" onClick={handleApply}>
          <a
            className="lin"
            href={cjob.alink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply Now
          </a>
        </button>
      ) : (
        <button disabled className="but">
          Login to Apply Now
        </button>
      )}
    </div>
  );
}

export default JobDetails;

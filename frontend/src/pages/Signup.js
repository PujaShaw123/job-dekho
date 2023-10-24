import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/signup",
        formData
      );
      if (response.status === 200) {
        navigate("/");
      } else {
        console.log("Signup failed.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="header">SIGN UP</div>
      <div className="form">
        <input
          type="text"
          name="email"
          placeholder="Enter Your Email"
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          onChange={handleInputChange}
        />
        <button onClick={handleSignup}>Login</button>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;

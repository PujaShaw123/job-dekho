import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ onLogin, handleUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        formData
      );
      if (response.status === 200) {
        onLogin(true);
        handleUser(formData.email);
        navigate("/");
      } else {
        console.log("Login failed.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="container">
      <div className="header">LOGIN</div>
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
        <button onClick={handleLogin}>Login</button>
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;

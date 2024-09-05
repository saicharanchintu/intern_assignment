import React, { useState } from "react";
import { login } from "../../services/authServices";
import { useNavigate } from 'react-router-dom';
import './CSS/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData);
      console.log("Logged in successfully:", data);
      console.log("Token:", data.token);
      console.log("User role:", data.role);
      console.log("User ID:", data.userId); // Ensure you use data.userId
  
      localStorage.setItem('token', data.token);
  
      // Redirect based on user role
      if (data.role === "manager") {
        navigate("/");
      } else if (data.role === "intern") {
        navigate(`/task/${data.userId}`); // Use userId here
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={formData.email}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        value={formData.password}
        required
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;

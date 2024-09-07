import React, { useState } from "react";
import { register } from "../../services/authServices";
import "./CSS/Register.css";
import registerImage from "../../assets/Signup.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "intern",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      setSuccess("User registered successfully");
      setError("");
    } catch (err) {
      setError("Registration failed");
      setSuccess("");
    }
  };

  return (
    <>
      <div className="register-page">
        <div className="iilustration">
          <img src={registerImage} alt="" />
        </div>
        <div className="registerPage-container">
          <form onSubmit={handleSubmit} className="register-form">
            <label htmlFor="name" className="label">
              Username:{" "}
            </label>
            <div className="input-container">
              <input
                type="text"
                name="name"
                className="input-feild"
                id="name"
                placeholder="Enter your username"
                onChange={handleChange}
                value={formData.name}
                required
              />
            </div>

            <label htmlFor="email" className="label">
              Email:{" "}
            </label>
            <div className="input-container">
              <input
                type="email"
                className="input-feild"
                name="email"
                id="email"
                placeholder="Enter email address"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>
            <label htmlFor="password" className="label">
              Password:
            </label>
            <div className="input-container">
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input-feild"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div
                  className="pass-see"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={
                      showPassword ? "bx bxs-lock-open-alt" : "bx bxs-lock-alt"
                    }
                  ></i>
                </div>
              </div>
            </div>
            <label htmlFor="role" className="label">
              Role:{" "}
            </label>
            <div className="input-container">
              <select
                name="role"
                className="input-feild"
                onChange={handleChange}
                value={formData.role}
              >
                <option value="intern">Intern</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="register-btn">
              Register
            </button>

            {error && (
              <p style={{ color: "red" }} className="error-text">
                {error}
              </p>
            )}
            {success && (
              <p style={{ color: "green" }} className="error-text">
                {success}
              </p>
            )}
          </form>
          <p className="to_login">
            Already have an account?
            <button
              type="button"
              className="handle-switch-btn"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;

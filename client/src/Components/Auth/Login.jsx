import React, { useState } from "react";
import { login } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import "./CSS/Login.css";
import Login_img from "../../assets/login.jpg";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

      localStorage.setItem("token", data.token);

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
    <>
      {" "}
      <div className="login-page">
        <div className="login-page-container">
          <div className="login-page-context">
            <h1>Welcome Back 👋</h1>
            <p>We are happy to have you back</p>
          </div>
          <div className="loginPage-container">
            <form onSubmit={handleSubmit} className='login-page-form'>

              <label htmlFor="email" className="label">
                Email*
              </label>
              <div className="input-container">
                <input
                  type="email"
                  className="input-feild"
                  name="email"
                  id="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <label htmlFor="password" className="label">
                {" "}
                Password*{" "}
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
                    required
                  />
                  <div
                    className="pass-see"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={
                        showPassword
                          ? "bx bxs-lock-open-alt"
                          : "bx bxs-lock-alt"
                      }
                    ></i>
                  </div>
                </div>
              </div>
              <button type="submit" className="login-btn">
                Login
              </button>
              {error && <p className="error-cls">{error}</p>}
            </form>
            <p className="to_signup">
              Don't have an account?
              <button
                type="button"
                className="handle-switch-btn"
                onClick={() => navigate("/register")}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
        <div className="iilustration">
          <img src={Login_img} alt="" />
        </div>
      </div>
    </>
  );
};

export default Login;

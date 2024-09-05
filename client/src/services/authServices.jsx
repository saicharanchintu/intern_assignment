import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; 
  } catch (err) {
    console.error("Error in register function:", err);
    throw err;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data; 
  } catch (err) {
    console.error("Error in login function:", err);
    throw err; 
  }
};

export const getToken = () => {
  return localStorage.getItem("token");
};

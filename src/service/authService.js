import axios from "axios";

const API_URL = "http://localhost:8081/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// REGISTER
export const registerUser = (data) => {
  return api.post("/register", data);
};

// LOGIN
export const login = (data) => {
  return api.post("/login", data);
};

export default api;

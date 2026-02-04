// src/api/axiosClient.js
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const axiosClient = axios.create({ baseURL, timeout: 15000 });

// unwrap data and let errors throw
axiosClient.interceptors.response.use(
  res => res,
  err => { throw err?.response?.data || err; }
);

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;

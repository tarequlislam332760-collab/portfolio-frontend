import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1",
  timeout: 10000,
});

// রিকোয়েস্ট পাঠানোর সময় স্বয়ংক্রিয়ভাবে JWT টোকেন ইনজেক্ট করার ইন্টারসেপ্টর
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
import axios from "axios";

const instance = axios.create({
  baseURL: "https://noticeboardbackened-production.up.railway.app/", // or your backend URL
});

// Add Authorization header to every request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
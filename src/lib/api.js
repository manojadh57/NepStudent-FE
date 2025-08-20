import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g., http://localhost:8005/api/v1
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const t = localStorage.getItem("accessToken");
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

export default api;

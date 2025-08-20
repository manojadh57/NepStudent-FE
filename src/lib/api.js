// TEACHER NOTE:
// One axios instance for the whole app.
// - Reads API base from VITE_BASE_URL
// - Sends Bearer token from localStorage on every request

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true, // keep if you use cookies; harmless if not
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log("🔐 TOKEN:", token); // 👈 проверка
  console.log("📦 BEFORE HEADERS:", config.headers);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("📦 AFTER HEADERS:", config.headers);

  return config;
});

export default api;
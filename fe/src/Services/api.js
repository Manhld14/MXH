// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7130/api", // URL backend của bạn
  timeout: 10000, // 10 giây timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

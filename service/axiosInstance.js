// service/axiosInstance.js
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL=`${apiUrl}/api/v1`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Add interceptor to attach token from localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

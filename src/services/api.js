import axios from "axios";

// pick VITE_API_URL in dev, VITE_PUBLIC_API_URL in prod
const baseURL = import.meta.env.DEV
  ? import.meta.env.VITE_API_URL
  : import.meta.env.VITE_PUBLIC_API_URL;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// เพิ่ม interceptor เพื่อแนบ token อัตโนมัติ
api.interceptors.request.use((config) => {
  console.log("Interceptor fired");

  // รายการ endpoint ที่ไม่ควรแนบ token
  const publicEndpoints = ["/auth/forgot-password", "/auth/register", "/auth/login"];

  // ตรวจว่า URL นี้ไม่ใช่ public endpoint ก่อนจะแนบ token
  const isPublic = publicEndpoints.some((endpoint) =>
    config.url?.includes(endpoint)
  );

  if (!isPublic) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Sending token:", token);
    }
  }

  return config;
});

export default api;
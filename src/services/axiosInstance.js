import axios from "axios";



// Interceptor: ส่ง token อัตโนมัติใน header
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // เพิ่มถ้าใช้ cookie หรือ JWT
});

  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)


export default axiosInstance;

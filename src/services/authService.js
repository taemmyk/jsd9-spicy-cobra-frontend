import api from "./api.js"; // Axios instance with withCredentials:true

export const signupUser = async ({ fullName, email, password }) => {
  const response = await api.post("/auth/register", {
    fullName,
    email,
    password,
  });
  return response.data;
};

export const loginUser = async ({ email, password }) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });
  console.log(response.data);
  return response.data;
};

export const logoutUser = async () => {
  // LOGOUT (ฝั่ง frontend แค่ลบ token)
  localStorage.removeItem("token");
  const response = await api.post("/auth/logout");
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/mongo/auth/profile");
  return response.data;
};

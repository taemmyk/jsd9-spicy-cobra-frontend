import api from "./api.js"; // Axios instance with withCredentials:true

export const signupUser = async ({ email, password, confirmPassword }) => {
  const response = await api.post("/auth/register", {
    email,
    password,
    confirmPassword,
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

// Forgot Password
export const forgotPassword = async (email) => {
  try {
    const response = await api.post("/auth/forgot-password", { email });
    if (response.data.error) {
      throw new Error(response.data.message || "Password reset failed.");
    }
    return response.data;
  } catch (error) {
    console.error("Error in forgotPassword:", error.response?.data || error.message);
    throw error;
  }
};

// Reset Password
// export const resetPassword = async ({ token, password }) => {
//   const response = await api.post("/auth/reset-password", { token, password });
//   return response.data;
// };

export const resetPassword = async ({ token, password }) => {
  const response = await api.post(`/auth/reset-password/${token}`, { password });
  return response.data;
};

// Verify current password
export const verifyCurrentPassword = async (currentPassword) => {
  const response = await api.post("/auth/verify-password", { currentPassword });
  return response.data;
};

// Update password
export const updatePassword = async ({ currentPassword, newPassword }) => {
  const response = await api.put("/auth/update-password", {
    currentPassword,
    newPassword,
  });
  return response.data;
};
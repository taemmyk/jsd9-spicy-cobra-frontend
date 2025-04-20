import axios from "axios";

const baseURL = "https://67f9c3e6094de2fe6ea25531.mockapi.io/api/v1"; // Base URL ของ mockAPI

export const getProducts = async () => {
  try {
    const response = await axios.get(`${baseURL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

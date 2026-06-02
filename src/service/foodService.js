import api from "./api";

// 🍽 Fetch all foods
export const fetchFoodList = async () => {
  const response = await api.get("/foods");
  return response.data;
};

// 🍔 Fetch food by id
export const fetchFoodDetails = async (id) => {
  const response = await api.get(`/foods/${id}`);
  return response.data;
};

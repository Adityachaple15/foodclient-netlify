import api from "./api";

// ➕ Add to cart
export const addToCart = (foodId) => {
  return api.post("/cart", { foodId });
};

// ➖ Remove quantity
export const removeQtyFromCart = (foodId) => {
  return api.post("/cart/remove", { foodId });
};

// 🛒 Get cart
export const getCartData = async () => {
  const response = await api.get("/cart");
  return response.data.items;
};

// 🧹 Clear cart
export const clearCartItems = async () => {
  await api.delete("/cart");
};

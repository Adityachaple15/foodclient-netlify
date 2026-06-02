import api from "./api";

export const fetchUserOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

export const fetchOrderTracking = async (orderId) => {
  const response = await api.get(`/orders/${orderId}/track`);
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await api.post("/orders/create", orderData);
  return response.data;
};

export const verifyPayment = async (paymentData) => {
  const response = await api.post("/orders/verify", paymentData);
  return response.status === 200;
};

export const deleteOrder = async (orderId) => {
  await api.delete(`/orders/${orderId}`);
};

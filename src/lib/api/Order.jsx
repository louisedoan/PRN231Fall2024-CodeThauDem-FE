import { axiosClient } from "./config/axios-client";

export const createOrder = async (orderCreate) => {
  try {
    const response = await axiosClient.post("/api/v1/orders", orderCreate);
    return response.data; // Return the full response object
  } catch (error) {
    console.error("Error creating order:", error);
    if (error.response && error.response.data) {
      return error.response.data; // Return the error response data
    }
    throw error;
  }
};

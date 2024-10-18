import { axiosClient } from "./config/axios-client";

export const getAllSeats = async (flightId) => {
  try {
    const response = await axiosClient.get(`/api/v1/seats/${flightId}`);
    if (response.data.isSuccess) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error fetching business class seats:", error);
    throw error;
  }
};
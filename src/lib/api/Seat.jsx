import { axiosClient } from "./config/axios-client";

export const getBusinessClassSeats = async (flightId) => {
  try {
    const response = await axiosClient.get(`/api/v1/seats/business/${flightId}`);
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

export const getEconomyClassSeats = async (flightId) => {
  try {
    const response = await axiosClient.get(`/api/v1/seats/economy/${flightId}`);
    if (response.data.isSuccess) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error fetching economy class seats:", error);
    throw error;
  }
};
import { axiosClient } from "../api/config/axios-client";

export const getDepartureLocations = async () => {
  return await axiosClient.get("/api/v1/flights/query");
};

export const searchOneWayFlight = async (departureLocation, arrivalLocation, departureDate) => {
  const response = await axiosClient.get("/api/v1/flights/search-one-way", {
    params: {
      departureLocation,
      arrivalLocation,
      departureDate,
    },
  });
  return response.data;
};

export const searchReturnFlight = async (departureLocation, arrivalLocation, returnDate) => {
  const response = await axiosClient.get("/api/v1/flights/search-return-flight", {
    params: {
      departureLocation,
      arrivalLocation,
      returnDate,
    },
  });
  return response.data;
};
export const createFlight = async(flight) =>{
  return await axiosClient.post("/api/v1/flights", flight), {

  }


};

export const getAllFlight = async() => {
  return await axiosClient.get("/api/v1/flights")

  
}
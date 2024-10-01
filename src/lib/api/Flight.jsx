import { axiosClient } from "../api/config/axios-client";
import { BASE_URL } from "./config/axios-client";
export const getDepartureLocations = async () => {
  return await axiosClient.get("/api/v1/flights/query");
};

export default getDepartureLocations;

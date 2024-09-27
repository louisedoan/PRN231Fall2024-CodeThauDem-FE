import { axiosClient } from "./config/axios-client";

export const createLocation = async (location) => {
    try {
        const response = await axiosClient.post("/api/v1/flightroutes/create-location", {
            location,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getLocations = async () => {
    try {
        const response = await axiosClient.get("/api/v1/flightroutes/get-all");
        return response.data;
    } catch (error) {
        throw error;
    }
}
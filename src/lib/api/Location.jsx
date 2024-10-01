import { axiosClient } from "./config/axios-client";

export const createLocation = async (payload) => {
    try{
    const response = await axiosClient.post('/api/v1/flightroutes/create-location', payload);
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
};

export const deleteLocation = async (flightRouteId) => {
    try {
        const response = await axiosClient.delete(`/api/v1/flightroutes/delete-location?flightRouteId=${flightRouteId}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateLocation = async (payload) => {
    try {
        const response = await axiosClient.put('/api/v1/flightroutes/update-location', payload);
        return response.data;
    } catch (error) {
        throw error;
    }
}



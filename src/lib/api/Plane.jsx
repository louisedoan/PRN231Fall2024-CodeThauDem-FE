import { axiosClient } from "../api/config/axios-client";
export const getAllPlanes = async() => {
    return await axiosClient.get("/api/v1/planes/sreachPlane?status=Avaiable")
  
    
  }
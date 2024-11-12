import { axiosClient } from "./config/axios-client";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

export const GetAllFlightReport = async () => {
  try {
    nProgress.start();
    const response = await axiosClient.get(
      "/api/v1/flights/get-all-flightReport"
    );
    return response.data;
  } catch (error) {
    console.log(error);
    nProgress.done();
    return error;
  } finally {
    nProgress.done();
  }
};

export const GetFlighReportById = async (orderId) => {
  try {
    nProgress.start();
    const response = await axiosClient.post(
      `/api/v1/flights/get-flight-report-by-order?orderId=${orderId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    nProgress.done();
    return error;
  } finally {
    nProgress.done();
  }
};

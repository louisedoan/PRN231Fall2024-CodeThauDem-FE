import { axiosClient } from "./config/axios-client";
import { jwtDecode } from "jwt-decode";
import { setCurrentUser } from "../redux/reducers/userSlice";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

export const registerUser = async (email, password) => {
  try {
    const response = await axiosClient.post("/api/v1/users/register", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    nProgress.start();
    const response = await axiosClient.post("api/v1/users/login", {
      email: email,
      password: password,
    });
    console.log("Full Response:", response);
    const responseData = response.data;
    console.log("Response Data:", responseData); // Log chi tiết phản hồi từ server

    if (responseData.token) {
      // const user = responseData.data.loginResModel;
      const token = responseData.token;
      const user = jwtDecode(token);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));

      console.log("Dispatching setCurrentUser action");

      dispatch(setCurrentUser(user)); // Lưu thông tin người dùng vào Redux store

      return { token, user };
    } else {
      throw new Error(responseData.message || "Login failed !");
    }
  } catch (error) {
    throw error;
  } finally {
    nProgress.done();
  }
};

export const forgotPassword = async (email) => {
  try {
    nProgress.start();
    const response = await axiosClient.post(
      `/api/v1/users/forgot-password?email=${encodeURIComponent(email)}`
    );
    return response.data;
  } catch (error) {
    throw error;
  } finally {
    nProgress.done();
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    nProgress.start();
    const response = await axiosClient.post(
      `/api/v1/users/reset-password?token=${encodeURIComponent(
        token
      )}&newPassword=${encodeURIComponent(newPassword)}`
    );
    return response.data;
  } catch (error) {
    throw error;
  } finally {
    nProgress.done();
  }
};

export const verifyUser = async (token) => {
  try {
    nProgress.start();
    const response = await axiosClient.post(
      `/api/v1/users/confirm-user?token=${encodeURIComponent(token)}`
    );
    return response.data;
  } catch (error) {
    throw error;
  } finally {
    nProgress.done();
  }
};

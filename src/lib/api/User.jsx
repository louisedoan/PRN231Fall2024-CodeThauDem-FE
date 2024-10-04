import { axiosClient } from "./config/axios-client";
import { useDispatch } from "react-redux";
import { setDetailUser } from "../redux/reducers/userSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

// API lấy thông tin người dùng
export const fetchUserData = createAsyncThunk(
  "users/fetchByIdStatus",
  async (userId, { dispatch }) => {
    try {
      console.log(`Fetching user with ID: ${userId}`);
      const response = await axiosClient.get(`/api/v1/users/${userId}`);
      dispatch(setDetailUser(response.data));
      console.log(response.data);
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
    }
  }
);

// API cập nhật thông tin người dùng
export const updateUser = async (userId, updatedUserData) => {
  try {
    const response = await axiosClient.put(
      "/api/v1/users/update",
      updatedUserData
    );
    return response.data; // Trả về dữ liệu đã được cập nhật
  } catch (error) {
    throw new Error("Failed to update user data");
  }
};

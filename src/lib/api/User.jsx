import { axiosClient } from "./config/axios-client";
import { useDispatch } from "react-redux";
import { setDetailUser } from "../redux/reducers/userSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

// API lấy danh sách tất cả người dùng
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/api/v1/users/all");
      console.log("Users fetched:", response.data.data); // Kiểm tra dữ liệu trả về
      return response.data.data; // Trả về đúng mảng data từ response
    } catch (error) {
      console.error("Error fetching users:", error);
      return rejectWithValue("Error fetching users");
    }
  }
);

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
export const updateUser = async (updatedUserData) => {
  try {
    const response = await axiosClient.put(
      "/api/v1/users/update",
      updatedUserData,
      {
        headers: {
          "Content-Type": "application/json", // Đảm bảo gửi với định dạng JSON
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update user data");
  }
};

// API tạo mới một Manager
export const createManager = async (newManagerData) => {
  try {
    const response = await axiosClient.post(
      "/api/v1/users/create",
      newManagerData,
      {
        headers: {
          "Content-Type": "application/json", // Đảm bảo gửi với định dạng JSON
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating manager:", error);
    throw new Error("Failed to create manager");
  }
};

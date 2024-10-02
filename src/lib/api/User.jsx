import axios from "axios";

// API lấy thông tin người dùng
export const fetchUserData = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:5176/api/v1/users/${userId}`
    );
    return response.data; // Trả về dữ liệu người dùng
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};

// API cập nhật thông tin người dùng
export const updateUser = async (userId, updatedUserData) => {
  try {
    const response = await axios.put(
      `http://localhost:5176/api/v1/users/update/${userId}`,
      updatedUserData
    );
    return response.data; // Trả về dữ liệu đã được cập nhật
  } catch (error) {
    throw new Error("Failed to update user data");
  }
};

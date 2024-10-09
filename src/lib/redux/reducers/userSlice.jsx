import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers } from "../../api/User"; // Đảm bảo import hành động fetchAllUsers

const usersSlice = createSlice({
  name: "users",
  initialState: {
    usersList: [],
    loading: false,
    error: null,
    updateUser: {},
    detailUser: {},
    userHistory: [],
    currentUser: null,
  },
  reducers: {
    setUsersList: (state, action) => {
      state.usersList = action.payload;
    },
    setUpdateUser: (state, action) => {
      state.updateUser = action.payload;
    },
    setDetailUser: (state, action) => {
      state.detailUser = action.payload;
    },
    setUserHistory: (state, action) => {
      state.userHistory = action.payload;
    },
    setCurrentUser: {
      reducer: (state, action) => {
        state.currentUser = action.payload.user;
      },
      prepare: (user) => ({ payload: { user } }),
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.usersList = action.payload; // Cập nhật danh sách người dùng
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setUsersList,
  setUpdateUser,
  setDetailUser,
  setUserHistory,
  setCurrentUser,
  clearCurrentUser,
} = usersSlice.actions;

export default usersSlice.reducer;

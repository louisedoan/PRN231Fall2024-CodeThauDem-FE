import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../api/config/axios-client";

export const fetchOrders = createAsyncThunk(
  "history/fetchOrders",
  async (userId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/orders/userId=${userId}`
      );

      return response.data.order;
    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }
);

const historySlice = createSlice({
  name: "history",
  initialState: {
    orders: [],
    selectedOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload; // Lưu mảng đơn hàng vào state
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedOrder, clearSelectedOrder } = historySlice.actions;
export const selectOrders = (state) => state.history.orders;
export const selectSelectedOrder = (state) => state.history.selectedOrder;
export const selectLoading = (state) => state.history.loading;

export default historySlice.reducer;

// Ví dụ cách định nghĩa và export đúng cách
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../api/config/axios-client";

// Tạo hàm fetchFlights
export const fetchFlights = createAsyncThunk(
  "flights/fetchFlights",
  async () => {
    const response = await axios.get(BASE_URL + "/api/v1/flightroutes/get-all");

    return response.data;
  }
);
const initialState = {
  flightList: [],
  loading: false,
  error: null,
  selectedFlightDetails: null,
};

// Tạo slice
const flightSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    setSelectedFlightDetails: (state, action) => {
      state.selectedFlightDetails = action.payload;
      console.log(state.selectedFlightDetails);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.flightList = action.payload;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { setSelectedFlightDetails } = flightSlice.actions;
export default flightSlice.reducer;

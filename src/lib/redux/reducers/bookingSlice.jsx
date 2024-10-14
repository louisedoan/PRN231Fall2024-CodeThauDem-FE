import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    passengerBooking: [],
    flightBooking: {},
    flightSeatBooking: [],
    passengerInformation: [],
  },
  reducers: {
    setPassengerBooking: (state, action) => {
      state.passengerBooking = action.payload;
    },

    setFlightBooking: (state, action) => {
      state.flightBooking = action.payload;
    },

    setFlighSeatBooking: (state, action) => {
      state.flightSeatBooking = action.payload;
    },

    setPassengerInformation: (state, action) => {
      state.passengerInformation = action.payload;
    },
  },
});

export const {
  setPassengerBooking,
  setFlightBooking,
  setFlighSeatBooking,
  setPassengerInformation,
} = bookingSlice.actions;

export default bookingSlice.reducer;

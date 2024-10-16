import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    passengerBooking: {
      adults: 0,
      children: 0,
      infants: 0,
      total: 0,
    },
    flightBooking: {},
    flightSeatBooking: [],
    passengerInformation: [],
  },
  reducers: {
    setPassenger: (state, action) => {
      state.passengerBooking = action.payload;
    },

    setFlight: (state, action) => {
      state.flightBooking = action.payload;
    },

    setSeat: (state, action) => {
      state.flightSeatBooking = action.payload;
    },

    setPassengerInformation: (state, action) => {
      state.passengerInformation = action.payload;
    },
  },
});

export const {
  setPassenger,
  setFlight,
  setSeat,
  setPassengerInformation,
} = bookingSlice.actions;

export default bookingSlice.reducer;

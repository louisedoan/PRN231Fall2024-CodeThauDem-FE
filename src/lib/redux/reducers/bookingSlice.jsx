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
    returnFlightBooking: {}, // Add this line
    flightSeatBooking: [],
    returnFlightSeatBooking: [], // Add this line
    passengerInformation: [],
  },
  reducers: {
    setPassenger: (state, action) => {
      state.passengerBooking = action.payload;
    },

    setFlight: (state, action) => {
      state.flightBooking = action.payload;
    },

    setReturnFlight: (state, action) => { // Add this reducer
      state.returnFlightBooking = action.payload;
    },

    setSeat: (state, action) => {
      state.flightSeatBooking = action.payload;
    },

    setReturnSeat: (state, action) => { // Add this reducer
      state.returnFlightSeatBooking = action.payload;
    },

    setPassengerInformation: (state, action) => {
      state.passengerInformation = action.payload;
    },
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
  },
});

export const {
  setPassenger,
  setFlight,
  setReturnFlight, // Add this export
  setSeat,
  setReturnSeat, // Add this export
  setPassengerInformation,
  setOrderId,
} = bookingSlice.actions;

export default bookingSlice.reducer;
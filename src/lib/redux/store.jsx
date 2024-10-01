import { configureStore } from "@reduxjs/toolkit";
import usersSlice, { setCurrentUser } from "./reducers/userSlice";
import flightReducer from "../redux/reducers/flightSlice";
const store = configureStore({
  reducer: {
    users: usersSlice,
    flights: flightReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

if (typeof window !== "undefined") {
  const currentUser = sessionStorage.getItem("user");
  if (currentUser) {
    store.dispatch(setCurrentUser(JSON.parse(currentUser)));
  }
}

export default store;

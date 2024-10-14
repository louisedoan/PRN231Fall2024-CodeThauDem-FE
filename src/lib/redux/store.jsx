import { configureStore, combineReducers } from "@reduxjs/toolkit";
import usersSlice, { setCurrentUser } from "./reducers/userSlice";
import flightReducer from "../redux/reducers/flightSlice";
import bookingSlice from "./reducers/bookingSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

const persistConfig = {
  key: "root", 
  storage,
  whitelist: ["users", "flights", "bookings"], 
};

const rootReducer = combineReducers({
  users: usersSlice,
  flights: flightReducer,
  bookings : bookingSlice
});


// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

// Set up persistor for use with PersistGate
const persistor = persistStore(store);


if (typeof window !== "undefined") {
  const currentUser = sessionStorage.getItem("user");
  if (currentUser) {
    store.dispatch(setCurrentUser(JSON.parse(currentUser)));
  }
}

export { store, persistor };
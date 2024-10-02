import { configureStore, combineReducers } from "@reduxjs/toolkit";
import usersSlice, { setCurrentUser } from "./reducers/userSlice";
import flightReducer from "../redux/reducers/flightSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

// Configure persistence for the reducers
const persistConfig = {
  key: "root", // You can give it any key name
  storage,
  whitelist: ["users", "flights"], // Specify the reducers you want to persist
};

const rootReducer = combineReducers({
  users: usersSlice,
  flights: flightReducer,
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

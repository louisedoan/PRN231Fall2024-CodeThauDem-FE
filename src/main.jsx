import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store, persistor } from "./lib/redux/store.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <StrictMode>
          <App />
        </StrictMode>
      </Router>
    </PersistGate>
  </Provider>
);

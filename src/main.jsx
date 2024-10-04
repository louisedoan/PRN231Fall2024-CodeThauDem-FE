import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import store from "./lib/redux/store.jsx";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <StrictMode>
        <App />
      </StrictMode>
    </Router>
  </Provider>
);

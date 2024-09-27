import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar";
import Home from "./pages/Homepage";
import Footer from "./components/layout/footer/Footer";
import { BackgroundBeamsWithCollision } from "../src/components/ui/BackgroundEffect";
import LoginModal from "./components/ui/popup-modal/LoginModal";
import { Provider } from "react-redux";
import store from "./lib/redux/store";
import RegisterModal from "./components/ui/popup-modal/RegisterModal";
import ToasterProvider from "./provider/ToastProvider";
import FlightRoutePage from "./pages/FlightRoutePage";

function App() {
  const location = useLocation();

  return (
    <>
      <Provider store={store}>
        <Router>
          <Navbar />
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />

          <BackgroundBeamsWithCollision>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BackgroundBeamsWithCollision>

          <Footer />
        </Router>
      </Provider>
      {location.pathname !== "/flight-route" && <Navbar />}

      <BackgroundBeamsWithCollision>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flight-route" element={<FlightRoutePage />} />
        </Routes>
      </BackgroundBeamsWithCollision>

      <Footer />
    </>
  );
}

function MainApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default MainApp;
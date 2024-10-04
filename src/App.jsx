import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar";
import Home from "./pages/Homepage";
import Footer from "./components/layout/footer/Footer";
import { BackgroundBeamsWithCollision } from "../src/components/ui/BackgroundEffect";
import LoginModal from "./components/ui/popup-modal/LoginModal";
import { Provider, useSelector } from "react-redux";
import store from "./lib/redux/store";
import RegisterModal from "./components/ui/popup-modal/RegisterModal";
import ToasterProvider from "./provider/ToastProvider";
import FlightRoutePage from "./pages/FlightRoutePage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./pages/AdminPage";
import { useEffect } from "react";

import FlightChoose from "./pages/FlightChoose";
import FlightBookingForm from "./pages/FlightBookingForm";
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector((state) => state.users.currentUser);

  return (
    <>
      <Navbar />
      <ToasterProvider />
      <LoginModal />
      <RegisterModal />

      <BackgroundBeamsWithCollision>
        <Routes>
        <Route
            path="/"
            element={
              currentUser && currentUser.Role === "Admin" ? (
                <AdminPage />
              ) : (
                <Home />
              )
            }
          />
          <Route path="/flight-route" element={<FlightRoutePage />} />
        </Routes>
      </BackgroundBeamsWithCollision>
          <BackgroundBeamsWithCollision>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="flight-route" element={<FlightRoutePage />} />
              <Route path="flight-choose" element={<FlightChoose />} />
              <Route path="flight-booking" element={<FlightBookingForm />} />
            </Routes>

          </BackgroundBeamsWithCollision>

      {location.pathname !== "/" && currentUser?.Role !== "Admin" && <Footer />}
    </>
  );
}

export default App;

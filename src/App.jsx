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
import RegisterModal from "./components/ui/popup-modal/RegisterModal";
import ToasterProvider from "./provider/ToastProvider";
import FlightRoutePage from "./pages/FlightRoutePage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./pages/AdminPage";
import FlightChoose from "./pages/FlightChoose";
import FlightBookingForm from "./components/ui/modal/FlightBookingForm";
import Profile from "./pages/Profile";

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
          <Route path="flight-choose" element={<FlightChoose />} />
          <Route path="flight-booking" element={<FlightBookingForm />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Routes>
      </BackgroundBeamsWithCollision>

      {currentUser?.Role !== "Admin" && <Footer />}
    </>
  );
}

export default App;

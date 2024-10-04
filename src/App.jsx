import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import FlightChoose from "./pages/FlightChoose";
import FlightBookingForm from "./pages/FlightBookingForm";
function App() {
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
              <Route path="flight-route" element={<FlightRoutePage />} />
              <Route path="flight-choose" element={<FlightChoose />} />
              <Route path="flight-booking" element={<FlightBookingForm />} />
            </Routes>

          </BackgroundBeamsWithCollision>

          <Footer />
        </Router>
      </Provider>
    </>
  );
}

export default App;

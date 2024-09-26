import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar";
import Home from "./pages/Homepage";
import Footer from "./components/layout/footer/Footer";
import { BackgroundBeamsWithCollision } from "../src/components/ui/BackgroundEffect";
import FlightRoutePage from "./pages/FlightRoutePage";

function App() {
  const location = useLocation();

  return (
    <>
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
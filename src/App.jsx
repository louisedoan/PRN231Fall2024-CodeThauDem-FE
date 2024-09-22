import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar";
import Home from "./pages/Homepage";
import Footer from "./components/layout/footer/Footer";
import { BackgroundBeamsWithCollision } from "../src/components/ui/BackgroundEffect";

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <BackgroundBeamsWithCollision>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BackgroundBeamsWithCollision>

        <Footer />
      </Router>
    </>
  );
}

export default App;

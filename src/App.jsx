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
import UserInformation from "./pages/UserInformation";
import Profile from "./pages/Profile";
import FlightSeat from "./pages/FlightSeat";
import ManageUsers from "./pages/ManageUsers";
import Checkout from "./pages/Checkout";
import ManageFlight from "./pages/ManageFlight";
import History from "./pages/History";
import PaymentPage from "./pages/PaymentPage"; // Trang thanh toán
import VnPayReturn from "./pages/VnPayReturn";
import PasswordForgot from "./pages/ForgotPassword/ForgotPassword";
import PasswordReset from "./pages/ForgotPassword/ResetPassword";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const excludeLayoutPaths = ["/forgot-password", "/reset-password"];
  const currentUser = useSelector((state) => state.users.currentUser);
  const shouldExcludeLayout = excludeLayoutPaths.includes(location.pathname);

  return (
    <>
    <ToasterProvider />
    <LoginModal />
    <RegisterModal />
    {!shouldExcludeLayout && <Navbar /> }
    <div className={shouldExcludeLayout ? "no-layout" : "with-layout"}>
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
          <Route path="user-information" element={<UserInformation />} />
          <Route path="flight-seat" element={<FlightSeat />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/manage-flight" element={<ManageFlight />} />
          <Route path="/history" element={<History />} />
          <Route path="/payment" element={<PaymentPage />} />{" "}
          <Route path="/vnpay_return" element={<VnPayReturn />} />
          <Route path="/forgot-password" element={<PasswordForgot />} />
          <Route path="/reset-password" element={<PasswordReset />} />
        </Routes>
      </BackgroundBeamsWithCollision>
    </div>
    {!shouldExcludeLayout && <Footer />}

    {currentUser?.Role !== "Admin"}
  </>
);
}

export default App;

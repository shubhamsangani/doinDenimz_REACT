import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import OtpVerificationPage from "./Pages/OtpVerificationPage";
import CreatePasswordPage from "./Pages/CreatePasswordPage";
import Home from "./Pages/Home";
import ProductPage from "./Pages/ProductPage";
import ProductDetails from "./Pages/ProductDetails";
import ScrollToTop from "./Components/ScrollToTop";
import SendOtpPage from "./Pages/SendOtpPage";
import CustomJeans from "./Pages/CustomJeans";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import MeasurementGuidePage from "./Pages/MeasurementGuidePage";
import ProfilePage from "./Pages/ProfilePage";
import CartPage from "./Pages/CartPage";
import ChekoutPage from "./Pages/ChekoutPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DefaultAPICall from "./Components/DefaultAPICall";
import "react-loading-skeleton/dist/skeleton.css";
import ThankYou from "./Pages/ThankYou";
import NotFound from "./Pages/404Page";
import Layout from "./Components/Layout";
import ProtectedRoute from "./Components/ProtectedRoute";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsConditions from "./Pages/TermsConditions";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <ToastContainer style={{width: '350px'}} />
        <DefaultAPICall />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/send-otp" element={<SendOtpPage />} />
          <Route path="/otp-verify" element={<OtpVerificationPage />} />
          <Route path="/create-password" element={<CreatePasswordPage />} />

          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product-detail/:id" element={<ProductDetails />} />
            <Route path="/custom-jeans" element={<CustomJeans />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route
              path="/measurement-guide"
              element={<MeasurementGuidePage />}
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <ChekoutPage />
                </ProtectedRoute>
              }
            />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  setNewAddressPaymentForm } from "../store/Slice";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const dispatch = useDispatch()
  useEffect(() => {
    // "document.documentElement.scrollTo" is the magic for React Router Dom v6
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, [pathname]);


  // For clear Local storage 
  useEffect(() => {
    if (location.pathname !== '/checkout') {
      localStorage.removeItem('activeStep')
      localStorage.removeItem('checkoutAmountData')
      dispatch(setNewAddressPaymentForm(false))
    }
    if (location.pathname !== '/profile') {
      localStorage.removeItem('sidebarList')
    }
    if (location.pathname !== '/thankyou') {
      localStorage.removeItem('cartItems')
      localStorage.removeItem('addressID')
    }
  }, [pathname])

  return null;
}
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  favoriteGetAll,
  fetchCart,
  fetchOrder,
  fetchProduct,
  fetchUserDetails,
} from "../store/APISlice";
import { useLocation } from "react-router-dom";
import { FetchAPI, cartRegisterAPI, deleteCartAllItemAPI } from "../api";

function DefaultAPICall() {
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const addressID = localStorage.getItem("addressID")
  const orderData = JSON.parse(localStorage.getItem("cartItems"));
  console.log("🚀 ~ DefaultAPICall ~ orderData:", orderData)
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchProduct());
    dispatch(fetchCart());
    dispatch(fetchOrder());
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      dispatch(fetchCart());
    }
  }, [location]);

  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === "/product-detail/:id" ||
      location.pathname === "/cart" ||
      location.pathname === "/product" ||
      location.pathname === "/profile"
    ) {
      dispatch(favoriteGetAll());
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname === "/profile") {
      dispatch(fetchUserDetails());
    }
  }, [location]);

  useEffect(() => {
    const deleteCartAllItem = async () => {
      try {
        await FetchAPI(deleteCartAllItemAPI(), "DELETE", {
          user_id: userInfo.id,
        });

        //Cart register API call
        const { data } = await FetchAPI(cartRegisterAPI(), "POST", {
          user_id: userInfo.id,
          shipping_address_id: addressID,
          billing_address_id: addressID,
          promocode_discount: orderData?.promocode_discount,
          shippingcharge: orderData?.shippingcharge,
        });
        console.log(data, "cartregister");
        await dispatch(fetchCart());
      } catch (error) {
        console.log("Error in cart itemAll delete API", error);
      }
    };

    if (location.pathname === "/thankyou") {
      deleteCartAllItem();
    }
  }, [location, dispatch]);

  return;
}

export default DefaultAPICall;

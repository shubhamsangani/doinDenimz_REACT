import { createSlice } from "@reduxjs/toolkit";
import {
  FetchAPI,
  favoriteGetAllAPI,
  getCartAPI,
  orderHistoryAPI,
  personalDetailsAPI,
  productGetAllAPI,
} from "../api";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const APISlice = createSlice({
  name: "DoinDenimAPI",
  initialState: {
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || null, // Retrieve userID from localStorage
    productData: [],
    status: STATUSES.IDLE,
    userName: "",
    favoriteProducts: [],
    cartItem: [],
    checkoutData: [],
    order: [],
  },

  reducers: {
    setProductData: (state, action) => {
      state.productData = action.payload;
    },
    setUserID(state, action) {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload)); // Save userID to localStorage
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setFavoriteProducts: (state, action) => {
      state.favoriteProducts = action.payload;
    },
    setCartItem: (state, action) => {
      state.cartItem = action.payload;
    },
    clearCartItem: (state, action) => {
      state.cartItem = [];
    },
    setCheckoutData: (state, action) => {
      state.checkoutData = state.cartItem?.map((item) => ({
        currency: "inr",
        unit_amount: item.product_final_price,
        product_name: item.product_name,
        quantity: item.quantity,
      }))
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const {
  setProductData,
  setStatus,
  setUserName,
  setFavoriteProducts,
  setCartItem,
  setUserID, setCheckoutData, clearCartItem, setOrder
} = APISlice.actions;
export default APISlice.reducer;

//Thunks--- Products fetch
export function fetchProduct() {
  return async function fetchProductThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const { data } = await FetchAPI(productGetAllAPI(), "post");
      console.log(data);
      dispatch(setProductData(data.Data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

//Thunks--- User Details fetch
export function fetchUserDetails() {
  return async function fetchUserThunk(dispatch, getState) {
    const { userInfo } = getState().API;
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const { data } = await FetchAPI(personalDetailsAPI(), "post", {
        id: userInfo?.id,
      });
      console.log(data);
      dispatch(setUserName(data.userDetails.user_firstname));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

//Get favorites product all API
export function favoriteGetAll() {
  return async function favoriteGetAllThunk(dispatch, getState) {
    const { userInfo } = getState().API;
    if (userInfo) {
      dispatch(setStatus(STATUSES.LOADING));
      try {
        const { data } = await FetchAPI(favoriteGetAllAPI(), "post", {
          user_id: userInfo.id,
        });
        console.log(data);
        dispatch(setFavoriteProducts(data?.Data));
        dispatch(setStatus(STATUSES.IDLE));
      } catch (error) {
        console.log("Error in favoriteget API", error);
        dispatch(setStatus(STATUSES.ERROR));
      }
    }
  };
}

//Get Cart Item API
export function fetchCart() {
  return async function fetchCartThunk(dispatch, getState) {
    const { userInfo } = getState().API;
    if (userInfo) {
      dispatch(setStatus(STATUSES.LOADING));
      try {
        const { data } = await FetchAPI(getCartAPI(), "post", {
          user_id: userInfo.id,
        });
        console.log(data);
        dispatch(setCartItem(data?.Data));
        dispatch(setCheckoutData());
        dispatch(setStatus(STATUSES.IDLE));
      } catch (error) {
        console.log(error);
        dispatch(setStatus(STATUSES.ERROR));
      }
    }
  };
}

//Thunks--- Order History fetch
export function fetchOrder() {
  return async function fetchOrderThunk(dispatch, getState) {
    const { userInfo } = getState().API;
    if (userInfo) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const { data } = await FetchAPI(orderHistoryAPI(), "POST", {
        user_id: userInfo.id,
      });
      console.log(data);
      dispatch(setOrder(data.Data))
      dispatch(setStatus(STATUSES.IDLE));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  }
  };
}
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const toastConfig = {
  position: "bottom-center",
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};
export const errorToast = (message) => toast.error(message, toastConfig);
export const successToast = (message) => toast.success(message, toastConfig);

const Slice = createSlice({
  name: "DoinDenim",
  initialState: {
    data: [],
    newAddressPaymentForm: false,
    addressMethod: "",
    cartItem: [],
    addressID: {
      id: "",
      state: "",
    },
    // imgBaseURL: "http://127.0.0.1:8000/media/",
    imgBaseURL: "https://tailorapi.broaderai.com/media/",
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      // console.log(action.payload);
    },
    setNewAddressPaymentForm: (state, action) => {
      state.newAddressPaymentForm = action.payload;
    },
    setAddressMethod: (state, action) => {
      state.addressMethod = action.payload;
    },
    setAddressID: (state, action) => {
      state.addressID = action.payload;
    },
    setCartItem: (state, action) => {
      state.cartItem.push(action.payload);
    },
  },
});

export const {
  setData,
  setNewAddressPaymentForm,
  setAddressMethod,
  setCartItem,
  setAddressID, 
} = Slice.actions;
export default Slice.reducer;

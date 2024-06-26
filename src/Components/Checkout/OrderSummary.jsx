import React, { useEffect, useState } from "react";
import "./Checkout.css";
import { Chip } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { FetchAPI, checkoutAPI } from "../../api";
import clsx from "clsx";
import { errorToast } from "../../store/Slice";

function OrderSummary() {
  const { addressMethod, addressID, imgBaseURL } =
    useSelector((state) => state.denim);
  const [isLoading, setIsLoading] = useState(false);
  const { cartItem, checkoutData } = useSelector((state) => state.API);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const checkoutAmountData = JSON.parse(localStorage.getItem("checkoutAmountData"));

  const handleCheckout = async () => {
    // const modifiedCheckoutData = checkoutData.map(function (item) {
    //   return {
    //     ...item, // Copy existing properties
    //     shippingcharge: shippingCharge(), // Add new property
    //   };
    // });
    const items = {
      items: checkoutData,
      shippingcharge: shippingCharge(), // Add new property
      promocode_discount: checkoutAmountData.promocodeDiscount
    };
    try {
      const { data } = await FetchAPI(checkoutAPI(), "POST", items);
      console.log(data);
      if (data.url) {
        localStorage.setItem("cartItems", JSON.stringify(items));
        window.open(data.url, "_self");
        // window.open(data.url, "_blank");
      }
    } catch (error) {
      console.log("Error in checkout API", error);
    }
  };

  const placeOrder = async () => {
    if (addressID.id) {
      setIsLoading(true);
      localStorage.setItem("addressID", addressID.id);
      await handleCheckout();
      setIsLoading(false);
    } else {
      errorToast("Please select a delivery address");
    }
  };

  const isPlaceOrderBtnDisabled = () => {
    if (addressMethod === "newAddress") {
      return false;
    }
    return true;
  };

  const shippingCharge = () => {
    const state = addressID?.state;
    if (state === "GUJARAT") {
      return 50;
    } else if (
      state === "RAJASTHAN" ||
      state === "MADHYA PRADESH" ||
      state === "MAHARASHTRA"
    ) {
      return 75;
    } else {
      return 100;
    }
  };

  return (
    <div className="mt-4 lg:mt-0 order_summary">
      <div>
        {/* ======================= Order summary ======================= */}
        <h6 className="font-medium text-gray-800">
          Order Summary&nbsp;
          <span className="text-gray-500">({cartItem?.length})</span>
        </h6>
      </div>

      <div className="mt-3">
        {cartItem?.map((item, index) => (
          <div
            className="font-normal flex items-center mt-3 border-b border-gray-400 pb-3"
            key={index}
          >
            <img
              src={`${imgBaseURL}${item.product_image_1}`}
              alt=""
              className="w-[90px] h-[100px] rounded border border-gray-300 "
            />

            <div className="ps-3 flex-grow">
              <h6 className="text-gray-800 uppercase">{item.product_name}</h6>

              <div className="md:flex">
                <p className="text-gray-500">Size: {item.product_size}</p>
                <p className="text-gray-500 md:ps-3">
                  Color: {item.product_color}
                </p>
              </div>

              <p className="text-gray-500">Qty: {item.quantity}</p>

              <div className="mt-2 flex justify-between order_item">
                <div className="font-normal text-sm">
                  <span className=" text-black font-medium">
                    ₹{item.product_final_price * item.quantity}
                  </span>
                  <span className="ps-2 text-sm line-through text-gray-600">
                    ₹
                    {Math.floor(
                      parseInt(item.product_final_price) /
                        (1 - item.product_maximum_price / 100)
                    ) * item.quantity}
                  </span>
                  <span className="ps-2">
                    <Chip
                      className="bg-[#fee2e2] text-[#ef4444] inline-block"
                      size="sm"
                      value={`-${item.product_maximum_price}%`}
                    />
                  </span>
                </div>
                {/* <div className="cursor-pointer text-[#003060]">Edit Item</div> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <div className="mt-4">
          <div className="flex justify-between my-2">
            <span className="text-gray-600">Total MRP:</span>
            <span className="font-normal">₹ {checkoutAmountData.totalMRP}</span>
          </div>

          <div className="flex justify-between my-2">
            <span className="text-gray-600">Discount on MRP:</span>
            <span className="font-normal text-green-700">
              - ₹ {checkoutAmountData.discountMRP}
            </span>
          </div>

            <div className="flex justify-between my-2">
              <span className="text-gray-600">Promocode Discount:</span>
              <span className="font-normal text-green-700">
                - ₹ {checkoutAmountData.promocodeDiscount}
              </span>
            </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">
              ₹{" "}
              {checkoutAmountData.subTotal}
            </span>
          </div>

          <div className="flex justify-between my-2">
            <span className="text-gray-600">Standard Shipping:</span>
            <span className="font-medium uppercase text-[#003060]">
              ₹ {shippingCharge()}
            </span>
          </div>

          <hr className="bg-gray-400 h-[2px]" />

          <div className="flex justify-between mt-4">
            <span className="text-gray-900 font-medium text-lg">
              Total Amount:
            </span>
            <span className="font-medium text-lg">
              ₹ {checkoutAmountData.subTotal + shippingCharge()}
            </span>
          </div>

          {/* ==================== Buttons ==================== */}
          <div className="mt-8 text-center chekout">
            {isPlaceOrderBtnDisabled() ? (
              <button
                // className="border hover:border-[#003061] rounded-md w-[60%] py-3 hover:text-[#003061] hover:bg-white font-normal bg-[#003061] text-white transition-all"
                className={clsx(
                  "w-[60%]",
                  "py-3",
                  "rounded-md",
                  "text-white",
                  "font-medium",
                  "transition",
                  isLoading
                    ? "bg-[#003061c5] pointer-events-none"
                    : "bg-[#003061] cursor-pointer hover:bg-white hover:border-[#003061] border border-[#003061] hover:text-[#003061]"
                )}
                onClick={placeOrder}
              >
                {isLoading ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin"></i> Wait
                  </>
                ) : (
                  " Place Order"
                )}
              </button>
            ) : (
              <button className="border rounded-md w-[60%] py-3 font-normal bg-[#003061a2] cursor-not-allowed text-white transition-all">
                Place Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;

import React, { useEffect, useState } from "react";
import "./Cart.css";
import { Chip } from "@material-tailwind/react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchAPI,
  deleteCartItemAPI,
  updateCartItemAPI,
  promocodeAPI,
} from "../../api";
import { STATUSES, fetchCart } from "../../store/APISlice";
import Skeleton from "react-loading-skeleton";
import clsx from "clsx";
import AOS from "aos";
import "aos/dist/aos.css";
import { errorToast, successToast } from "../../store/Slice";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Radio,
} from "@material-tailwind/react";

function CartItem_OrderSummary() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [cartIndex, setCartIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [promocodeValidation, setPromocodeValidation] = useState("");
  const [applyPromo, setApplyPromo] = useState(false);
  const { imgBaseURL } = useSelector((state) => state.denim);
  const [selectedPromoCode, setSelectedPromoCode] = useState({
    promocode_name: "",
    promocode_discount: "",
    promocode_minorder: "",
    promocode_firstPurchase: "",
  });
  const [promoCode, setPromoCode] = useState([]);
  const { cartItem, status, order } = useSelector((state) => state.API);
  const [open, setOpen] = React.useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let inStocks = false;

  const handleOpen = () => {
    setOpen(!open);
    setApplyPromo(false);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  const TABLE_HEAD = ["Item", "Quantity", "Subtotal"];

  const handleIncrement = (item, index) => {
    //Update to cart item quntity
    const updateCart = async () => {
      setCartIndex(index);
      const updateCartJSON = {
        product_cart_id: item.product_cart_id,
        product_id: item.product_id,
        user_id: userInfo.id,
        customizing_product_id: "BroaderAI_productcustomize_bi9m7ubmzdcqn6f",
        measurment_profile_id:
          "BroaderAI_product_measurment_details_size_37a4dn3opm7s55q",
        quantity: parseInt(item.quantity) + 1,
        unite_price: item.product_final_price,
        product_cart_action: "active",
        product_details_size_id: item.product_details_size_id,
      };
      try {
        const { data } = await FetchAPI(
          updateCartItemAPI(),
          "PATCH",
          updateCartJSON
        );
        console.log(data);
        dispatch(fetchCart());
      } catch (error) {
        console.log("Error in update to cart API", error);
      } finally {
        setCartIndex(null);
      }
    };

    let totalStock = 0;
    cartItem.map((el) => {
      if (el.product_details_id === item.product_details_id) {
        totalStock = totalStock + parseInt(el.quantity);
      }
    });

    if (totalStock < parseInt(item.product_stock)) {
      updateCart();
    } else {
      errorToast(`Only ${item.product_stock} Qty available in this product`);
    }
    setSelectedPromoCode({
      promocode_name: "",
      promocode_discount: "",
      promocode_minorder: "",
      promocode_firstPurchase: "",
    });
    setPromocodeValidation("");
  };

  const handleDecrement = (item, index) => {
    const updateCart = async () => {
      setCartIndex(index);
      const updateCartJSON = {
        product_cart_id: item.product_cart_id,
        product_id: item.product_id,
        user_id: userInfo.id,
        customizing_product_id: "BroaderAI_productcustomize_bi9m7ubmzdcqn6f",
        measurment_profile_id:
          "BroaderAI_product_measurment_details_size_37a4dn3opm7s55q",
        quantity: parseInt(item.quantity) - 1,
        unite_price: item.product_final_price,
        product_cart_action: "active",
        product_details_size_id: item.product_details_size_id,
      };
      try {
        const { data } = await FetchAPI(
          updateCartItemAPI(),
          "PATCH",
          updateCartJSON
        );
        // setProductDetail(data.Data);
        console.log(data);
        dispatch(fetchCart());
      } catch (error) {
        console.log("Error in update to cart API", error);
      } finally {
        setCartIndex(null);
      }
    };

    if (item.quantity > 1) {
      updateCart();
    }
    setSelectedPromoCode({
      promocode_name: "",
      promocode_discount: "",
      promocode_minorder: "",
      promocode_firstPurchase: "",
    });
    setPromocodeValidation("");
  };

  //Delete Cart Item API
  const deleteCartItem = async (cartID, index) => {
    try {
      setDeletingIndex(index);
      const { data } = await FetchAPI(deleteCartItemAPI(), "DELETE", {
        product_cart_id: cartID,
      });
      console.log(data);
      if (data.Message === "Product Cart is Delete successfully") {
        dispatch(fetchCart());
        successToast("Product removed from cart");
      }
    } catch (error) {
      console.log("Error in cart item delete API", error);
    } finally {
      setDeletingIndex(null);
    }
  };

  //Promocode Get API
  const promocodeGetAll = async () => {
    setIsLoading(true);
    try {
      const { data } = await FetchAPI(promocodeAPI(), "post");
      setPromoCode(data.Data);
      console.log("measurement", data.Data);
    } catch (error) {
      console.log("Error in promocode API", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    promocodeGetAll();
  }, []);

  const activePromocode = promoCode.filter(
    (el) => el.promocode_company_action === "active"
  );

  const totalSubtotal = cartItem?.reduce((total, item) => {
    return total + item.product_final_price * item.quantity;
  }, 0);

  const totalMRP = cartItem?.reduce((total, item) => {
    return (
      total +
      Math.floor(
        parseInt(item.product_final_price) /
          (1 - item.product_maximum_price / 100)
      ) *
        item.quantity
    );
  }, 0);

  const handlePromocodeChange = (name, discount, minOrder, firstPurchase) => {
    setSelectedPromoCode((prev) => ({
      ...prev,
      promocode_name: name,
      promocode_discount: discount,
      promocode_minorder: minOrder,
      promocode_firstPurchase: firstPurchase,
    }));
    setPromocodeValidation("");
  };
  const applyPromocode = () => {
    if (selectedPromoCode.promocode_name.trim() === "") {
      setPromocodeValidation("Please enter a promo code.");
      return;
    }
    if(order?.length > 0 && selectedPromoCode.promocode_firstPurchase === 'yes'){
      setPromocodeValidation("This promocode valid only on first purchase.");
      return;
    }
    setApplyPromo(true);
    successToast("Promocode applied successfully");
  };

  const withPromocodeSubtotal = applyPromo
    ? totalSubtotal - selectedPromoCode.promocode_discount
    : totalSubtotal;

  const navigateCheckout = () => {
    localStorage.setItem(
      "checkoutAmountData",
      JSON.stringify({
        totalMRP: totalMRP,
        discountMRP: totalMRP - totalSubtotal,
        promocodeDiscount: applyPromo ? Number(selectedPromoCode.promocode_discount) : 0,
        subTotal: withPromocodeSubtotal,
      })
    );
    navigate("/checkout");
  };

  return (
    <div>
      <div className="grid grid-cols-12 gap-4 overflow-x-hidden">
        {/* ======================= Cart Item ======================= */}
        <div className="col-span-12 xl:col-span-8 overflow-x-auto">
          <h6 className="md:ps-4 font-medium text-gray-800">
            Cart <span className="text-gray-500">({cartItem?.length})</span>
          </h6>

          {/* ======================= Tablet And Desktop view ======================= */}
          <div className="hidden md:block" data-aos="fade-right">
            <table className="w-full table-auto text-left mt-2">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 p-4"
                    >
                      <div
                        className={`font-medium text-gray-500 ${
                          index !== 0 ? "text-center" : ""
                        }`}
                      >
                        {head}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {status === STATUSES.LOADING ? (
                  <tr className="p-4">
                    <td>
                      <div className="flex items-center">
                        <Skeleton width={90} height={100} className="me-3" />
                        <Skeleton count={3} width={350} />
                      </div>
                    </td>
                    <td>
                      <Skeleton count={1} width={100} />
                    </td>
                    <td>
                      <Skeleton count={1} width={100} />
                    </td>
                  </tr>
                ) : (
                  cartItem?.map((item, index) => {
                    const isLast = index === cartItem.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";
                    if (item.product_stock < 1) {
                      inStocks = true;
                    }
                    return (
                      <tr key={index}>
                        {/* ======================= Product Info ======================= */}
                        <td className={classes}>
                          <div className="font-normal flex items-center">
                            <img
                              src={`${imgBaseURL}${item.product_image_1}`}
                              alt=""
                              className="w-[90px] h-[100px] rounded border border-gray-300 cursor-pointer"
                              onClick={() =>
                                navigate(
                                  `/product-detail/${item.product_details_id}`
                                )
                              }
                            />
                            <div className="ps-3 ">
                              <h6
                                className="text-gray-800 uppercase cursor-pointer"
                                onClick={() =>
                                  navigate(
                                    `/product-detail/${item.product_details_id}`
                                  )
                                }
                              >
                                {item.product_name}
                              </h6>
                              <p className="text-gray-500">
                                Size: {item.product_size}
                              </p>
                              <p className="text-gray-500">
                                Color: {item.product_color}
                              </p>
                              <div className="flex mt-2">
                                {/* <span className="underline text-[#003061] font-medium cursor-pointer">
                                  Edit Item
                                </span>
                                <span className="underline text-[#003061] font-medium cursor-pointer ps-3">
                                  Preview
                                </span> */}

                                {deletingIndex === index ? (
                                  <i className="fa-solid fa-circle-notch fa-spin ms-6"></i>
                                ) : (
                                  <span
                                    className="underline text-red-500 font-medium cursor-pointer "
                                    // ps-3
                                    onClick={() =>
                                      deleteCartItem(
                                        item.product_cart_id,
                                        index
                                      )
                                    }
                                  >
                                    Remove
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* ======================= Quantity ======================= */}
                        <td className={classes}>
                          {item.product_stock > 0 ? (
                            <div className="font-normal flex items-center justify-center">
                              <button
                                className={clsx(
                                  "rounded-full h-[35px] w-[35px] relative border",
                                  item.quantity == 1
                                    ? "cursor-default border-[#e0e0e0] text-[#c2c2c2] "
                                    : "bg-[#f9f9f9]  border-[#c2c2c2] "
                                )}
                                onClick={() => handleDecrement(item, index)}
                              >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                  <FaMinus
                                    className={clsx(
                                      item.quantity == 1
                                        ? " text-[#c2c2c2]"
                                        : "text-gray-800 "
                                    )}
                                  />
                                </div>
                              </button>
                              {cartIndex === index ? (
                                <i className="fa-solid fa-circle-notch fa-spin ms-2"></i>
                              ) : (
                                <span className="ms-2 text-gray-800 text-lg">
                                  {item.quantity}
                                </span>
                              )}

                              <button
                                className="bg-[#f9f9f9] border border-[#c2c2c2] rounded-full h-[35px] w-[35px] relative ms-2"
                                onClick={() => handleIncrement(item, index)}
                              >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                                  <FaPlus className="text-gray-800" />
                                </div>
                              </button>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Chip
                                variant="outlined"
                                color="red"
                                value="Out of Stocks"
                              />
                            </div>
                          )}
                        </td>
                        {/* ======================= Subtotal ======================= */}
                        <td className={classes}>
                          <div className="font-normal text-center">
                            <span className=" text-black font-medium">
                              ₹{item.product_final_price * item.quantity}
                            </span>
                            <span className="ps-2 text-sm line-through text-gray-600 ">
                              ₹
                              {Math.floor(
                                parseInt(item.product_final_price) /
                                  (1 - item.product_maximum_price / 100)
                              ) * item.quantity}
                            </span>
                            <div className="mt-1">
                              <Chip
                                className="bg-[#fee2e2] text-[#ef4444] inline-block"
                                size="sm"
                                value={`-${item.product_maximum_price}%`}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* ======================= Mobile view ======================= */}
          <div className="md:hidden cart_mobile">
            {status === STATUSES.LOADING ? (
              <div className="p-4">
                <div className="flex items-center">
                  <Skeleton width={90} height={100} className="me-2" />
                  <Skeleton count={4} width={200} className="" />
                </div>
                <Skeleton count={1} width={300} className="" />
              </div>
            ) : (
              cartItem?.map((item, index) => {
                if (item.product_stock < 1) {
                  inStocks = true;
                }
                return (
                  <div
                    className="grid grid-cols-12 gap-4 mt-4 border-b pb-4"
                    key={index}
                  >
                    <div className="col-span-4">
                      <img
                        src={`${imgBaseURL}${item.product_image_1}`}
                        alt=""
                        className="w-full h-[100px] rounded border border-gray-300"
                        onClick={() =>
                          navigate(`/product-detail/${item.product_details_id}`)
                        }
                      />

                      {/* ====================== Quantity =======================*/}
                      {item.product_stock > 0 ? (
                        <div className="font-normal flex items-center mt-3 justify-center">
                          <button
                            className={clsx(
                              "rounded-full h-[30px] w-[30px] relative border",
                              item.quantity == 1
                                ? "cursor-default border-[#e0e0e0] text-[#c2c2c2] "
                                : "bg-[#f9f9f9]  border-[#c2c2c2] "
                            )}
                            onClick={() => handleDecrement(item, index)}
                          >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                              <FaMinus
                                className={clsx(
                                  item.quantity == 1
                                    ? " text-[#c2c2c2]"
                                    : "text-gray-800 "
                                )}
                              />
                            </div>
                          </button>
                          {/* <button
                            className="bg-gray-200 rounded-full h-[30px] w-[30px] relative "
                            onClick={() => handleDecrement(item, index)}
                          >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                              <FaMinus className="text-gray-800" />
                            </div>
                          </button> */}
                          {cartIndex === index ? (
                            <i className="fa-solid fa-circle-notch fa-spin mx-1"></i>
                          ) : (
                            <span className="ms-2 text-gray-800 text-lg">
                              {item.quantity}
                            </span>
                          )}

                          <button
                            className="bg-[#f9f9f9] border border-[#c2c2c2] rounded-full h-[30px] w-[30px] relative ms-2"
                            onClick={() => handleIncrement(item, index)}
                          >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                              <FaPlus className="text-gray-800" />
                            </div>
                          </button>
                        </div>
                      ) : (
                        <div className="text-center mt-3 text-wrap text-red-600">
                          <Chip
                            variant="outlined"
                            color="red"
                            value="Out of Stocks"
                            size="sm"
                            className="text-wrap"
                          />
                        </div>
                      )}
                    </div>

                    <div className="col-span-8">
                      <div className="text-sm">
                        <h6
                          className="text-gray-800 uppercase"
                          onClick={() =>
                            navigate(
                              `/product-detail/${item.product_details_id}`
                            )
                          }
                        >
                          {item.product_name}
                        </h6>
                        <p className="text-gray-500">
                          Size: {item.product_size}
                        </p>
                        <p className="text-gray-500">
                          Color: {item.product_color}
                        </p>
                        <div className="flex mt-2 edit_preview_remove">
                          {/* <span className="underline text-[#003061] font-medium cursor-pointer">
                            Edit Item
                          </span>
                          <span className="underline text-[#003061] font-medium cursor-pointer ps-3">
                            Preview
                          </span> */}
                          {deletingIndex === index ? (
                            <i className="fa-solid fa-circle-notch fa-spin ms-6"></i>
                          ) : (
                            <span
                              className="underline text-red-500 font-medium cursor-pointer "
                              // ps-3
                              onClick={() =>
                                deleteCartItem(item.product_cart_id, index)
                              }
                            >
                              Remove
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-2">
                        <div className="font-normal text-sm">
                          <span className=" text-black font-medium">
                            ₹{item.product_final_price * item.quantity}
                          </span>
                          <span className="ps-2 text-sm line-through text-gray-600">
                            ₹{" "}
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
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ======================= Order Summary ======================= */}
        <div
          className="col-span-12  xl:col-span-4 md:ps-4 order_summary"
          data-aos="fade-left"
        >
          <h6 className="font-medium text-gray-800">Order Summary </h6>

          <div className="flex justify-between mt-4 insert_find_promocode">
            <span>Insert a Promo Code</span>
            <span
              className="text-[#003060] cursor-pointer"
              onClick={handleOpen}
            >
              Find Promo Code
            </span>
          </div>
          <div className="flex justify-between gap-4 mt-2">
            <input
              type="text"
              name="promocode"
              placeholder="Enter Promo Code"
              className="w-full p-2 rounded-md border-gray-300 border focus:outline-none text-[#003061] uppercase"
              value={selectedPromoCode.promocode_name}
              // onChange={handlePromocodeChange}
              readOnly
            />
            <button
              className="border rounded-md w-[8rem] text-[#003060] font-medium hover:bg-[#003061] border-[#003061] hover:text-white transition-all"
              onClick={applyPromocode}
            >
              Apply
            </button>
          </div>
          {promocodeValidation && (
            <p className="text-red-500">{promocodeValidation}</p>
          )}

          <div className="pt-4">
            <div className="flex justify-between my-2">
              <span className="text-gray-600">Total MRP:</span>
              <span className="font-normal">₹ {totalMRP}</span>
            </div>
            <div className="flex justify-between my-2">
              <span className="text-gray-600">Discount on MRP:</span>
              <span className="font-normal text-green-700">
                - ₹ {totalMRP - totalSubtotal}
              </span>
            </div>

            <div className="flex justify-between my-2">
              <span className="text-gray-600">Promocode Discount:</span>
              <span className="font-normal text-green-700">
                - ₹{" "}
                {applyPromo ? Number(selectedPromoCode.promocode_discount) : 0}
              </span>
            </div>

            <hr className="bg-gray-400 h-[2px]" />
            <div className="flex justify-between my-2">
              <span className="text-gray-900 font-medium text-lg">
                Subtotal:
              </span>
              <span className="font-medium text-lg">
                ₹{withPromocodeSubtotal}
              </span>
            </div>

            {/* ==================== Buttons ==================== */}
            <div className="mt-8 text-center chekout">
              <button
                className={clsx(
                  "border rounded-md w-[60%] py-3  font-normal  text-white transition-all",
                  inStocks
                    ? " bg-[#003061c5] pointer-events-none"
                    : " hover:border-[#003061] bg-[#003061] hover:bg-white hover:text-[#003061] "
                )}
                onClick={navigateCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== Promocode Dialog ===================== */}
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        {isLoading ? (
          <div className="loader-container-promocode">
            <span className="loader"></span>
          </div>
        ) : (
          <>
            <DialogHeader>Promocodes</DialogHeader>
            <DialogBody className="overflow-y-auto max-h-[25rem]">
              {activePromocode?.map((item, index) => {
                return (
                  <>
                    <div className="flex my-4">
                      <Radio
                        name="promocode"
                        color="indigo"
                        value={item.promocode_name}
                        checked={
                          selectedPromoCode.promocode_name ===
                          item.promocode_name
                        }
                        onChange={() =>
                          handlePromocodeChange(
                            item.promocode_name,
                            item.promocode_discount,
                            item.promocode_min_ordervalue,
                            item.promocode_company_firstpurchase
                          )
                        }
                        disabled={totalSubtotal < item.promocode_min_ordervalue}
                      />
                      <div className="ps-4">
                        <h5 className={clsx(" font-bold text-xl mb-2 border  rounded text-center p-2 uppercase",
                          totalSubtotal < item.promocode_min_ordervalue ? "text-gray-600 border-gray-600" : "text-[#003060] border-[#003060]"
                        )}>
                          {item.promocode_name}
                        </h5>
                        <p className="text-black font-normal">
                          {item.promocode_description}
                        </p>
                      </div>
                    </div>
                    <hr />
                  </>
                );
              })}
            </DialogBody>
            <DialogFooter>
              <div className="mx-auto">
                <Button variant="gradient" color="indigo" onClick={handleOpen}>
                  <span>Submit</span>
                </Button>
              </div>
            </DialogFooter>
          </>
        )}
      </Dialog>
    </div>
  );
}

export default CartItem_OrderSummary;

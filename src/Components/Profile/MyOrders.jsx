import React, { useEffect, useState } from "react";
import { Collapse, Chip } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { FetchAPI, orderCartHistoryAPI } from "../../api";
import Skeleton from "react-loading-skeleton";
import { format } from "date-fns";
import { FaMobile } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";

function MyOrders() {
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const { order } = useSelector((state) => state.API);
  const { imgBaseURL } = useSelector((state) => state.denim);
  const [open, setOpen] = useState(-1);
  const [cartHistory, setCartHistory] = useState([]);

  const toggleOpen = async (index) => {
    setOpen((prevOpen) => (prevOpen === index ? -1 : index));
    if (open === index) {
      return;
    }
  };

  const TABLE_HEAD = [
    "Order ID",
    "Products",
    "Total Item",
    "Total Amount Paid",
    "Order Date",
  ];

  // const orderArray = Array.isArray(order) ? order : [];
  // Sort the order array based on Order Date
  // let sortedOrder = [...orderArray]?.sort((a, b) => {
  //   const dateA = new Date(a.product_cart_register_date_at);
  //   const dateB = new Date(b.product_cart_register_date_at);

  //   return dateB - dateA;
  // });

  //Cart History API
  const orderCartHistory = async () => {
    setIsLoading(true);
    try {
      const { data } = await FetchAPI(orderCartHistoryAPI(), "POST", {
        user_id: userInfo?.id,
      });
      setCartHistory(data.Data);
    } catch (error) {
      console.log("Error in orderCartHistory API", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    orderCartHistory();
  }, []);

  const cartOrderArray = Array.isArray(cartHistory) ? cartHistory : [];

  // Sort the order array based on Order Date
  let sortedCartOrder = [...cartOrderArray]?.sort((a, b) => {
    const dateA = new Date(a.cart_register_date_at);
    const dateB = new Date(b.cart_register_date_at);

    return dateB - dateA;
  });

  return (
    <div>
      {/* ======================= Heading ======================= */}
      <div className="text-center">
        <h4 className="text-gray-800 text-lg font-semibold ">My Orders</h4>
        <p className="text-gray-500 text-sm md:text-base md:w-[90%] xl:w-[80%] mx-auto mt-2">
          "MY ORDERS" provides a comprehensive overview of your past purchases,
          allowing you to track and manage your order history effortlessly. From
          tracking shipments to accessing order details and invoices,
          conveniently stay updated on your purchases and manage your shopping
          experience efficiently.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left mt-8">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className={`border-b border-blue-gray-100 p-4 text-center ${
                    index === 1 ? "min-w-[18rem]" : ""
                  }`}
                >
                  <div className="font-medium text-gray-600">{head}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className="p-4">
                <td>
                  <Skeleton count={1} width={100} />
                </td>
                <td>
                  <div className="flex items-center">
                    <Skeleton width={70} height={80} className="me-3" />
                    <Skeleton count={3} width={200} />
                  </div>
                </td>
                <td>
                  <Skeleton count={1} width={100} />
                </td>
                <td>
                  <Skeleton count={1} width={100} />
                </td>
                <td>
                  <Skeleton count={1} width={100} />
                </td>
                <td>
                  <Skeleton count={1} width={150} />
                </td>
              </tr>
            ) : cartHistory?.length > 0 ? (
              sortedCartOrder.map((item, index) => {
                const isLast = index === order.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                // Extract the last 5 characters
                const orderID = item.cart_id.slice(-15);

                const isoString = item.cart_register_date_at;
                const date = new Date(isoString);

                return (
                  <>
                    <tr
                      key={index}
                      onClick={() => toggleOpen(index)}
                      className="cursor-pointer"
                    >
                      {/* ======================= Order ID ======================= */}
                      <td className={classes}>
                        <div className="font-normal">#{orderID}</div>
                      </td>
                      {/* ======================= Product Info ======================= */}
                      <td className={classes}>
                        <div className="flex  items-center relative">
                          <div className="w-[60px] h-[60px] rounded border border-gray-300 z-10">
                            <img
                              src={`${imgBaseURL}${item.items[0].product_image}`}
                              alt=""
                              className="w-full h-full"
                            />
                          </div>
                          {item.Cartitems > 1 && (
                            <div className="absolute w-[60px] h-[60px] rounded border border-gray-300 left-2 bottom-2">
                              <img
                                src={`${imgBaseURL}${item.items[1].product_image}`}
                                alt=""
                                className="w-full h-full"
                              />
                            </div>
                          )}
                          <div className="ms-4 text-sm">
                            {item.Cartitems > 1 ? (
                              <h6 className="text-[15px]">Men's Jeans <span className="text-gray-600">({item.Cartitems} items)</span></h6>
                            ) : (
                              <div className="line-clamp-1">
                                <h6 className="text-[15px] ">
                                  {item.items[0].product_name}
                                </h6>
                              </div>
                            )}
                          </div>
                        </div>
                        {/* <div className="flex justify-center items-center">
                          <img
                            src={`${imgBaseURL}${item.items[0].product_image}`}
                            alt=""
                            className="w-[60px] h-[60px] rounded border border-gray-300"
                          />
                          {item.Cartitems > 1 && (
                            <div className="h-[50px] w-[50px] rounded-full ms-2 flex items-center justify-center border border-gray-300">
                              + {item.Cartitems - 1}
                            </div>
                          )}
                        </div> */}
                      </td>
                      {/* ======================= Cart Item ======================= */}
                      <td className={classes}>
                        <div className="font-normal text-base text-center">
                          {item.Cartitems}
                        </div>
                      </td>
                      {/* ======================= total ======================= */}
                      <td className={classes}>
                        <div className="font-normal text-base text-center">
                          <span className=" text-black">
                            ₹{item.total_amount}
                          </span>
                        </div>
                      </td>
                      {/* ======================= Order Date ======================= */}
                      <td className={classes}>
                        <div className="font-normal text-sm">
                          {format(date, "dd/MM/yyyy")}
                        </div>
                      </td>
                      <td>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className={`${
                            index === open ? "rotate-180" : ""
                          } h-5 w-5 transition-transform`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </td>
                    </tr>

                    {/* Dropdown */}
                    <tr>
                      <td colSpan={6}>
                        <Collapse open={open === index}>
                          <div className="grid grid-cols-12 border border-blue-gray-50">
                            <div className="col-span-7 border-e h-full">
                              <table className="w-full table-auto">
                                {/* <thead>
                                  <tr className="border-b border-blue-gray-100">
                                    <th>Product Info</th>
                                    <th>Order Status</th>
                                  </tr>
                                </thead> */}
                                <tbody>
                                  {item.items.map((cartItem, index) => {
                                    const isLast =
                                      index === item.items.length - 1;
                                    const classes = isLast
                                      ? "p-4"
                                      : "p-4 border-b border-blue-gray-50";
                                    return (
                                      <tr key={index} className="">
                                        <td className={classes}>
                                          <div className="font-normal flex items-center">
                                            <img
                                              src={`${imgBaseURL}${cartItem.product_image}`}
                                              alt=""
                                              className="w-[80px] h-[90px] rounded border border-gray-300"
                                            />
                                            <div className="ps-2 text-sm">
                                              <h6 className="text-[15px] ">
                                                {
                                                  cartItem.Productdetails[0]
                                                    .product_name
                                                }
                                              </h6>
                                              <p className="text-gray-600">
                                                Size: {cartItem.product_size}
                                              </p>
                                              <p className="text-gray-600">
                                                Color:{" "}
                                                {
                                                  cartItem.Productdetails[0]
                                                    .product_color
                                                }
                                              </p>
                                              <p className="text-gray-600">
                                                Qty: {cartItem.quantity}
                                              </p>
                                            </div>
                                          </div>
                                        </td>

                                        <td className={classes}>
                                          <div className="mt-2 flex ">
                                            <Chip
                                              variant="ghost"
                                              color={
                                                cartItem.order_status ===
                                                "Completed"
                                                  ? "green"
                                                  : cartItem.order_status ===
                                                    "Processing"
                                                  ? "amber"
                                                  : cartItem.order_status ===
                                                    "Pending"
                                                  ? "yellow"
                                                  : cartItem.order_status ===
                                                    "Dispatched"
                                                  ? "blue"
                                                  : cartItem.order_status ===
                                                    "Cancelled"
                                                  ? "red"
                                                  : cartItem.order_status ===
                                                    "Shipped"
                                                  ? "deep-purple"
                                                  : "brown"
                                              }
                                              size="sm"
                                              value={cartItem.order_status}
                                              className="text-center ms-2"
                                            />
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>

                            {/* Delivery and Price Breakup */}
                            <div className="col-span-5 p-4 ">
                              <div className="text-[15px] ">
                                <p className="font-medium text-gray-900">
                                  Delivery Address:
                                </p>
                                <div className="text-gray-700">
                                  <p className="font-medium text-gray-900">
                                    {item.billing_address[0]?.first_name}
                                    &nbsp;
                                    {item.billing_address[0]?.last_name}
                                  </p>
                                  <p>
                                    {item.billing_address[0]?.address}
                                    ,&nbsp;
                                    {item.billing_address[0]?.city}
                                    ,&nbsp;
                                  </p>
                                  <p>
                                    {item.billing_address[0]?.state}
                                    ,&nbsp;
                                    {item.billing_address[0]?.country}
                                    -&nbsp;
                                    {item.billing_address[0]?.zipcode}
                                  </p>
                                  <p className="flex items-center ">
                                    <span className="flex items-center">
                                      <FaMobile className="me-2" />
                                      {item.billing_address[0].mobile_no}
                                    </span>
                                    {item.billing_address[0].phone_no && (
                                      <span className="flex items-center ms-4">
                                        <BsTelephoneFill className="me-2" />
                                        {item.billing_address[0].phone_no}
                                      </span>
                                    )}
                                  </p>
                                </div>
                              </div>
                              <p className="font-medium text-gray-900 mt-3">
                                Amount Breakup:
                              </p>
                              <div className="flex justify-between mt-1">
                                <div className="text-[15px]">
                                  <p className=" text-gray-700">Sub Amount:</p>
                                  <p className=" mt-1 text-gray-700">
                                    Promocode Discount:
                                  </p>
                                  <p className=" mt-1 text-gray-700">
                                    Shipping Charge:
                                  </p>
                                  <p className=" mt-1 text-gray-700">
                                    Total Order Price:
                                  </p>
                                </div>
                                <div className="text-[15px]">
                                  <p className="">₹ {item.sub_amount}</p>
                                  <p className="mt-1 text-green-800">
                                    - ₹ {item.promocode_amount}
                                  </p>
                                  <p className="mt-1 text-[#003060]">
                                    + ₹ {item.shipping_charge}
                                  </p>
                                  <p className="mt-1">₹ {item.total_amount}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </td>
                    </tr>
                  </>
                );
              })
            ) : (
              <tr className="mt-12">
                <td colSpan={6} className="text-center">
                  <p className="text-gray-700 text-2xl md:text-3xl mt-4">
                    No Order Found
                  </p>
                  <p className="text-gray-500 text-lg md:text-xl mt-2">
                    Looks like you haven't made your order yet
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyOrders;

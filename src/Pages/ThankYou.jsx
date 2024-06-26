import Lottie from "lottie-react";
import React from "react";
import success from "../assets/success.json";

function ThankYou() {
  const {items, promocode_discount, shippingcharge} = JSON.parse(localStorage.getItem("cartItems"));

  const totalSubtotal = items?.reduce((total, item) => {
    return total + item.unit_amount * item.quantity;
  }, 0);

  return (
    <div className="pt-[62px] md:pt-[72px] xl:pt-[88px]">
      <header className="site-header">
        <h1 className="text-3xl md:text-5xl font-semibold text-center mt-8 p-8">
          Thank you for your purchase!
        </h1>
      </header>

      <div className="text-center">
        <div className=" my-4 inline-block ">
          <div className="w-44 ">
            <Lottie animationData={success} loop={false} />
          </div>
        </div>
      </div>

      <div className="p-8">
        <h5 className="text-2xl font-medium mb-4 text-center">Order History</h5>
        <div className="overflow-x-auto">
          <table className="md:w-[70%] mx-auto min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  Products
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center">
                  Quntity
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, index) => (
                <tr key={index} className="even:bg-blue-gray-50/50">
                  <td className="p-4">{item.product_name}</td>
                  <td className="p-4 text-center">{item.quantity}</td>
                  <td className="p-4 text-center">
                    ₹ {item.unit_amount * item.quantity}
                  </td>
                </tr>
              ))}
              <tr className="even:bg-blue-gray-50/50">
                <th className="p-4"></th>
                <th className="p-4 text-center">Promocode Discount</th>
                <th className="text-center">- ₹ {promocode_discount}</th>
              </tr>
              <tr className="even:bg-blue-gray-50/50">
                <th className="p-4"></th>
                <th className="p-4 text-center">Shipping Charge</th>
                <th className="text-center">+ ₹ {shippingcharge}</th>
              </tr>
              <tr className="even:bg-blue-gray-50/50">
                <th className="p-4"></th>
                <th className="p-4 text-center">Total Amount</th>
                <th className="text-center">₹ {totalSubtotal - promocode_discount + shippingcharge}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <footer className="text-center mt-8">
        <p className="site-footer__fineprint" id="fineprint">
          Copyright ©2023 | All Rights Reserved
        </p>
      </footer>
    </div>
  );
}

export default ThankYou;

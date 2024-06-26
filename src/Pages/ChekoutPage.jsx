import React from "react";
import Delivery from "../Components/Checkout/Delivery";
import OrderSummary from "../Components/Checkout/OrderSummary";

function CheckoutPage() {
  
  return (
    <div className="pt-[62px] md:pt-[72px] xl:pt-[88px]">
      <div className="grid grid-cols-12 gap-4 p-8">
        <div className="col-span-12 lg:col-span-8">
          {/* ======================= Delivery ======================= */}
          <div>
            <Delivery />
          </div>
        </div>

        {/* ======================= Order Summary ======================= */}
        <div className="col-span-12 lg:col-span-4">
          <OrderSummary  />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

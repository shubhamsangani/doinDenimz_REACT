import React from "react";
import CartItem_OrderSummary from "../Components/Cart/CartItem_OrderSummary";
import MostPopular from "../Components/Cart/MostPopular";
import { useSelector } from "react-redux";
import emptycart from "../assets/emptycart.png";

function CartPage() {
  const { cartItem } = useSelector((state) => state.API);
  return (
    <div className="pt-[62px] md:pt-[72px] xl:pt-[88px]">
      <div className="p-8">
        {cartItem?.length > 0 ? (
          <CartItem_OrderSummary />
        ) : (
          <div className=" h-[15rem] flex justify-center items-center flex-col">
            <img src={emptycart} alt="" />
            <p className="text-gray-600 text-2xl md:text-3xl mt-4">
              Your Cart is empty
            </p>
          </div>
        )}
        <MostPopular />
      </div>
    </div>
  );
}

export default CartPage;

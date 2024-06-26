import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { Chip } from "@material-tailwind/react";
import iconImg from "../../assets/productdetail-icon.png";
import howtomeasureImg from "../../assets/howtomeasure.png";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchAPI,
  addToCartAPI,
  addToFavoriteAPI,
  favoriteDeleteAPI,
  getSizeofProductAPI,
} from "../../api";
import clsx from "clsx";
import { favoriteGetAll, fetchCart } from "../../store/APISlice";
import { useNavigate, useParams } from "react-router-dom";
import "animate.css";
import { errorToast, successToast } from "../../store/Slice";
import { motion } from "framer-motion";
import { PopUPBox } from "../../animation";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

function ProductDetailDesc({ productDetail }) {
  const dispatch = useDispatch();
  const params = useParams();
  const [open, setOpen] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [getSizeofProduct, setGetSizeofProduct] = useState([]);
  const [isShaking, setIsShaking] = useState(false);
  const [selectSize, setSelectSize] = useState("");
  const { favoriteProducts, cartItem } = useSelector((state) => state.API);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // const userSignUpInfo = JSON.parse(localStorage.getItem("userSignUpInfo"));

  const handleOpen = (value) => {setOpen(open === value ? 0 : value)}

  //Get product size API
  const productGetSize = async () => {
    try {
      const { data } = await FetchAPI(getSizeofProductAPI(), "post", {
        product_details_id: params.id,
      });
      setGetSizeofProduct(data.Data);
      console.log(data, "size");
    } catch (error) {
      console.log("Error in getSizeofProduct API", error);
    }
  };
  useEffect(() => {
    productGetSize();
  }, []);

  // Sort the getSizeofProduct array based on productosize_name
  const sortedSizeProducts = getSizeofProduct?.sort((a, b) => {
    // Use localeCompare to compare strings in a case-insensitive manner
    return a.productosize_name.localeCompare(b.productosize_name);
  });

  //Add to cart API
  const addToCart = async () => {
    setIsLoading(true);
    const addCartJSON = {
      product_id: productDetail[0].product_details_id,
      user_id: userInfo.id,
      customizing_product_id: "BroaderAI_productcustomize_bi9m7ubmzdcqn6f",
      measurment_profile_id:
        "BroaderAI_product_measurment_details_size_37a4dn3opm7s55q",
      quantity: "1",
      unite_price: productDetail[0].product_final_price,
      product_details_size_id: selectSize,
    };
    try {
      const { data } = await FetchAPI(addToCartAPI(), "POST", addCartJSON);
      console.log(data);
      if (data.Message === "Product Cart Details is Added") {
        successToast("Product added to cart");
        dispatch(fetchCart());
      }
    } catch (error) {
      console.log("Error in add to cart API", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCartHandler = async () => {
    if (!userInfo) {
      errorToast("Login is Required");
      return;
    }

    if (!selectSize) {
      setIsShaking(true);
      errorToast("Please select a size");
      setTimeout(() => setIsShaking(false), 1000);
      return;
    }

    const totalStock = cartItem?.reduce(
      (acc, el) =>
        el.product_details_id === params.id ? acc + parseInt(el.quantity) : acc,
      0
    );
    // =========== or ==========
    // let totalStock = 0;
    //       cartItem?.map((el) => {
    //         if(el.product_details_id === params.id){
    //           totalStock = totalStock + parseInt(el.quantity)
    //         }
    //       })

    if (totalStock >= productDetail[0]?.product_stock) {
      errorToast(
        `Only ${productDetail[0]?.product_stock} Qty available in this product`
      );
      return;
    }

    await addToCart();
  };

  //Add to favorites product API
  const addToFavorite = async () => {
    if (!userInfo) {
      errorToast("Login is Required");
      return;
    }

    setFavLoading(true);
    try {
      const { data } = await FetchAPI(addToFavoriteAPI(), "POST", {
        user_id: userInfo?.id,
        product_details_id: params.id,
      });
      console.log(data);
      if (data?.Message === "Product is Added to favorites") {
        dispatch(favoriteGetAll());
        successToast("Added to favorites");
      }
    } catch (error) {
      console.log("Error in addToFavorite API", error);
    } finally {
      setFavLoading(false);
    }
  };

  const isFavorite = favoriteProducts?.some(
    (favorite) => favorite.product_details_id === params.id
  );

  //Delete favorite API
  const deleteFavorite = async (productID, index) => {
    setFavLoading(true);
    try {
      const { data } = await FetchAPI(favoriteDeleteAPI(), "DELETE", {
        user_id: userInfo.id,
        product_details_id: params.id,
      });
      console.log(data);
      if (data.Message === "Product is remove from favorites") {
        dispatch(favoriteGetAll());
        successToast("Removed from favorites");
      }
    } catch (error) {
      console.log("Error in favorite delete API", error);
    } finally {
      setFavLoading(false);
    }
  };

  const handleSelectSize = (sizeID) => {
    setSelectSize(sizeID);
  };

  return (
    <div className="lg:ps-6 mt-5 lg:mt-0">
      {/* ==================== Product's Name, Price and Discount.. ==================== */}
      <div className="">
        <h6 className="text-[#1F2937] text-2xl font-medium">
          {productDetail[0]?.product_name}
        </h6>
        <div className="flex items-center mt-3 text-xl">
          <span className=" text-black font-medium">
            ₹ {productDetail[0]?.product_final_price}
          </span>
          <span className="ps-4 text-base line-through text-gray-600">
            ₹
            {Math.floor(
              parseInt(productDetail[0]?.product_final_price) /
                (1 - productDetail[0]?.product_maximum_price / 100)
            )}
          </span>
          <span className="ps-4">
            <Chip
              className="bg-[#fee2e2] text-[#ef4444]"
              size="sm"
              value={`${productDetail[0]?.product_maximum_price}%`}
            />
          </span>
        </div>
      </div>

      {/* ==================== Product's size.. ==================== */}

      <div className="mt-6 font-medium text-lg">SELECT SIZE</div>
      <div className={isShaking ? "animate__animated animate__headShake" : ""}>
        <div className="grid grid-cols-5 md:grid-cols-10 lg:grid-cols-6 xl:grid-cols-7 gap-3 mt-2">
          {sortedSizeProducts?.map((item, index) => {
            return (
              <div className="relative" key={index}>
                <input
                  type="radio"
                  name="size"
                  className=" h-12 md:h-11 w-full cursor-pointer appearance-none rounded-md border-[#9CA3AF] border-2 transition-all checked:border-[#3B82F6] checked:border-[3px]"
                  onChange={() =>
                    handleSelectSize(item.product_details_size_id)
                  }
                />
                <span className="absolute pointer-events-none text-gray-600 font-medium top-[45%] left-2/4 text-lg -translate-x-1/2 -translate-y-1/2">
                  {item.productosize_name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ==================== Buttons ==================== */}
      <div className="mt-6">
        <div className="flex justify-between gap-4">
          {productDetail[0]?.product_stock > 0 ? (
            <button
              className={clsx(
                "rounded-md",
                "w-full",
                "py-3",
                "font-normal",
                "text-white",
                "transition-all",
                isLoading
                  ? "bg-[#003061c5] pointer-events-none"
                  : "bg-[#003061] cursor-pointer lg:hover:bg-white lg:hover:border-[#003061] border border-[#003061] lg:hover:text-[#003061]"
              )}
              onClick={() => addToCartHandler()}
            >
              {isLoading ? (
                <i className="fa-solid fa-circle-notch fa-spin"></i>
              ) : (
                <i className="fa-solid fa-cart-shopping"></i>
              )}
              &nbsp; Add to Cart
            </button>
          ) : (
            <button className="border border-[#da5151] rounded-md w-full py-3 text-[#aa2121] font-medium cursor-default">
              &nbsp; Out of Stocks
            </button>
          )}

          {isFavorite ? (
            <button
              className="border border-[#003061] rounded-md w-full py-3 text-[#003061] font-normal lg:hover:bg-[#003061] lg:hover:text-white transition-all"
              onClick={() => deleteFavorite()}
            >
              {favLoading ? (
                <i className="fa-solid fa-circle-notch fa-spin"></i>
              ) : (
                <i className="fa-solid fa-heart text-lg"></i>
              )}
              &nbsp; Remove from Favorite
            </button>
          ) : (
            <button
              className="border border-[#003061] rounded-md w-full py-3 text-[#003061] font-normal lg:hover:bg-[#003061] lg:hover:text-white transition-all"
              onClick={() => addToFavorite()}
            >
              {favLoading ? (
                <i className="fa-solid fa-circle-notch fa-spin"></i>
              ) : (
                <i className="fa-regular fa-heart text-lg"></i>
              )}
              &nbsp; Add to Favorite
            </button>
          )}
        </div>
      </div>

      {/* ==================== Icon Part ==================== */}
      <div className="mt-6 p-4 bg-[#F3F4F6] rounded-md">
        <div className="flex justify-between md:justify-around">
          <div className="text-center">
            <img src={iconImg} alt="" className="mx-auto" />
            <h6 className="text-black text-sm md:text-lg mt-3 leading-tight">
              Custom Made
            </h6>
            <p className="text-xs md:text-sm text-[#6B7280] mt-2">
              Made To Your Fit{" "}
            </p>
          </div>
          <div className="text-center">
            <img src={iconImg} alt="" className="mx-auto" />
            <h6 className="text-black text-sm md:text-lg mt-3 leading-tight">
              Fit Guarantee
            </h6>
            <p className="text-xs md:text-sm text-[#6B7280] mt-2">
              93% + Perfect Fit{" "}
            </p>
          </div>
          <div className="text-center">
            <img src={iconImg} alt="" className="mx-auto" />
            <h6 className="text-black text-sm md:text-lg mt-3 leading-tight">
              Free Alterations
            </h6>
            <p className="text-xs md:text-sm text-[#6B7280] mt-2">
              Within 10 days{" "}
            </p>
          </div>
        </div>
      </div>

      {/* ==================== Accordion ==================== */}
      <div className="mt-6">
        <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(1)}
            className="text-gray-600 font-normal text-base md:text-lg"
          >
            Fabric Details
          </AccordionHeader>
          <AccordionBody>
          <motion.div
             variants={PopUPBox}
             initial="hidden"
             whileInView="show"
            >
            <span className="text-base text-black">
              Product Fabric: &nbsp;
              <span className="font-medium">
                {productDetail[0]?.product_fabric}
              </span>
            </span>
            </motion.div>
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(2)}
            className="text-gray-600 font-normal text-base md:text-lg"
          >
            Size Guide
          </AccordionHeader>
          <AccordionBody>
            <motion.div
             variants={PopUPBox}
             initial="hidden"
             whileInView="show"
            >
              <div className="overflow-x-scroll howtomeasure">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-100 p-4 sticky left-0">
                        Sizes
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-100 p-4 ">
                        28
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-100 p-4 ">
                        30
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-100 p-4 ">
                        32
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-100 p-4 ">
                        34
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-100 p-4 ">
                        36
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-100 p-4 ">
                        38
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-100 p-4 ">
                        40
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-100 p-4 ">
                        42
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="">
                      <th className="p-4 sticky left-0 bg-white">Waist (in)</th>
                      <td className="p-4">29</td>
                      <td className="p-4">31</td>
                      <td className="p-4">33</td>
                      <td className="p-4">35</td>
                      <td className="p-4">37</td>
                      <td className="p-4">39</td>
                      <td className="p-4">41</td>
                      <td className="p-4">43</td>
                    </tr>
                    <tr className="bg-blue-gray-50">
                      <th className="p-4 sticky left-0 bg-blue-gray-50">
                        Thigh (in)
                      </th>
                      <td className="p-4">21.7</td>
                      <td className="p-4">22.8</td>
                      <td className="p-4">23.7</td>
                      <td className="p-4">24.8</td>
                      <td className="p-4">25.7</td>
                      <td className="p-4">26.7</td>
                      <td className="p-4">27.8</td>
                      <td className="p-4">28.7</td>
                    </tr>
                    <tr className="">
                      <th className="p-4 sticky left-0 bg-white">Hip (in)</th>
                      <td className="p-4">36</td>
                      <td className="p-4">38</td>
                      <td className="p-4">40</td>
                      <td className="p-4">42</td>
                      <td className="p-4">44</td>
                      <td className="p-4">46</td>
                      <td className="p-4">48</td>
                      <td className="p-4">50</td>
                    </tr>
                    <tr className="bg-blue-gray-50">
                      <th className="p-4 sticky left-0 bg-blue-gray-50">
                        Inseam Length (in)
                      </th>
                      <td className="p-4">33</td>
                      <td className="p-4">33</td>
                      <td className="p-4">33</td>
                      <td className="p-4">33</td>
                      <td className="p-4">33</td>
                      <td className="p-4">33</td>
                      <td className="p-4">33</td>
                      <td className="p-4">33</td>
                    </tr>
                    <tr className="">
                      <th className="p-4 sticky left-0 bg-white">
                        Leg Opening (in)
                      </th>
                      <td className="p-4">12.2</td>
                      <td className="p-4">12.8</td>
                      <td className="p-4">13.7</td>
                      <td className="p-4">13.8</td>
                      <td className="p-4">14.7</td>
                      <td className="p-4">14.7</td>
                      <td className="p-4">15.8</td>
                      <td className="p-4">15.7</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h6 className="text-xl text-black font-semibold my-4">
                How to measure yourself
              </h6>
              <div>
                <img src={howtomeasureImg} alt="" className="mx-auto" />
              </div>
            </motion.div>
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(3)}
            className="text-gray-600 font-normal text-base md:text-lg"
          >
            Product Description
          </AccordionHeader>
          <AccordionBody>
          <motion.div
             variants={PopUPBox}
             initial="hidden"
             whileInView="show"
            >
            <p className="text-black text-base">
              {productDetail[0]?.product_description}
            </p>
            <p className=" text-base text-black mt-2">
              Care instructions:{" "}
              <span className=" font-medium">
                {productDetail[0]?.product_wash}
              </span>
            </p>
            <p className=" text-base text-black mt-2">
              Item Weight:{" "}
              <span className=" font-medium">
                {productDetail[0]?.product_weight} g
              </span>
            </p>
            </motion.div>
          </AccordionBody>
        </Accordion>
        {/* <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(4)}
            className="text-gray-600 font-normal text-base md:text-lg"
          >
            Alteration
          </AccordionHeader>
          <AccordionBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi unde
            maiores quo illo est dolorum quas. Voluptate fugiat, cum explicabo
            at illo ipsa, ratione aperiam inventore iste autem in commodi.
          </AccordionBody>
        </Accordion> */}
        <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(5)}
            className="text-gray-600 font-normal text-base md:text-lg"
          >
            Colors
          </AccordionHeader>
          <AccordionBody>
          <motion.div
             variants={PopUPBox}
             initial="hidden"
             whileInView="show"
            >
            <span className="text-base text-black">
              Product Color:&nbsp;
              <span className="font-medium">
                {productDetail[0]?.product_color}
              </span>
            </span>
            </motion.div>
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 6} icon={<Icon id={6} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(6)}
            className="text-gray-600 font-normal text-base md:text-lg"
          >
            Delivery Time
          </AccordionHeader>
          <AccordionBody>
          <motion.div
             variants={PopUPBox}
             initial="hidden"
             whileInView="show"
            >
            <p className="text-base text-black">
              No Cash on delivery. <br />
              Delivery within 12-14 business days.
            </p>
            </motion.div>
          </AccordionBody>
        </Accordion>
      </div>
    </div>
  );
}

export default ProductDetailDesc;

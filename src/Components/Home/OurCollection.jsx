import React, { useEffect } from "react";
import "./Home.css";
import customjeans from "../../assets/customjeans.png";
import { IoIosArrowDropright } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { STATUSES } from "../../store/APISlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCard from "../Product/ProductCard";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { FadeIn } from "../../animation";


function OurCollection() {
  const navigate = useNavigate();
  const { productData, status, favoriteProducts } = useSelector(
    (state) => state.API
  );
  const trendProduct = productData.filter(
    (item) =>
      item.is_product_trend === "Yes" && item.is_product_action === "active"
  );
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      <div className="p-8 overflow-x-hidden">
        {/* ================== Heading =================== */}
        <div className="text-center" data-aos="fade-down">
          <h4 className="uppercase text-[#4B49AC] font-semibold">
            Our collection
          </h4>
          <h2 className="text-[#1F2937] text-3xl mt-3 font-bold">
            Start Shopping
          </h2>
          <p className="text-gray-500 mt-4 text-sm md:text-base lg:w-[60%] mx-auto">
            Shop with confidence knowing that we prioritize customer
            satisfaction and strive to provide an enjoyable shopping experience.
            With secure payment options, fast shipping, and hassle-free returns,
            your satisfaction is our top priority.
          </p>
        </div>

        {/* ================== Gallery =================== */}
        <div className="lg:flex justify-around mt-6">
          <div className="lg:w-[45%] w-full" data-aos="fade-right">
            <div className="relative rounded-md overflow-hidden">
              <img
                src={customjeans}
                alt=""
                className="relative w-full h-full"
              />
              <div className="absolute bottom-0 left-0 text-white flex justify-around items-center p-6 custom_jeans">
                <div className="w-[85%]">
                  <h6 className="text-xl">Custom Jeans</h6>
                  <p className="mt-2 text-gray-300 text-sm md:text-base">
                    Design your perfect pair of jeans with our customizable
                    options. From fit to fabric, create jeans that reflect your
                    style and personality. Tailor-made for you, our custom jeans
                    ensure comfort and individuality in every stitch.
                  </p>
                </div>
                <div
                  // onClick={() => navigate("/custom-jeans")}
                  onClick={() => navigate("/product")}
                >
                  <IoIosArrowDropright className="text-5xl cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          <div
            className="lg:w-[55%] w-full lg:ps-8 mt-6 lg:mt-0"
            data-aos="fade-left"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {status === STATUSES.LOADING
                ? [...Array(4)].map((_, index) => (
                    <div key={index}>
                      <Skeleton width={325} height={350} className="mb-2" />
                      <Skeleton count={2} />
                    </div>
                  ))
                : trendProduct?.slice(0, 4).map((item, index) => {
                    // Check if the current product's productID exists in the favoriteProducts array
                    const isFavorite = favoriteProducts?.some(
                      (favorite) =>
                        favorite.product_details_id === item.product_details_id
                    );
                    return (
                      <div key={index}>
                        <motion.div
                          variants={FadeIn}
                          initial="hidden"
                          whileInView="show"
                        >
                          <ProductCard
                            item={item}
                            index={index}
                            isFavorite={isFavorite}
                          />
                        </motion.div>
                      </div>
                    );
                  })}

            </div>

            {/* ================== Button =================== */}
            <div className="text-center mt-8">
              <button
                className="border border-[#003061] rounded-md px-4 py-3 text-[#003061] font-semibold hover:bg-[#003061] hover:text-white transition-all"
                onClick={() => navigate("/product")}
              >
                See The Collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurCollection;

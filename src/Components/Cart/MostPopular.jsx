import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { STATUSES } from "../../store/APISlice";
import Skeleton from "react-loading-skeleton";
import ProductCard from "../Product/ProductCard";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { FadeIn } from "../../animation";

function MostPopular() {
  const { productData, status, favoriteProducts } = useSelector(
    (state) => state.API
  );

  const popularProduct = productData.filter(
    (item) =>
      item.is_product_popular === "Yes" && item.is_product_action === "active"
  );

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div data-aos="fade-up">
      {/* ======================= Heading ======================= */}
      <div className="text-center mt-8">
        <h4 className="text-gray-800 text-2xl font-semibold uppercase">
          most popular
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {status === STATUSES.LOADING
          ? [...Array(4)].map((_, index) => (
              <div key={index}>
                <Skeleton width={300} height={300} className="mb-2" />
                <Skeleton count={2} />
              </div>
            ))
          : popularProduct.slice(0, 4).map((item, index) => {
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
    </div>
  );
}

export default MostPopular;

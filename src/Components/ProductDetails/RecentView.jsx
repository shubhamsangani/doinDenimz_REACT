import React from "react";
import { useSelector } from "react-redux";
import { STATUSES } from "../../store/APISlice";
import Skeleton from "react-loading-skeleton";
import ProductCard from "../Product/ProductCard";
import { motion } from "framer-motion";
import { FadeIn } from "../../animation";

function RecentView({ filteredProductDetail }) {
  const { status, favoriteProducts } = useSelector((state) => state.API);
  const recentProduct = filteredProductDetail.filter(
    (item) => item.is_product_new === "Yes"
  );

  return (
    <div>
      <div>
        <h2 className="text-center font-semibold text-2xl text-[#1F2937]">
          Recently add products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {status === STATUSES.LOADING
            ? [...Array(4)].map((_, index) => (
                <div key={index}>
                  <Skeleton width={300} height={300} className="mb-2" />
                  <Skeleton count={2} />
                </div>
              ))
            : recentProduct.slice(0, 4).map((item, index) => {
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
    </div>
  );
}

export default RecentView;

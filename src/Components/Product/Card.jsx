import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES } from "../../store/APISlice";
import Skeleton from "react-loading-skeleton";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import ProductCard from "./ProductCard";
import { setActive } from "../../store/FilterSlice";
import { FadeIn } from "../../animation";
import { motion } from "framer-motion";

function Card() {
  const dispatch = useDispatch();
  const { status, favoriteProducts } = useSelector((state) => state.API);
  const { filteredProducts, active } = useSelector((state) => state.filter);
  const [screenSize, setScreenSize] = useState("desktop"); // Default to desktop view

  useEffect(() => {
    // Function to update screen size state based on window width
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial call to set screen size state
    handleResize();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Determine threshold for pagination based on screen size
  const paginationThreshold = screenSize === "desktop" ? 9 : 6;

  // Calculate the total page for pagination button display
  const totalItems = filteredProducts.length;

  // Define different items per page based on screen size
  let itemsPerPage;
  if (window.matchMedia("(min-width: 1024px)").matches) {
    itemsPerPage = 9;
  } else {
    itemsPerPage = 6;
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the index range of products to display based on the current page
  const indexOfLastProduct = active * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  //Pagination
  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    className: active === index ? "bg-[#003060] " : "bg-gray-300",
    ripple: false,
    onClick: () => {
      // setActive(index);
      dispatch(setActive(index));
      document.documentElement.scrollTo({
        top: 500,
        left: 0,
        behavior: "smooth",
      });
    },
  });

  const next = () => {
    if (active === totalPages) return;
    dispatch(setActive(active + 1));
    document.documentElement.scrollTo({
      top: 500,
      left: 0,
    });
    // setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    dispatch(setActive(active - 1));
    document.documentElement.scrollTo({
      top: 500,
      left: 0,
    });
    // setActive(active - 1);
  };

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <IconButton key={i} {...getItemProps(i)}>
          {i}
        </IconButton>
      );
    }
    return buttons;
  };

  return (
    <div className="md:ps-6 card">
      {/* ========================= Product Card ========================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {status === STATUSES.LOADING
          ? [...Array(6)].map((_, index) => (
              <div key={index}>
                <Skeleton width={300} height={300} className="mb-2" />
                <Skeleton count={2} />
              </div>
            ))
          : currentProducts?.map((item, index) => {
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

      {filteredProducts.length == 0 && (
        <div className=" h-[15rem] flex justify-center items-center flex-col">
          <p className="text-gray-600 text-2xl md:text-3xl mt-4">
            No Products Found
          </p>
        </div>
      )}

      {/* ========================= Pagination ========================= */}
      {filteredProducts.length > paginationThreshold && (
        <div className="flex items-center gap-4 mt-16 mb-8 justify-center">
          <Button
            variant="text"
            className="flex items-center gap-2"
            onClick={prev}
            disabled={active === 1}
          >
            <GrLinkPrevious className="h-4 w-4" /> Previous
          </Button>
          <div className="flex items-center gap-2">{renderPageButtons()}</div>
          <Button
            variant="text"
            className="flex items-center gap-2"
            onClick={next}
            disabled={active === totalPages}
          >
            Next
            <GrLinkNext className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default Card;

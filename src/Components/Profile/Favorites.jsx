import React, { useState } from "react";
import { Chip, Tooltip } from "@material-tailwind/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES, favoriteGetAll } from "../../store/APISlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { FetchAPI, favoriteDeleteAPI } from "../../api";
import { successToast } from "../../store/Slice";

function Favorites() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productData, status, favoriteProducts} = useSelector(
    (state) => state.API
  );
  const [favoriteIndex, setFavoriteIndex] = useState(null)
  const { imgBaseURL } = useSelector((state) => state.denim);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // Extract productDetailIDs from favoriteProducts array
  const favoriteProductIDs = favoriteProducts?.map(
    (item) => item.product_details_id
  );

  // Filter productData array based on favoriteProductIDs
  const filteredProductData = productData.filter((item) =>
    favoriteProductIDs?.includes(item.product_details_id)
  );

  //Delete favorite API
  const deleteFavorite = async (productID, index) => {
    try {
      setFavoriteIndex(index)
      const { data } = await FetchAPI(favoriteDeleteAPI(), "DELETE", {
        user_id: userInfo.id,
        product_details_id: productID,
      });
      console.log(data);
      if (data.Message === "Product is remove from favorites") {
       successToast('Removed from favorites')
        dispatch(favoriteGetAll());
      }
    } catch (error) {
      console.log("Error in favorite delete API", error);
    } finally {
      setFavoriteIndex(null)
    }
  };

  return (
    <div>
      {/* ======================= Heading ======================= */}
      <div className="text-center">
        <h4 className="text-gray-800 text-lg font-semibold ">Favorites</h4>
        <p className="text-gray-500 text-sm md:text-base md:w-[90%] xl:w-[80%] mx-auto mt-2">
          "FAVORITES" is your personalized collection of cherished items. Easily
          curate and organize products you adore, ensuring quick access for
          future reference or purchase. From fashion pieces track of your
          preferred items and enjoy a tailored shopping experience tailored just
          for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-5">
        {status === STATUSES.LOADING ? (
          [...Array(3)].map((_, index) => (
            <div key={index}>
              <Skeleton width={300} height={300} className="mb-2" />
              <Skeleton count={2} />
            </div>
          ))
        ) : filteredProductData.length !== 0 ? (
          filteredProductData.map((item, index) => {
            return (
              <div className="relative card" key={index}>
                <img
                  src={`${imgBaseURL}${item.product_image_1}`}
                  alt=""
                  className="border border-gray-300 rounded-md h-[320px] md:h-[300px] w-full object-contain"
                  onClick={() =>
                    navigate(`/product-detail/${item.product_details_id}`)
                  }
                />
                <h6
                  className="text-gray-600 mt-3"
                  onClick={() =>
                    navigate(`/product-detail/${item.product_details_id}`)
                  }
                >
                  {item.product_name}
                </h6>
                <div className="flex items-center">
                  <span className=" text-black">
                    ₹{item.product_final_price}
                  </span>
                  <span className="ps-4 text-sm line-through text-gray-600">
                    ₹
                    {Math.floor(
                      parseInt(item.product_final_price) /
                       ( 1 - (item.product_maximum_price / 100))
                    )}
                  </span>
                  <span className="ps-4">
                    <Chip
                      className="bg-[#fee2e2] text-[#ef4444]"
                      size="sm"
                      value={`${item.product_maximum_price}%`}
                    />
                  </span>
                </div>
                <div className="absolute top-2 right-2 lg:hidden hover_icon">
                  {/* <div className="bg-white rounded-full p-1.5 flex justify-center cursor-pointer hover:bg-[#003061] hover:text-white transition-all">
                    <MdOutlineModeEdit />
                  </div> */}
                  <Tooltip
                    content="Remove from Favorite"
                    placement="bottom"
                    className="hidden lg:block"
                  >
                    {favoriteIndex === index ? (
                      <i className="fa-solid fa-circle-notch fa-spin ms-[6px] mt-2 text-[18px]"></i>
                    ) : (
                      <div
                        className="bg-white rounded-full p-1.5 mt-2 flex justify-center cursor-pointer hover:bg-[#003061] hover:text-white transition-all"
                        onClick={() =>
                          deleteFavorite(item.product_details_id, index)
                        }
                      >
                        <RiDeleteBin6Line className="text-[18px]" />
                      </div>
                    )}
                  </Tooltip>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-3 text-center mt-8">
            <p className="text-gray-600 text-2xl md:text-3xl">
              No Products in Favorites
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;

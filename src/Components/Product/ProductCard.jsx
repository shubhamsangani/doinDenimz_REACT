import React, { useEffect, useState } from "react";
import { Chip, Tooltip } from "@material-tailwind/react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES, favoriteGetAll } from "../../store/APISlice";
import { FetchAPI, addToFavoriteAPI, favoriteDeleteAPI } from "../../api";
import { errorToast, successToast } from "../../store/Slice";

function ProductCard({ item, index, isFavorite }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [favoriteIndex, setFavoriteIndex] = useState(null);
  const { imgBaseURL } = useSelector((state) => state.denim);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));


  //Add to favorites product API
  const addToFavorite = async (productID, index) => {
    if (userInfo) {
      try {
        setFavoriteIndex(index);
        const { data } = await FetchAPI(addToFavoriteAPI(), "POST", {
          user_id: userInfo?.id,
          product_details_id: productID,
        });
        console.log(data);
        if (data?.Message === "Product is Added to favorites") {
          dispatch(favoriteGetAll())
          successToast('Added to favorites')
        }
      } catch (error) {
        console.log("Error in addToFavorite API", error);
      } finally {
        setFavoriteIndex(null);
      }
    } else {
      errorToast('Login is Required')
    }
  };

  //Delete favorite API
  const deleteFavorite = async (productID, index) => {
    try {
      setFavoriteIndex(index);
      const { data } = await FetchAPI(favoriteDeleteAPI(), "DELETE", {
        user_id: userInfo.id,
        product_details_id: productID,
      });
      console.log(data);
      if (data.Message === "Product is remove from favorites") {
        dispatch(favoriteGetAll())
        successToast('Removed from favorites')
      }
    } catch (error) {
      console.log("Error in favorite delete API", error);
    } finally {
      setFavoriteIndex(null);
    }
  };

  return (
    <div>
      <div className="relative card cursor-pointer">
        <img
          src={`${imgBaseURL}${item.product_image_1}`}
          alt=""
          className="border border-gray-300 rounded-md h-[320px] md:h-[300px] w-full object-contain"
          onClick={() => navigate(`/product-detail/${item.product_details_id}`)}
        />
        <h6
          className="text-gray-600 mt-3"
          onClick={() => navigate(`/product-detail/${item.product_details_id}`)}
        >
          {item.product_name}
        </h6>
        <div className="flex items-center">
          <span className=" text-black font-medium">₹{item.product_final_price}</span>
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
            content={
              isFavorite
                ? "Remove from Favorite"
                : "Add to Favorite"
            }
            placement="bottom"
            className="hidden lg:block"
          >
            {favoriteIndex === index ? ( //For loading icon
              <i className="fa-solid fa-circle-notch fa-spin ms-[6px] mt-2 text-[18px]"></i>
            ) : isFavorite && userInfo ? ( //For favorite product or not
              <div
                className="bg-white rounded-full p-1.5 mt-2 flex justify-center cursor-pointer hover:bg-[#003061] hover:text-white transition-all"
                onClick={() => deleteFavorite(item.product_details_id, index)}
              >
                <FaHeart className="text-[18px]" />
              </div>
            ) : (
              <div
                className="bg-white rounded-full p-1.5 mt-2 flex justify-center cursor-pointer hover:bg-[#003061] hover:text-white transition-all"
                onClick={() => addToFavorite(item.product_details_id, index)}
              >
                <FaRegHeart className="text-[18px]" />
              </div>
            )}
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

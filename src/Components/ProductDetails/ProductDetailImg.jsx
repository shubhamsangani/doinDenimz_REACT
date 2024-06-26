import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";

function ProductDetailImg({ productDetail }) {
  const [mainImage, setMainImage] = useState(productDetail[0]?.product_image_1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { imgBaseURL } = useSelector((state) => state.denim);
  // Update state when productDetail changes
//   useEffect(() => {
//     if (productDetail && productDetail.length > 0) {
//       const initialMainImage = productDetail[0]?.product_image_1;
//       setMainImage(initialMainImage);
//     }
//   }, [productDetail]);

  // Check if productDetail is not available yet
//   if (!productDetail || productDetail.length === 0) {
//     return <div>Loading...</div>;
//   }

  const productImages = [
    productDetail[0]?.product_image_1,
    productDetail[0]?.product_image_2,
    productDetail[0]?.product_image_3,
  ];

  const handleImageClick = (newImage, index) => {
    setMainImage(newImage);
    setSelectedImageIndex(index);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
     
      {/* ======================= Vertical grid view ======================= */}
      <div className="hidden md:block">
        <div className="grid grid-cols-5 gap-4" data-aos="fade-right">
          <div className="col-span-1">
            {productImages.map((image, index) => (
              <div
                key={index}
                onClick={() => handleImageClick(image, index)}
                className={`relative overflow-hidden  
                            ${index == 0 ? "mt-0" : "mt-4"} 
                            ${selectedImageIndex === index ? "selected" : "border border-gray-300 rounded-md"}`}
              >
                <img
                  src={`${imgBaseURL}${image}`}
                  alt=""
                  className="h-[110px] w-full cursor-pointer small-image object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
          <div className="col-span-4 row-span-4 overflow-hidden border border-gray-300 rounded-md">
            <img
              src={`${imgBaseURL}${mainImage}`}
              alt=""
              className="w-auto h-[500px] mx-auto rounded-lg product_details_img object-cover"
            />
          </div>
        </div>
      </div>

      {/* ======================= Mobile view ======================= */}
      <div className="block md:hidden">
        <Swiper
          spaceBetween={30}
          pagination={true}
          modules={[Pagination]}
          className="mySwiper"
        >
          {productImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="overflow-hidden">
                <img
                  src={`${imgBaseURL}${image}`}
                  alt=""
                  className="w-auto h-[320px] rounded-lg object-contain mx-auto"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default ProductDetailImg;

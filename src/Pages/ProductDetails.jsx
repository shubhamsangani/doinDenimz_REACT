import React, { useEffect, useState } from "react";
import ProductDetailImg from "../Components/ProductDetails/ProductDetailImg";
import ProductDetailDesc from "../Components/ProductDetails/ProductDetailDesc";
import HowToOrder from "../Components/ProductDetails/HowToOrder";
import SatisfiedCustomer from "../Components/ProductDetails/SatisfiedCustomer";
import AlsoLikeCard from "../Components/ProductDetails/AlsoLikeCard";
import RecentView from "../Components/ProductDetails/RecentView";
import { useParams } from "react-router-dom";
import { FetchAPI, productGetAPI } from "../api";
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";

function ProductDetails() {
  const params = useParams();
  const [productDetail, setProductDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { productData} = useSelector((state) => state.API);

  //Get product API
  const productGet = async () => {
    setIsLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("product_details_id", params.id);

    try {
      const { data } = await FetchAPI(productGetAPI(), "post", formDataToSend);
      setProductDetail(data.Data);
      console.log(data);
    } catch (error) {
      console.log("Error in ProductDetail API", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    productGet();
  }, [params]);

  useEffect(() => {
    AOS.init({ 
      once: true,
    });
  }, []);

  const filteredProductDetail = productData.filter((el) => {
    return el.product_details_id !== params.id && el.is_product_action === 'active'
})

  return (
    <div className="pt-[62px] md:pt-[72px] xl:pt-[88px]">
      {isLoading ? (
        <div className="loader-container-productDetails">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="p-8">
          <div className="grid grid-cols-12 overflow-x-hidden">
            <div className="col-span-12 lg:col-span-7" data-aos="fade-right">
              <ProductDetailImg productDetail={productDetail} />
            </div>
            <div className="col-span-12 lg:col-span-5" data-aos="fade-left">
              <ProductDetailDesc productDetail={productDetail}  />
            </div>
          </div>
          <div className="mt-12" data-aos="fade-up">
            <HowToOrder />
          </div>
          {/* <div className="mt-12">
            <SatisfiedCustomer />
          </div> */}
          <div className="mt-12" data-aos="fade-up">
            <AlsoLikeCard filteredProductDetail={filteredProductDetail} />
          </div>
          <div className="mt-12" data-aos="fade-up">
            <RecentView filteredProductDetail={filteredProductDetail} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;

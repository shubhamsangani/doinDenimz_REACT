import React, { useEffect, useRef, useState } from "react";
import './Home.css'
import herojeans from '../../assets/herojeans.png'
import pant_button from '../../assets/pant_button.png'
import pant_calf from '../../assets/pant_claf.png'
import pant_pocket from '../../assets/pant_pocket.png'
import pant_thigh from '../../assets/pant_thigh.png'
import AOS from "aos";
import "aos/dist/aos.css";

function StartShopping() {

    useEffect(() => {
        AOS.init();
      }, []);

    return (
        <div>
            <div className="p-8 mt-8" >
                {/* ================== Heading =================== */}
                <div className="text-center" data-aos="fade-down">
                    <h4 className='uppercase text-[#4B49AC] font-semibold'>Our collection</h4>
                    <h2 className='text-[#1F2937] text-3xl mt-3 font-bold'>Start Shopping</h2>
                    <p className='text-gray-500 mt-4 text-sm md:text-base lg:w-[60%] mx-auto'>Our curated collection features high-quality products from top brands and independent designers. From casual essentials to statement pieces, each item is carefully chosen to ensure style, comfort, and durability.</p>
                </div>

                {/* ================== Tablet & Desktop view =================== */}
                <div className="shooping_jeans hidden md:block overflow-x-hidden" >
                    <div className='grid grid-cols-12  mt-5 relative place-items-center'>
                        <div className="col-span-3 lg:col-span-4 ">
                            <div className="grid grid-rows-3 ">
                                {/* ================== Left Feature 1 =================== */}
                                <div className='grid grid-rows-2 lg:grid-cols-4 details1 duration-300 text-right items-center'
                                data-aos="fade-right"
                                >
                                    <div className="lg:col-span-3 me-2 ps-5 order-2 lg:order-1 ">
                                        <h2 className="font-semibold text-base lg:text-xl xl:text-2xl">Watch Pocket</h2>
                                        <p className="text-sm lg:text-base">Denim timepiece holder.</p>
                                    </div>
                                    <div className="flex items-center border-2 border-gray-400 lg:me-auto h-[4rem] w-[4rem]  rounded-full order-1 lg:order-2 ms-auto overflow-hidden z-[2]">
                                        <img src={pant_pocket} alt="" className="w-full h-full" />
                                    </div>
                                </div>
                                <div></div>
                                {/* ================== Left Feature 2 =================== */}
                                <div className='grid grid-rows-2 lg:grid-cols-4 details2 duration-300 text-right'
                                data-aos="fade-right"
                                >
                                    <div className="lg:col-span-3 me-2 ps-5 order-2 lg:order-1">
                                        <h2 className="font-semibold text-base lg:text-xl xl:text-2xl">Thigh</h2>
                                        <p className="text-sm lg:text-base">Stylish denim thighs.</p>
                                    </div>
                                    <div className="flex items-center border-2 border-gray-400 lg:me-auto h-[4rem] w-[4rem]  rounded-full order-1 lg:order-2 ms-auto overflow-hidden z-[2]">
                                        <img src={pant_thigh} alt="" className="w-full h-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6 lg:col-span-4" >
                            <img src={herojeans} alt="" className='w-auto h-[500px] pant' />
                        </div>
                        <div className="col-span-3 lg:col-span-4 items-center">
                            <div className="grid grid-rows-3 ">
                                {/* ================== Right Feature 1 =================== */}
                                <div className='grid grid-rows-2 lg:grid-cols-4  details3 duration-300 animate__animated animate__fadeInRight herotext'
                                data-aos="fade-left"
                                >
                                    <div className="flex items-center border-2 border-gray-400 lg:mx-auto h-[4rem] w-[4rem]  rounded-full overflow-hidden z-[2]">
                                        <img src={pant_button} alt="" className="w-full h-full" />
                                    </div>
                                    <div className="lg:col-span-3 ms-2">
                                        <h2 className="font-semibold text-base lg:text-xl xl:text-2xl">Button</h2>
                                        <p className="text-sm lg:text-base ">Denim's buttoned elegance.</p>
                                    </div>
                                </div>
                                <div></div>
                                {/* ================== Right Feature 2 =================== */}
                                <div className='grid grid-rows-2 lg:grid-cols-4 details4 duration-300 '
                                data-aos="fade-left"
                                >
                                    <div className="flex items-center border-2 border-gray-400 lg:mx-auto h-[4rem] w-[4rem]  rounded-full overflow-hidden z-[2]">
                                        <img src={pant_calf} alt="" className="w-full h-full" />
                                    </div>
                                    <div className="col-span-3 ms-2">
                                        <h2 className="font-semibold text-base lg:text-xl xl:text-2xl">Calf</h2>
                                        <p className="text-sm lg:text-base">Stylish denim calves.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================== Mobile view =================== */}
                <div className="md:hidden mt-12 realtive shopping_jeans_mobile" data-aos="zoom-in">
                    <div className="flex justify-between">
                        <div className="feature1"
                        >
                            <div className="w-[95%]">
                                <h2 className="font-semibold text-base">Watch Pocket</h2>
                                <p className="text-sm">Denim timepiece holder.</p>
                            </div>
                            <div className="flex items-center border-2 border-gray-400 h-[4rem] w-[4rem] rounded-full me-auto overflow-hidden mt-5 !z-[2]">
                                <img src={pant_pocket} alt="" className="w-full h-full" />
                            </div>
                        </div>
                        <div className="feature2"
                        >
                            <div className="text-right ms-auto w-[95%]">
                                <h2 className="font-semibold text-base">Button</h2>
                                <p className="text-sm ">Denim's buttoned elegance.</p>
                            </div>
                            <div className="flex items-center border-2 border-gray-400 h-[4rem] w-[4rem] ms-auto rounded-full overflow-hidden mt-5 mobile_button !z-[2]">
                                <img src={pant_button} alt="" className="w-full h-full" />
                            </div>
                        </div>
                    </div>

                    <div className="pant_container">
                        <img src={herojeans} alt="" className='w-auto h-[400px] mobile_pant' />
                    </div>

                    <div className="flex justify-between">
                        <div className="feature3"
                        >
                            <div className="flex items-center border-2 border-gray-400 h-[4rem] w-[4rem] rounded-full me-auto overflow-hidden z-[2]">
                                <img src={pant_thigh} alt="" className="w-full h-full" />
                            </div>
                            <div className="w-[95%] mt-5">
                                <h2 className="font-semibold text-base">Thigh</h2>
                                <p className="text-sm">Stylish denim thighs.</p>
                            </div>
                        </div>
                        <div className="feature4"
                        >
                            <div className="flex items-center border-2 border-gray-400 h-[4rem] w-[4rem] ms-auto rounded-full overflow-hidden z-[2]">
                                <img src={pant_calf} alt="" className="w-full h-full" />
                            </div>
                            <div className="text-right ms-auto w-[95%] mt-5">
                                <h2 className="font-semibold text-base">Calf</h2>
                                <p className="text-sm ">Stylish denim calves.</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default StartShopping
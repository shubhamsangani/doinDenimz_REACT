import React, { useEffect } from 'react'
// import productimg from '../../assets/Group2.png'
import productimg from '../../assets/productcover.jpg'
import AOS from "aos";
import "aos/dist/aos.css";

function TopProduct() {
    useEffect(() => {
        AOS.init();
      }, []);

    return (
        <div>
            {/* ======================= Top Section ======================= */}
            <div>
                <div className='relative' data-aos="fade-down">
                    <img src={productimg} alt="" className='w-full h-[400px] md:h-[calc(100vh-72px)] xl:h-[calc(100vh-88px)]  object-cover' loading="lazy" />
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                    <div className='md:w-[60%] xl:w-[50%] absolute top-[50%] -translate-y-1/2 px-4 md:ps-8'>
                        <h1 className='text-white text-2xl lg:text-4xl font-semibold text-center md:text-left'>NEW MEN'S COLLECTION 2024</h1>
                        <p className='text-gray-300 mt-3 text-center md:text-left'>Discover the latest trends in men's fashion with our 2024 collection. Elevate your style with premium quality garments crafted to perfection. Stay ahead of the fashion curve with our new arrivals.</p>

                        {/* <div className="mt-6 text-center md:text-left">
                            <button className='border border-white rounded-md px-6 lg:px-10 py-3 text-white font-medium hover:bg-[#003061] hover:border-[#003061] transition-all'>Get Your Pair</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopProduct
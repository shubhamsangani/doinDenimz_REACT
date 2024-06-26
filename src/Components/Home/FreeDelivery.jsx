import React, { useEffect } from 'react'
import shirt from '../../assets/4jeans.png'
import jeans from '../../assets/11jeans.png'
import AOS from "aos";
import "aos/dist/aos.css";

function FreeDelivery() {
    useEffect(() => {
        AOS.init();
      }, []);

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 overflow-x-hidden">
                <div className='border-l-0 border-t border-b border-r border-gray-400' data-aos="fade-right">
                    <div className="flex flex-wrap md:flex-row md:items-center md:justify-between p-8">
                        <div className='md:w-[60%] md:pe-6 order-2 md:order-1 mt-5 md:mt-0'>
                            <h2 className='text-2xl text-[#1F2937] font-medium'>Denim Delights Await</h2>
                            <p className='text-gray-500 mt-2 text-justify'>Uncover unbeatable savings on premium denim at DOINDENIMZ! Explore our stylish jeans collection at special prices. Upgrade your wardrobe or find a new favorite pair today and save big!</p>
                        </div>
                        <div className='md:w-[40%] order-1 md:order-2'>
                            <img src={shirt} alt="" className='w-full' />
                        </div>
                    </div>
                </div>
                <div className='border-e-0 lg:border-t border-b border-r border-gray-400' data-aos="fade-left">
                    <div className="flex flex-wrap md:flex-row md:items-center md:justify-between p-8">
                        <div className='md:w-[60%] md:pe-6 order-2 md:order-1 mt-5 md:mt-0'>
                            <h2 className='text-2xl text-[#1F2937] font-medium'>Exclusive Deals</h2>
                            <p className='text-gray-500 mt-2 text-justify'>Unlock exclusive deals with our loyalty program. Enjoy early access to sales, member-only discounts, and special promotions. Sign up for free to stay updated and save big on your favorite products.</p>
                        </div>
                        <div className='md:w-[40%] order-1 md:order-2'>
                            <img src={jeans} alt="" className='w-full' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FreeDelivery
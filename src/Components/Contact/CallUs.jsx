import React, { useEffect } from 'react'
import { ImMobile } from "react-icons/im";
import { TfiWrite } from "react-icons/tfi";
import AOS from "aos";
import "aos/dist/aos.css";

function CallUs() {
    useEffect(() => {
        AOS.init();
      }, []);

    return (
        <div>
            <div data-aos="fade-right">
                <div className='flex flex-col items-center justify-center rounded p-4 '>
                    <div className=' text-center'>
                        <h5 className='text-lg md:text-3xl font-semibold mt-2 text-gray-800 mb-4'>DoinDenimz</h5>
                        <p>Crafting timeless denim styles since 2023, DoinDenimz Co. blends quality craftsmanship with contemporary designs for the modern denim enthusiast.</p>
                    </div>
                </div>

                <div className='flex flex-col md:flex-row items-center border border-gray-400 rounded p-4 md:p-8 mt-6'>
                    <div className='bg-[#E5E7EB] p-4 rounded-md'>
                        <ImMobile className='text-4xl' />
                    </div>
                    <div className='md:ps-4 mt-4 md:mt-0 text-center md:text-left'>
                        <h6 className='text-gray-500 font-semibold'>Call Us</h6>
                        <a href='tel:+919638014309' className='text-lg md:text-xl font-semibold mt-2 text-gray-800 !no-underline'>+91 96380 14309</a>
                        <p className='text-sm text-gray-500 mt-1'>Monday to friday: From 10 am to 6 pm</p>
                    </div>
                </div>

                <div className='flex flex-col md:flex-row items-center border border-gray-400 rounded p-4 md:p-8 mt-6 '>
                    <div className='bg-[#E5E7EB] p-4 rounded-md'>
                        <TfiWrite className='text-4xl' />
                    </div>
                    <div className='md:ps-4 mt-4 md:mt-0 text-center md:text-left'>
                        <h6 className='text-gray-500 font-semibold'>Write to Us</h6>
                        <a href='mailto:Geography.jeans@gmail.com' className='text-lg md:text-xl font-semibold mt-2 text-gray-800 break-all !no-underline'>Geography.jeans@gmail.com</a>
                        <p className='text-sm text-gray-500 mt-1'>We read e-mails Monday to Friday during working hours and we will respond within a 24h period.</p>
                    </div>
                </div>

                
            </div>
        </div>
    )
}

export default CallUs
import React, { useEffect } from 'react'
import CallUs from '../Components/Contact/CallUs';
import Contact from '../Components/Contact/Contact';
import AOS from "aos";
import "aos/dist/aos.css";

function ContactUs() {
    useEffect(() => {
        AOS.init();
      }, []);

    return (
        <div className='pt-[62px] md:pt-[72px] xl:pt-[88px]'>
            <div className="p-8">

                {/* ================== Heading =================== */}
                <div className="text-center" data-aos="fade-down">
                    <h2 className='text-[#1F2937] text-xl md:text-3xl mt-3 font-semibold'>HOW CAN WE HELP YOU?</h2>
                    <p className='text-gray-500 mt-4 text-sm md:text-base lg:w-[50%] mx-auto'>We're here to help you with whatever you need and to answer any questions about your online or in-store shopping.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 items-center overflow-x-hidden">
                    {/* ================== Call, write, address =================== */}
                   <CallUs />

                    {/* ================== Contact us =================== */}
                   <Contact />
                </div>
            </div>
        </div>
    )
}

export default ContactUs
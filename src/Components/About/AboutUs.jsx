import React, { useEffect } from 'react'
import aboutus from '../../assets/aboutus.png'
import { useNavigate } from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";

function AboutUs() {
    const navigate = useNavigate()
    useEffect(() => {
        AOS.init();
      }, []);

    return (
        <div className='pe-8 ps-8 lg:pe-0'>
            <div className="grid grid-cols-1 lg:grid-cols-2 overflow-x-hidden">
                <div className='flex items-center text-center md:text-left' data-aos="fade-right">
                    <div className="lg:p-4 mt-5 lg:mt-0">
                        {/* ================== Heading =================== */}
                        <h4 className='uppercase text-[#4B49AC] font-semibold'>About Us</h4>
                        <h2 className='text-[#1F2937] text-2xl md:text-3xl mt-3 font-bold'>Welcome to Doin'Denimz</h2>
                        <p className='text-gray-500 mt-4 text-sm md:text-base lg:w-[95%] text-justify'>Welcome to the world of Doin'Denimz, where we invite you to embark on a truly personalized denim journey. As a brand committed to individuality, each stitch in our denim tells a unique story tailored exclusively for men. Beyond mere fashion, we aspire to craft an experience that transcends trends and resonates with the essence of each wearer.</p>

                        {/* ================== Button =================== */}
                        <div className='text-center md:text-left mt-4'>
                        <button className='border border-[#003061] rounded-md px-4 py-3 text-[#003061] font-semibold hover:bg-[#003061] hover:text-white transition-all' onClick={() => navigate('/product')}>See The Collection</button>
                        </div>
                    </div>
                </div>

                <div className='mt-6 lg:mt-0' data-aos="fade-left">
                    <img src={aboutus} alt="" className='w-full' />
                </div>
            </div>
        </div>
    )
}

export default AboutUs
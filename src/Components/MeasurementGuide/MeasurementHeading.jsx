import React, { useEffect } from 'react'
import aboutus from '../../assets/measurementguide.png'
import { useNavigate } from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";

function MeasurementHeading() {
    const navigate = useNavigate()
    useEffect(() => {
        AOS.init();
      }, []);

    return (
        <div>
            <div className='pe-8 ps-8 lg:pe-0'>
                <div className="grid grid-cols-1 lg:grid-cols-2 overflow-x-hidden">
                    <div className='flex items-center text-center md:text-left' data-aos="fade-right">
                        <div className="lg:p-4 mt-5 lg:mt-0">
                            {/* ================== Heading =================== */}
                            <h4 className='uppercase text-[#4B49AC] font-semibold'>Measurement Guide</h4>
                            <h2 className='text-[#1F2937] text-2xl md:text-3xl mt-3 font-bold'>How to Measurement?</h2>
                            <p className='text-gray-500 mt-4 text-sm md:text-base w-[95%] text-justify'>Measuring jeans involves several key steps to ensure a proper fit. Begin by measuring the waist, usually at the narrowest point above the hips. For the inseam, measure from the crotch to the hem along the inner leg. The rise measurement is taken from the crotch seam to the top of the waistband. Additionally, leg opening can be measured across the bottom hem. These measurements provide essential guidance when selecting jeans for optimal comfort and style..</p>

                            {/* ================== Button =================== */}
                            <div className='text-center md:text-left mt-4'>
                                <button className='border border-[#003061] rounded-md px-4 py-3 text-[#003061] font-semibold hover:bg-[#003061] hover:text-white transition-all' onClick={() => navigate('/product')}>See The Collection</button>
                            </div>
                        </div>
                    </div>

                            {/* ================== image =================== */}
                    <div className='mt-6 lg:mt-0' data-aos="fade-left">
                        <img src={aboutus} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MeasurementHeading
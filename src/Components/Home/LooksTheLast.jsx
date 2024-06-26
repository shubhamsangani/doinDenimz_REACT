import React, { useEffect } from 'react'
import looksthelastimg from '../../assets/looksthelastimg.png'
import { useNavigate } from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";

function LooksTheLast() {
    const navigate = useNavigate()
    useEffect(() => {
        AOS.init();
      }, []);

    return (
        <div className='p-8'>
            <div className="grid grid-cols-1 lg:grid-cols-2 overflow-x-hidden">
                <div className='rounded overflow-hidden' data-aos="fade-right">
                    <img src={looksthelastimg} alt="" />
                </div>
                <div className='flex items-center text-center md:text-left' data-aos="fade-left">
                    <div className="lg:p-4 mt-5 lg:mt-0">
                        {/* ================== Heading =================== */}
                        <h4 className='uppercase text-[#4B49AC] font-semibold'>Our collection</h4>
                        <h2 className='text-[#1F2937] text-3xl mt-3 font-bold'>Looks that last</h2>
                        <p className='text-gray-500 mt-4 text-base text-justify'>Discover timeless fashion pieces designed for durability and style. Our collection features high-quality materials and meticulous craftsmanship, ensuring your looks withstand the test of time. Shop now for enduring elegance.</p>

                        {/* ================== Button =================== */}
                        {/* <div className='text-center md:text-left mt-4'>
                            <button className='border border-[#003061] rounded-md px-4 py-3 text-[#003061] font-semibold hover:bg-[#003061] hover:text-white transition-all' onClick={() => navigate('/product')}>Order Samples</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LooksTheLast
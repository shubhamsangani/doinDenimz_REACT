import React, { useEffect } from 'react'
import featureimg from '../../assets/featureimg.png'
import { useNavigate } from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";

function Feature() {
    const navigate = useNavigate()
    useEffect(() => {
        AOS.init();
      }, []);
    return (
        <div className='mt-8'>
            <div className="bg-[#CCD6DF] md:p-12 p-6 lg:h-[45rem] overflow-x-hidden">
                <div className="relative flex flex-col lg:flex-row">
                    {/* ================== Heading and Text =================== */}
                    <div className='lg:w-[55%] xl:w-[50%] rounded bg-white p-4 md:p-8'
                    data-aos="fade-right">
                        <h4 className='uppercase text-[#4B49AC] font-semibold'>Features</h4>
                        <h2 className='text-[#1F2937] text-2xl md:text-3xl mt-3 font-bold'>
                        Discover Your Fit with Doin'Denimz</h2>
                        <div className='lg:w-[85%]'>
                            <p className='text-gray-500 mt-4 text-base mx-auto text-justify pe-4'>Explore our innovative Doin'Denimz tool to discover the perfect pair of jeans tailored just for you. With advanced algorithms and precise measurements, finding your ideal fit has never been easier.</p>
                            <ul className='list-disc ps-6 pe-4 mt-4'>
                                <li className='text-gray-500 text-base text-justify'>Unsure about finding the perfect jeans? Try our Doin'Denimz tool for personalized recommendations tailored to your preferences, simplifying the search for your ideal fit.</li>
                                <li className='text-gray-500 text-base text-justify'>Experience personalized recommendations based on your unique preferences.</li>
                                <li className='text-gray-500 text-base text-justify'>Say goodbye to the hassle of searching endlessly. Try Doin'Denimz today!</li>
                            </ul>
                        </div>
                        
                        {/* ================== Button =================== */}
                        <div className='text-center lg:text-left mt-8'>
                        <button className='border border-[#003061] rounded-md px-4 py-3 text-[#003061] font-semibold hover:bg-[#003061] hover:text-white transition-all' onClick={() => navigate('/product')}>See The Collection</button>
                        </div>
                    </div>
                    {/* lg:h-[450px] xl:h-[480px] */}
                    {/* ================== Image =================== */}
                    <div className=" lg:absolute lg:top-[40%] xl:top-[25%] lg:right-0 mt-5 lg:mt-0" data-aos="fade-left">
                        <img src={featureimg} alt="" className='xl:w-[730px] lg:w-[500px] lg:h-[400px] xl:h-auto' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feature
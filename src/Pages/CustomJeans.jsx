import React from 'react'
import '../Components/CustomJeans/CustomJeans.css'
import CustomJeansImg from '../Components/CustomJeans/CustomJeansImg'
import Customisation from '../Components/CustomJeans/Customisation'

function CustomJeans() {
    return (
        <div className='pt-[62px] md:pt-[72px] xl:pt-[88px]'>
            <div className="grid grid-cols-12 p-8">
                <div className="col-span-12 md:col-span-4 md:order-1 order-2">
                    <Customisation />
                </div>
                <div className="col-span-12 md:col-span-8 md:order-2 order-1">
                    <CustomJeansImg />
                </div>
            </div>


            {/* ================== custom jeans footer ================== */}
            <div className='px-8 py-5 grid grid-cols-12 custom_jeans_footer'>
                <div className="flex items-center justify-between col-span-12 lg:col-span-4 ">
                    <div className='heading'>
                        <h6 className='text-gray-600 text-lg font-semibold'>Custom Jeans: ₹1990</h6>
                        <p className='text-gray-600'>Slim - Business Denim</p>
                    </div>
                    <div className='btn'>
                        <button className='bg-[#003061] border-[#003061] border rounded text-white font-medium hover:bg-white hover:border-[#003061]  hover:text-[#003061] transition-all px-6 py-3 md:px-8  '>Buy</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomJeans
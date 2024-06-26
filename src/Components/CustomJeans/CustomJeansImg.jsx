import React from 'react'
import custom_jeans from '../../assets/custom_jeans.png'
import { CiHeart } from "react-icons/ci";
import { HiMagnifyingGlassPlus } from "react-icons/hi2";
import { BsShare } from "react-icons/bs";

function CustomJeansImg() {
    return (
        <div>
            <div className="grid grid-cols-12 ">
                <div className="col-span-10 md:col-span-11 mx-auto pt-8">
                    <img src={custom_jeans} alt="" className='h-[450px] w-auto' />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <div className="flex flex-col">
                        <div className='bg-gray-200 h-12 w-12 rounded-full flex items-center justify-center group hover:bg-[#003061]  cursor-pointer transition-all'>
                            <HiMagnifyingGlassPlus className='group-hover:text-white text-lg' />
                        </div>
                        <div className='bg-gray-200 h-12 w-12 rounded-full flex items-center justify-center mt-4 group hover:bg-[#003061] cursor-pointer transition-all'>
                            <BsShare className='group-hover:text-white text-lg' />
                        </div>
                        <div className='bg-gray-200 h-12 w-12 rounded-full flex items-center justify-center mt-4 group hover:bg-[#003061] cursor-pointer transition-all'>
                            <CiHeart className='group-hover:text-white text-xl' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomJeansImg
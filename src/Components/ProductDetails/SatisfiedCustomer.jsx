import React from 'react'
import img from '../../assets/ourstory6.png'
import { Rating } from "@material-tailwind/react";

function SatisfiedCustomer() {
    const reviewCard = Array(5).fill('')
    return (
        <div>
            <h2 className='text-center font-semibold text-2xl text-[#1F2937]'>Over 350,000 satisfied customers</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                {
                    reviewCard.map((item, index) => {
                        return (
                            <div className='text-center' key={index}>
                                <img src={img} alt="" />
                                <div className='mt-3'>
                                    <Rating value={5} readonly />
                                </div>
                                <div>
                                    <h6 className='text-[#4B5563] font-medium'>"Excellent customer service"</h6>
                                    <p className='text-gray-400 text-sm'>Heather Alexander <br />
                                        - United Kingdom</p>
                                </div>
                            </div>
                        )
                    })
                }

            </div>

            <div className="text-center mt-8">
                <button className='border border-[#003061] rounded-md px-4 py-3 text-[#003061] font-semibold hover:bg-[#003061] hover:text-white transition-all'>See The Reviews</button>
            </div>
        </div>
    )
}

export default SatisfiedCustomer
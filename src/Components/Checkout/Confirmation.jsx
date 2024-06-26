import React from 'react'
import { FaCheck } from "react-icons/fa6";

function Confirmation() {
  return (
    <div className='mt-5'>
      <div className="flex items-center">
        <div className='border border-[#003060] p-3 rounded-full'>
          <FaCheck className='text-[#003060]' />
        </div>
        <div className='ps-2'>
          <p className='text-gray-800'>Order #625001453486</p>
          <h6 className='font-semibold text-gray-800'>Thank you Kishan!</h6>
        </div>
      </div>

      {/* ======================= Payment Method ======================= */}
      <h6 className='font-semibold text-lg text-[#1F2937] mt-5'>Payment Method </h6>
      <div className=' border border-gray-400 p-4 rounded-md mt-4 '>
        <h6 className='font-medium'>Credit Card</h6>
        <div className="md:flex md:justify-between md:items-center mt-5 md:w-[80%]">
          <div>
            <div className='text-gray-600'>Name</div>
            <div className='md:mt-1'>Kishan S. Suvagiya</div>
          </div>
          <div className='mt-2 md:mt-0'>
            <div className='text-gray-600'>Card Number</div>
            <div className='md:mt-1'>8888 **** **** 5555</div>
          </div>
        </div>
      </div>


      {/* ======================= Billing Address ======================= */}
      <h6 className='font-semibold text-lg text-[#1F2937] mt-6'>Billing Address </h6>

      <div className=' border border-gray-400 p-4 rounded-md mt-4'>
        <div className='flex items-center'>
          <div className=''>
            <div className='text-gray-700'>
              <p className='font-semibold text-gray-800'>Kishan Suvagiya</p>
              <p>10, Gajanand Park, Ambatalavadi road</p>
              <p>Surat, Gujarat, India</p>
              <p>395004</p>
              <p>8487800329</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirmation
import React from 'react'
import logo from '../../assets/logo.png'
import loginImg from '../../assets/loginpic.png'
function RegistrationDesign() {
  return (
    <div className='bg-white lg:min-h-screen flex justify-center items-center'>
      <div className='p-6 sm:p-12 hidden md:block'>
        <img src={logo} alt="" className='mx-auto w-[80%] md:w-[70%] lg:w-full'/>
        <div className='mt-4'>
          <img src={loginImg} alt="" className='mx-auto w-[80%] lg:w-full' />
        </div>
      </div>
    </div>
  )
}

export default RegistrationDesign
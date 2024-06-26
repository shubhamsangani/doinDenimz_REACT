import React from 'react'
import RegistrationDesign from '../Components/Registration/RegistrationDesign'
import SendOtp from '../Components/Registration/SendOtp'

function SendOtpPage() {
    return (
        <div>
            <div className="grid lg:grid-cols-2 grid-cols-1">
                <div className='order-2 lg:order-1'>
                    <SendOtp />
                </div>
                <div className='order-1 lg:order-2'>
                    <RegistrationDesign />
                </div>
            </div>
        </div>
    )
}

export default SendOtpPage
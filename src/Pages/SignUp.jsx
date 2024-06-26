import React from 'react'
import RegistrationDesign from '../Components/Registration/RegistrationDesign'
import CreateAccountForm from '../Components/Registration/CreateAccountForm'

function SignUp() {
    return (
        <div>
            <div className="grid lg:grid-cols-2 grid-cols-1">
                <div className='order-2 lg:order-1'>
                    <CreateAccountForm />
                </div>
                <div className='order-1 lg:order-2'>
                    <RegistrationDesign />
                </div>
            </div>
        </div>
    )
}

export default SignUp
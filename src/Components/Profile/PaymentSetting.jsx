import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import { CiEdit } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import visaImg from '../../assets/visa.png'

function PaymentSetting() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = React.useState(false);
  const [paymentBox, setPaymentBox] = React.useState(true);

  const handleOpen = () => setOpen(!open);

  const formAddress = (data) => {
    alert(data.card_number)
  }

  return (
    <div>
      <div>
        {/* ======================= Heading ======================= */}
        <div className='text-center'>
          <h4 className='text-gray-800 text-lg font-semibold '>Payment Settings</h4>
          <p className='text-gray-500 text-sm md:text-base md:w-[90%] xl:w-[80%] mx-auto mt-2'>"PAYMENT SETTINGS" offers flexible options for transactions. Seamlessly manage your preferred payment methods, including credit/debit cards, and digital wallets. Securely store and update your payment details for convenient and hassle-free checkout experiences across various platforms and devices.</p>
        </div>

        {/* ======================= Payment ======================= */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-8">
          {
            paymentBox && (
              <div className='border border-gray-300 px-3 md:px-6 py-4 rounded-md md:w-[75%] mx-auto xl:w-full w-full'>
                <div className="flex justify-between items-start">
                  <div className='self-center hidden md:block'>
                    <img src={visaImg} alt="" />
                  </div>
                  <div>
                    <div className='flex items-center'>
                      <img src={visaImg} alt="" className='md:hidden' />
                      <h6 className='ps-4 md:ps-0 leading-tight'>HDFC Visa Card</h6>
                    </div>
                    <div className='text-gray-800 mt-2'>kishan suvagiya</div>
                    <div className='text-gray-600'>Card Number: <span className='text-gray-800 font-medium'>**** **** **** 1234</span> </div>
                    <div className='text-gray-600'>Expries: <span className='text-gray-800 font-medium'>12/ 21</span> </div>
                    <div className='underline mt-3 cursor-pointer'>Set as your default Card</div>
                  </div>
                  <div className='flex'>
                    <div className='cursor-pointer' onClick={handleOpen}>
                      <CiEdit className='text-xl' />
                    </div>
                    <div className='ps-2 cursor-pointer' onClick={() => setPaymentBox(false)}>
                      <IoMdClose className='text-xl' />
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          {
            paymentBox && (
              <div className='border border-gray-300 px-3 md:px-6 py-4 rounded-md md:w-[75%] mx-auto xl:w-full w-full'>
                <div className="flex justify-between items-start">
                  <div className='self-center hidden md:block'>
                    <img src={visaImg} alt="" />
                  </div>
                  <div>
                    <div className='flex items-center'>
                      <img src={visaImg} alt="" className='md:hidden' />
                      <h6 className='ps-4 md:ps-0 leading-tight'>HDFC Visa Card</h6>
                    </div>
                    <div className='text-gray-800 mt-2'>kishan suvagiya</div>
                    <div className='text-gray-600'>Card Number: <span className='text-gray-800 font-medium'>**** **** **** 1234</span> </div>
                    <div className='text-gray-600'>Expries: <span className='text-gray-800 font-medium'>12/ 21</span> </div>
                    <div className='underline mt-3 cursor-pointer'>Set as your default Card</div>
                  </div>
                  <div className='flex'>
                    <div className='cursor-pointer' onClick={handleOpen}>
                      <CiEdit className='text-xl' />
                    </div>
                    <div className='ps-2 cursor-pointer' onClick={() => setPaymentBox(false)}>
                      <IoMdClose className='text-xl' />
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        
          <div className='border border-gray-300 p-4 rounded-md flex items-center justify-center md:w-[75%] mx-auto xl:w-full w-full' >
            <div className='flex items-center cursor-pointer' onClick={handleOpen}>
              <IoIosAddCircleOutline />
              <span className='ps-2'>Add a New Card</span>
            </div>
          </div>

        </div>
      </div>

      {/* ======================= Dialog ======================= */}
      <div>
        <Dialog open={open} handler={handleOpen} size='lg' className='px-4 '>
          <div className="flex items-center justify-between">
            <DialogHeader className='justify-center flex-grow text-base md:text-xl'>
              Add a New Card
            </DialogHeader>
            <div>
              <IoMdClose className='text-2xl cursor-pointer' onClick={handleOpen} />
            </div>
          </div>

          <form action="" onSubmit={handleSubmit(formAddress)} className=''>
            <DialogBody className=''>
              <div className='grid grid-cols-2 gap-4'>
                <div className='col-span-2 md:col-span-1'>
                  <label htmlFor="" className='text-[#003061]'>Select Card Type *</label>
                  <br />
                  <select name="select_card" id="" className='w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]'
                    {...register('select_card', { required: true })} >
                    <option value="" disabled selected className='w-full'>Select Card</option>
                    <option value="visa">Visa</option>
                    <option value="mastercard">MasterCard</option>
                    <option value="rupay">Rupay</option>
                  </select>
                  {errors.select_card && <p className='text-red-600'>Select One Option.</p>}
                </div>

                <div className='col-span-2 md:col-span-1'>
                  <label htmlFor="" className='text-[#003061]'>Card Number *</label>
                  <br />
                  <input type="number" name="card_number" placeholder='Enter your Card Number'
                    className='w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]'
                    {...register('card_number', {
                      required: 'Card Number is Required.',
                      pattern: {
                        value: /^[0-9]{16}$/,
                        message: 'Please enter a valid card number.'
                      }
                    })}
                  />
                  {errors.card_number && <p className='text-red-600'>{errors.card_number.message}</p>}
                </div>

                <div className='col-span-2 md:col-span-1'>
                  <label htmlFor="" className='text-[#003061]'>Expiry Date (MM/YYYY) *</label>
                  <br />
                  <input type="text" name="expiry" placeholder='MM/YYYY'
                    className='w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]'
                    {...register('expiry', {
                      required: 'Expiry Date is Required.',
                      pattern: {
                        value: /^(0[1-9]|1[0-2])\/[2-9][0-9]{3}$/,
                        message: 'Invalid Date.'
                      }
                    })}
                  />
                  {errors.expiry && <p className='text-red-600'>{errors.expiry.message}</p>}
                </div>

                <div className='col-span-2 md:col-span-1'>
                  <label htmlFor="" className='text-[#003061]'>CVV *</label>
                  <br />
                  <input type="number" name="cvv" placeholder='Enter your CVV'
                    className='w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]'
                    {...register('cvv', {
                      required: 'CVV is Required.',
                      pattern: {
                        value: /^[0-9]{3}$/,
                        message: 'Please enter a valid 3-digit CVV code.'
                      }
                    })} />
                  {errors.cvv && <p className='text-red-600'>{errors.cvv.message}</p>}
                </div>

                <div className='col-span-2 md:col-span-1'>
                  <label htmlFor="" className='text-[#003061]'>Card Holder Name *</label>
                  <br />
                  <input type="text" name="cardholder" placeholder='Enter your Card Holder Name'
                    className='w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]'
                    {...register('cardholder', {
                      required: 'Card Holder Name is Required.',
                    })} />
                  {errors.cardholder && <p className='text-red-600'>{errors.cardholder.message}</p>}
                </div>

              </div>
              <div className='mt-2'>
                <input type="checkbox" name="" id="" />
                <label htmlFor="" className='ps-2 text-gray-800 font-normal'>Set as your default Card</label>
              </div>

            </DialogBody>

            <DialogFooter className='justify-center flex-col'>
              <button type='submit' className='w-[50vw] md:w-[40vw] lg:w-[15vw] bg-[#003061] border-[#003061] border p-2 rounded text-white font-medium hover:bg-white hover:border-[#003061]  hover:text-[#003061] transition-all'>Save Card</button>
            </DialogFooter>
          </form>
        </Dialog>
      </div>
    </div>
  )
}

export default PaymentSetting
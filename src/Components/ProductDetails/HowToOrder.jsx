import React from 'react'
import { Stepper, Step, Button } from "@material-tailwind/react";
import howToOrder1 from '../../assets/howtoorder1.png'
import howToOrder2 from '../../assets/howtoorder2.png'
import howToOrder3 from '../../assets/howtoorder3.png'
import howToOrder4 from '../../assets/howtoorder4.png'
import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineBody,
    Typography,
} from "@material-tailwind/react";

function HowToOrder() {
    const [activeStep, setActiveStep] = React.useState(0);
    return (
        <div>
            <h2 className='text-center font-semibold text-2xl text-[#1F2937]'>How to orders</h2>

              {/* ======================= For Tablet, Desktop View ======================= */}
            <div className='hidden md:block'>
                <div className="w-[90%] lg:w-[85%] py-4 px-8 mt-3 mx-auto">
                    <Stepper activeStep={activeStep}>
                        <Step className='!bg-gray-300 !text-black font-normal'>1</Step>
                        <Step className='font-normal'>2</Step>
                        <Step className='font-normal'>3</Step>
                        <Step className='font-normal'>4</Step>
                    </Stepper>
                </div>
                <div className='grid grid-cols-4 gap-4'>
                    <div className=''>
                        <img src={howToOrder4} alt="" className='h-[70px] lg:h-[110px] w-[70px] lg:w-[110px] mx-auto' />
                        <div className='text-gray-500 text-center pt-4 text-sm lg:text-base mx-auto'>Browse and select your <br /> favourite pants</div>
                    </div>
                    <div className=''>
                        <img src={howToOrder2} alt="" className='h-[70px] lg:h-[110px] w-auto mx-auto' />
                        <div className='text-gray-500 text-center pt-4 text-sm lg:text-base mx-auto'>Select your custom <br /> fit measurements</div>
                    </div>
                    <div className=''>
                        <img src={howToOrder1} alt="" className='h-[70px] lg:h-[110px] w-auto mx-auto' />
                        <div className='text-gray-500 text-center pt-4 text-sm lg:text-base mx-auto 
                        '>Select your advanced <br /> style customisations</div>
                    </div>
                    <div className=''>
                        <img src={howToOrder3} alt="" className='h-[70px] lg:h-[110px] w-auto mx-auto' />
                        <div className='text-gray-500 text-center pt-4 text-sm lg:text-base mx-auto'>Receive your order within <br /> 12-14 business days</div>
                    </div>
                </div>
            </div>

            {/* ======================= For Mobile View ======================= */}
            <div className="md:hidden mt-5 ">
                <Timeline>
                    <TimelineItem>
                        <TimelineConnector />
                        <TimelineHeader>
                            <TimelineIcon className="p-2 bg-gray-300 text-black w-10 h-10 flex items-center justify-center">
                                <span>1</span>
                            </TimelineIcon>
                            <Typography className='text-gray-500 text-center text-base'>
                            Browse and select your favourite pants
                            </Typography>
                        </TimelineHeader>
                        <TimelineBody className="pb-8 w-[55%] mx-auto">
                            <img src={howToOrder4} alt="" />
                        </TimelineBody>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineConnector />
                        <TimelineHeader>
                            <TimelineIcon className="p-2 bg-gray-300 text-black w-10 h-10 flex items-center justify-center">
                                <span>2</span>
                            </TimelineIcon>
                            <Typography className='text-gray-500 text-center text-base'>
                            Select your custom fit measurements
                            </Typography>
                        </TimelineHeader>
                        <TimelineBody className="pb-8 w-[55%] mx-auto">
                            <img src={howToOrder2} alt="" />
                        </TimelineBody>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineConnector />
                        <TimelineHeader>
                            <TimelineIcon className="p-2 bg-gray-300 text-black w-10 h-10 flex items-center justify-center">
                                <span>3</span>
                            </TimelineIcon>
                            <Typography className='text-gray-500 text-center text-base'>
                            Select your advanced style customisations
                            </Typography>
                        </TimelineHeader>
                        <TimelineBody className="pb-8 w-[55%] mx-auto">
                            <img src={howToOrder1} alt="" />
                        </TimelineBody>
                    </TimelineItem>
                    <TimelineItem>
                        {/* <TimelineConnector /> */}
                        <TimelineHeader>
                            <TimelineIcon className="p-2 bg-gray-300 text-black w-10 h-10 flex items-center justify-center">
                                <span>4</span>
                            </TimelineIcon>
                            <Typography className='text-gray-500 text-center text-base'>
                            Receive your order within 12-14 business days
                            </Typography>
                        </TimelineHeader>
                        <TimelineBody className="pb-8 w-[55%] mx-auto">
                            <img src={howToOrder3} alt="" />
                        </TimelineBody>
                    </TimelineItem>
                    
                </Timeline>
            </div>
        </div>
    )
}

export default HowToOrder
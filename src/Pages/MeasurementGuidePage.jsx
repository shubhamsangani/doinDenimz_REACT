import React from 'react'
import MeasurementHeading from '../Components/MeasurementGuide/MeasurementHeading'
import MeasurementGuide from '../Components/MeasurementGuide/MeasurementGuide'

function MeasurementGuidePage() {
  return (
    <div className='pt-[62px] md:pt-[72px] xl:pt-[88px]'>
      <MeasurementHeading />
      <MeasurementGuide />
    </div>
  )
}

export default MeasurementGuidePage
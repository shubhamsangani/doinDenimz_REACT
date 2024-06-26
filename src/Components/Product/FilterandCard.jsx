import React, { useEffect } from 'react'
import Filter from './Filter'
import Card from './Card'
import AOS from "aos";
import "aos/dist/aos.css";

function FilterandCard() {
    useEffect(() => {
        AOS.init();
      }, []);

    return (
        <div className='p-8'>
            <div className="grid grid-cols-12 overflow-x-hidden">
                <div className="col-span-12 md:col-span-3" data-aos="fade-right">
                    <Filter />
                </div>
                <div className="col-span-12 md:col-span-9 mt-5 md:mt-0" data-aos="fade-left">
                    <Card />
                </div>
            </div>
        </div>
    )
}

export default FilterandCard
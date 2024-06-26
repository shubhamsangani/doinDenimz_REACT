import React, { useEffect, useRef, useState } from "react";
// import heroimg from '../../assets/Group2.png'
import heroimg from "../../assets/grouphero.png";
// import herojeans from "../../assets/herojeans.png";
import j1 from "../../assets/j1.png";
import j2 from "../../assets/j2.png";
import j3 from "../../assets/j3.png";
import j4 from "../../assets/j4.png";
import j5 from "../../assets/j5.png";
import { useNavigate } from "react-router-dom";
import { Radio, Tooltip } from "@material-tailwind/react";
import AOS from "aos";
import "aos/dist/aos.css";
import JeansViewer from "./JeansViewer";

function Hero() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);


  return (
    <div className=" xl:min-h-[calc(100vh-88px)] flex items-center hero">
      <div className="grid grid-cols-5 md:grid-cols-12 gap-4 overflow-x-hidden">

        {/* =================== Image part =================== */}
        <div  className="col-span-5 md:col-span-6 lg:col-span-5">
          <JeansViewer />
        </div>

        {/* =================== Text part =================== */}
        {/* <div className=" lg:w-[55%] flex items-center lg:ms-8 px-8 mt-6 lg:px-0 lg:mt-0 lg:h-[90vh]"> */}
        <div className="col-span-5 md:col-span-6 lg:col-span-7 items-center flex "
          data-aos="fade-left"
        >
          <div className="p-8 lg:p-12">
            <h1 className="text-[2rem] lg:text-[2.5rem] xl:text-[3.5rem] font-semibold leading-none">
              The Future of Fashion Manufacturing
            </h1>
            <p className="text-base lg:text-lg xl:w-[80%] mt-5 text-justify ">
              In recent years, the fashion industry has witnessed significant
              transformations in manufacturing processes, driven by
              technological advancements and shifting consumer preferences. From
              sustainable practices to digital innovation, the future of fashion
              manufacturing promises to revolutionize the way garments are
              designed, produced, and distributed.
            </p>

            {/* ================== Button =================== */}
            <div className="text-center md:text-left">
              <button
                className="border border-[#003061] rounded-md px-4 py-3 mt-8 text-[#003061] font-semibold hover:bg-[#003061] hover:text-white transition-all"
                onClick={() => navigate("product")}
              >
                See The Collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

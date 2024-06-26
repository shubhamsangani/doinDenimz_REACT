import React, { useEffect, useState } from "react";
import "./Measurement.css";
import knee from "../../assets/knee.jpg";
import crotch from "../../assets/crotch.jpg";
import calf from "../../assets/calf.jpg";
import ankle from "../../assets/ankle.jpg";
import waist from "../../assets/waist.jpg";
import thigh from "../../assets/thigh.jpg";
import length from "../../assets/length.jpg";
import hip from "../../assets/hip.jpeg";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";

function MeasurementGuide() {
  useEffect(() => {
    AOS.init();
  }, []);

  const guide = [
    {
      key: 0,
      img: waist,
      heading: "WAIST",
      para: "Measure the circumference at the place where you will actually wear your jeans. Your waist measurement will be the entire circumference of the area where your jeans will rest. So if you want low, mid, or high-waist jeans, you will measure the low, mid, or high waist circumference and not your natural waist. It's also a good idea to measure at the end of the day when your waist is likely to be its largest.",
    },
    {
      key: 1,
      img: crotch,
      heading: "RISE",
      para: "Measure the circumference at the place where you will actually wear your jeans. Your waist measurement will be the entire circumference of the area where your jeans will rest. So if you want low, mid, or high-waist jeans, you will measure the low, mid, or high waist circumference and not your natural waist. It's also a good idea to measure at the end of the day when your waist is likely to be its largest.",
    },
    {
      key: 2,
      img: length,
      heading: "OUTERSEAM",
      para: "The outerseam measurement in jeans refers to the length of the jeans from the top of the waistband down to the bottom hem along the outer side of the leg. This measurement helps determine how long the jeans will be when worn. It's important for finding the right fit, especially if you prefer a certain length or want to avoid hemming alterations.",
    },
    {
      key: 3,
      img: hip,
      heading: "HIPS",
      para: "When buying jeans, it's important to know your hip measurement. This measurement is taken around the fullest part of your hips and bottom. It helps determine the right size of jeans for you, ensuring they fit comfortably and look great. When shopping, check the size chart to find the jeans that correspond to your hip measurement for the best fit and style.",
    },
    {
      key: 4,
      img: thigh,
      heading: "THIGH",
      para: "The thigh measurement in jeans refers to the width of the leg opening around the thigh area, typically taken a few inches down from the crotch seam. This measurement helps determine how loose or tight the jeans will fit around your thighs. It's important to get this measurement right for a comfortable and flattering fit that suits your body shape and style preferences.",
    },
    {
      key: 5,
      img: calf,
      heading: "CALF",
      para: "The calf measurement in jeans refers to the circumference of the lower part of the leg, just below the knee. It's an important size for choosing jeans that fit comfortably. To measure your calf, use a measuring tape around the widest part of your calf muscle. This measurement helps ensure that the jeans won't be too tight or restrictive around your lower leg.",
    },
    {
      key: 6,
      img: ankle,
      heading: "ANKLE",
      para: "When buying jeans, measuring your ankle is important for getting the right fit. To measure your ankle, wrap a tape measure around the smallest part of your ankle. Make sure the tape measure is snug but not too tight. This measurement will help you choose jeans that fit comfortably around your ankle, ensuring a perfect fit and stylish look.",
    },
    {
      key: 7,
      img: knee,
      heading: "KNEE",
      para: "When buying jeans, measuring your knee is another crucial step to ensure a proper fit and comfortable wear. To measure your knee, locate the center of your kneecap and wrap a flexible tape measure around this point. This measurement is essential for selecting jeans that accommodate the shape and size of your knee, providing optimal comfort and a flattering appearance. ",
    },
  ];

  return (
    <div>
      {/* ===================== Desktop & Tablet view ===================== */}
      <div className="mt-2 p-8 hidden md:block">
        <div data-aos="zoom-in">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            {guide.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="md:flex pt-6 md:pt-0 ">
                  <img
                    src={item.img}
                    alt=""
                    className="h-[25rem] w-auto md:pt-8"
                  />
                  <div className="md:ps-6 flex flex-col justify-center">
                    <h2 className="text-xl font-medium">{item.heading}</h2>
                    <p className="text-justify mt-4">{item.para}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* ===================== Mobile view ===================== */}
      <div className="mt-8 p-8 md:hidden">
        {guide.map((item, index) => {
          return (
            <div
              className="grid grid-cols-4 mt-8"
              key={index}
              data-aos="fade-up"
            >
              <div className="col-span-4 lg:col-span-1">
                <div className="">
                  <img
                    src={item.img}
                    alt=""
                    className="mx-auto w-auto  rounded"
                  />
                </div>
              </div>
              <div className="col-span-4 lg:col-span-3 lg:ps-16">
                <h6 className="text-gray-800 text-lg font-semibold mt-4">
                  {index + 1}.{item.heading}
                </h6>

                <div>
                  <p className="text-gray-600 mt-3 text-justify">{item.para}</p>
                </div>

                {index == 7 ? null : (
                  <hr className="mt-8 h-[2px] bg-gray-400 " />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MeasurementGuide;

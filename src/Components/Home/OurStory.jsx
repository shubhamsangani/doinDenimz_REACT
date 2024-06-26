import React, { useEffect, useState } from "react";
import ourstory from "../../assets/3jeans.png";
import ourstory2 from "../../assets/4jeans.png";
import ourstory3 from "../../assets/5jeans.png";
import ourstory4 from "../../assets/6jeans.png";
import ourstory5 from "../../assets/7jeans.png";
import ourstory6 from "../../assets/8jeans.png";
import ourstory7 from "../../assets/9jeans.png";
import ourstory8 from "../../assets/10jeans.png";
import ourstory9 from "../../assets/11jeans.png";
import ourstory10 from "../../assets/12jeans.png";
import ourstory11 from "../../assets/13jeans.png";
import ourstory12 from "../../assets/14jeans.png";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// import required modules
import { Autoplay } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";

function OurStory() {
  const images = [
    ourstory,
    ourstory2,
    ourstory3,
    ourstory4,
    ourstory5,
    ourstory6,
    ourstory7,
    ourstory8,
    ourstory9,
    ourstory10,
    ourstory11,
    ourstory12,
  ];
  // const delays = [4000, 2000, 6000, 8000, 10000, 12000];
  const [isLooped, setIsLooped] = useState(true);
  const [delays, setdelays] = useState([4000, 2000, 6000, 8000, 10000, 12000]);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      <div className="p-8">
        <div className="text-center" data-aos="fade-down">
          <h4 className="uppercase text-[#4B49AC] font-semibold">
            more about us
          </h4>
          <h2 className="text-[#1F2937] text-3xl mt-3 font-bold">Our Story</h2>
          <p className="text-gray-500 mt-4 text-sm md:text-base lg:w-[60%] mx-auto">
            Embark on a journey through our brand's narrative, where passion
            meets innovation. Explore the origins of our vision, the milestones
            we've achieved, and the values that drive us forward. Discover the
            story behind our commitment to excellence and customer satisfaction.
          </p>
        </div>

           {/* laptop view */}
        <div className="mt-5 lg:grid lg:grid-cols-2 lg:gap-4 hidden overflow-x-hidden">
          <div className="lg:grid lg:grid-cols-3 lg:gap-4" data-aos="fade-right">
            {images.slice(0, 6).map((item, index) => {
              return (
                <div
                  className={index === 1 ? "col-span-2 row-span-2" : ""}
                  key={index}
                >
                  <img src={item} alt="" className="w-[100%] h-[100%] rounded" />
                </div>
              );
            })}
          </div>
          <div className="lg:grid lg:grid-cols-3 lg:gap-4" data-aos="fade-left">
            {images.slice(6, 12).map((item, index) => {
              return (
                <div
                  className={index === 3 ? "col-span-2 row-span-2" : ""}
                  key={index}
                >
                  <img src={item} alt="" className="w-[100%] h-[100%] rounded" />
                </div>
              );
            })}
          </div>
        </div>

        {/* mobile view & Tablet view */}
        <div className="mt-5 grid grid-cols-1 gap-4 lg:hidden">
          <div className="grid grid-cols-3 gap-4">
            {images.slice(0, 6).map((item, index) => {
              return (
                <div
                  className={index === 1 ? "col-span-2 row-span-2 ourstory_slider_bigimg" : ""}
                  key={index}
                >
                  <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    loop={false}
                    onSlideChange={() => {
                      if (isLooped) {
                        const newdelay = [...delays];
                        if (index == 1) {
                          newdelay[0] = 12000;
                          newdelay[1] = 12000;
                          newdelay[2] = 12000;
                          newdelay[3] = 12000;
                          newdelay[4] = 12000;
                          newdelay[5] = 12000;
                          setIsLooped(false);
                          setdelays(newdelay);
                        }
                      }
                    }}
                    autoplay={{
                      delay: delays[index],
                    }}
                    modules={[Autoplay]}
                    className="mySwiper"
                  >
                    <SwiperSlide>
                      <img src={item} alt="" className="ourstory_slider rounded" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src={images[index + 6]} alt="" className="ourstory_slider rounded" />
                    </SwiperSlide>
                  </Swiper>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurStory;

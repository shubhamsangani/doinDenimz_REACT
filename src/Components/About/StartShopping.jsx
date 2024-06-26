import React, { useEffect } from "react";
import ourstory from "../../assets/about9.png";
import about1 from "../../assets/about1.png";
import about2 from "../../assets/about2.png";
import about4 from "../../assets/about4.png";
import about5 from "../../assets/about5.png";
import about6 from "../../assets/about6.png";
import about7 from "../../assets/about7.png";
import about8 from "../../assets/about8.png";
import about3 from "../../assets/about3.png";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function StartShopping() {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="p-8">
      {/* ================== Heading =================== */}
      <div className="text-center" data-aos="fade-down">
        <h2 className="text-[#1F2937] text-3xl mt-3 font-semibold">
          Start Shopping
        </h2>
        <p className="text-gray-500 mt-4 text-sm md:text-base lg:w-[60%] mx-auto">
          Begin your shopping journey now. Explore our diverse selection of
          products tailored to suit your needs. Find the perfect items to
          enhance your lifestyle and express your unique personality.
        </p>
      </div>

      <div className="mt-12 overflow-x-hidden">
        <div className="grid grid-cols-5" data-aos="fade-right">
          <div className="col-span-5 md:col-span-1">
            <div className="rounded-md overflow-hidden">
              <img src={about1} alt="" className="mx-auto w-full h-auto" />
            </div>
          </div>
          <div className="col-span-5 md:col-span-4 lg:col-span-3 md:ps-8 mt-5 md:mt-0">
            <h6 className="text-gray-800 text-lg font-semibold">
              1. Introduction: Made to-Measure Denim Manufacturing Overview
            </h6>
            <p className="text-gray-500 mt-4 lg:pe-8 text-justify">
              Step into the world of made-to-measure denim manufacturing, where
              artistry and craftsmanship meet innovation and customization.
              Discover the meticulous process behind creating exquisite denim
              garments that perfectly fit every body shape. From hand-selecting
              the finest raw materials to employing cutting-edge technology,
              this is the ultimate guide to the world of crafted excellence in
              denim manufacturing.
            </p>
            <hr className="my-8 lg:my-16 h-[2px] bg-gray-400 md:me-8" />
          </div>
        </div>

        <div className="grid grid-cols-5" data-aos="fade-left">
          <div className="col-span-1 hidden lg:block"></div>
          <div className="col-span-5 md:col-span-4 lg:col-span-3 lg:ps-8 md:pe-8 order-2 md:order-1 mt-5 md:mt-0">
            <h6 className="text-gray-800 text-lg font-semibold">
              2. Elevate Your Style with Tailored Elegance at Its Finest
            </h6>
            <p className="text-gray-500 mt-4 text-justify">
              At Doin'Denimz, we take pride in the art of tailored elegance. Our
              offerings extend from personalized made-to-measure denim to
              meticulously curated readymade options, allowing you to make a
              statement with garments that reflect your distinct style. Every
              piece is crafted as a signature statement, ensuring that you stand
              out with sophistication and grace.
            </p>
            <hr className="my-8 lg:my-16 h-[2px] bg-gray-400 " />
          </div>
          <div className="col-span-5 md:col-span-1 order-1 md:order-2">
            <div className="rounded-md overflow-hidden">
              <img src={about2} alt="" className="mx-auto" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5" data-aos="fade-right">
          <div className="col-span-5 md:col-span-1">
            <div className="rounded-md overflow-hidden">
              <img src={about3} alt="" className="mx-auto" />
            </div>
          </div>
          <div className="col-span-5 md:col-span-4 lg:col-span-3 md:ps-8 mt-5 md:mt-0">
            <h6 className="text-gray-800 text-lg font-semibold">
              3. Discover Distinctive Styles in Exclusive Men's Denim
            </h6>
            <p className="text-gray-500 mt-4 lg:pe-8 text-justify">
              Doin'Denimz emerges as the ultimate destination for those seeking
              distinctive denim styles. Our exclusive men's collection and the
              promise of a perfect fit are more than just offerings; they are
              opportunities for you to express your individuality through denim
              that speaks volumes and tells a narrative that is uniquely yours.
            </p>
            <hr className="my-8 lg:my-16 h-[2px] bg-gray-400 md:me-8" />
          </div>
        </div>

        <div className="grid grid-cols-5" data-aos="fade-left">
          <div className="col-span-1 hidden lg:block"></div>
          <div className="col-span-5 md:col-span-4 lg:col-span-3 lg:ps-8 md:pe-8 order-2 md:order-1 mt-5 md:mt-0">
            <h6 className="text-gray-800 text-lg font-semibold">
              4. Precision in Measurements: Key to Perfect fit
            </h6>
            <p className="text-gray-500 mt-4 text-justify">
              At Doin'Denimz, we believe the key to the perfect fit lies in
              precision measurements. Every garment is meticulously tailored to
              your unique proportions, ensuring a bespoke fit that flatters your
              individual style. Experience the transformative power of precision
              in crafting denim that's not just tailored but truly personalized.
            </p>
            <hr className="my-8 lg:my-16 h-[2px] bg-gray-400" />
          </div>
          <div className="col-span-5 md:col-span-1 order-1 md:order-2">
            <div className="rounded-md overflow-hidden">
              <img src={about4} alt="" className="mx-auto" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5" data-aos="fade-right">
          <div className="col-span-5 md:col-span-1">
            <div className="rounded-md overflow-hidden">
              <img src={about5} alt="" className="mx-auto" />
            </div>
          </div>
          <div className="col-span-5 md:col-span-4 lg:col-span-3 md:ps-8 mt-5 md:mt-0">
            <h6 className="text-gray-800 text-lg font-semibold">
              5. Artisan Craftsmanship: Weaving Quality Into Every Thread
            </h6>
            <p className="text-gray-500 mt-4 lg:pe-8 text-justify">
              Craftsmanship is at the core of Doin'Denimz. We go beyond industry
              standards, weaving quality into every thread. Our meticulous
              approach, combined with high-quality denim fabric, ensures that
              each piece is a unique work of art, promising not just a garment,
              but a lasting statement to our commitment to excellence.
            </p>
            <hr className="my-8 lg:my-16 h-[2px] bg-gray-400 md:me-8" />
          </div>
        </div>

        <div className="grid grid-cols-5" data-aos="fade-left">
          <div className="col-span-1 hidden lg:block"></div>
          <div className="col-span-5 md:col-span-4 lg:col-span-3 lg:ps-8 md:pe-8 order-2 md:order-1 mt-5 md:mt-0">
            <h6 className="text-gray-800 text-lg font-semibold">
              6. Unleashing the Power of Skillful Cutting and Sewing
            </h6>
            <p className="text-gray-500 mt-4 text-justify">
              Once the custom pattern is finalized, it's time to unleash the
              power of skillful cutting and sewing. Expert craftsmen carefully
              cut the denim fabric according to the pattern, ensuring precision
              and accuracy. Then, they stitch the pieces together using
              specialized sewing techniques to create a flawless and durable
              finished product. This meticulous process guarantees that each
              made-to-measure denim garment is a true masterpiece of
              craftsmanship.
            </p>
            <hr className="my-8 lg:my-16 h-[2px] bg-gray-400 " />
          </div>
          <div className="col-span-5 md:col-span-1 order-1 md:order-2">
            <div className="rounded-md overflow-hidden">
              <img src={about6} alt="" className="mx-auto" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5" data-aos="fade-right">
          <div className="col-span-5 md:col-span-1">
            <div className="rounded-md overflow-hidden">
              <img src={about7} alt="" className="mx-auto" />
            </div>
          </div>
          <div className="col-span-5 md:col-span-4 lg:col-span-3 md:ps-8 mt-5 md:mt-0">
            <h6 className="text-gray-800 text-lg font-semibold">
              7. Hand-Finishing Techniques: Adding Distinctive Details
            </h6>
            <p className="text-gray-500 mt-4 lg:pe-8 text-justify">
              Hand-finishing techniques are the final touch in creating
              made-to-measure denim garments. These techniques include
              distressing, adding custom patches or embroidery, and creating
              unique washes or fades. Each detail is meticulously crafted by
              skilled artisans, creating a truly distinctive and personalized
              denim piece that showcases the expertise and artistry of the
              manufacturing process.
            </p>
            <hr className="my-8 lg:my-16 h-[2px] bg-gray-400 md:me-8" />
          </div>
        </div>

        <div className="grid grid-cols-5" data-aos="fade-left">
          <div className="col-span-1 hidden lg:block"></div>
          <div className="col-span-5 md:col-span-4 lg:col-span-3 lg:ps-8 md:pe-8 order-2 md:order-1 mt-5 md:mt-0">
            <h6 className="text-gray-800 text-lg font-semibold">
              8. Unwavering Quality Assrance for Enduring Satisfaction
            </h6>
            <p className="text-gray-500 mt-4 text-justify">
              Quality isn't just a checkbox at Doin'Denimz; it's a foundational
              commitment. Our rigorous quality checks ensure that every piece
              endures the test of time, providing not only satisfaction but also
              a guarantee of longevity. Your trust in us drives our relentless
              pursuit of excellence in every fiber, ensuring that each denim
              piece is not just a garment but a lasting investment in quality
              and craftsmanship.
            </p>
            <hr className="my-8 lg:my-16 h-[2px] bg-gray-400 " />
          </div>
          <div className="col-span-5 md:col-span-1 order-1 md:order-2">
            <div className="rounded-md overflow-hidden">
              <img src={about8} alt="" className="mx-auto" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5" data-aos="fade-right">
          <div className="col-span-5 md:col-span-1">
            <div className="rounded-md overflow-hidden">
              <img src={ourstory} alt="" className="mx-auto" />
            </div>
          </div>
          <div className="col-span-5 md:col-span-4 lg:col-span-3 md:ps-8 mt-5 md:mt-0">
            <h6 className="text-gray-800 text-lg font-semibold">
              9. Connect and Craft Your Denim Story with Doin'Denimz
            </h6>
            <p className="text-gray-500 mt-4 lg:pe-8 hyphens-auto md:text-justify md:hyphens-none">
              Embark on your personalized denim journey by connecting with
              Doin'Denimz. Whether through a call or email, our dedicated team
              is ready to assist you in crafting a denim story that mirrors your
              style and individuality. Your perfect denim moment awaits, and
              we're here to bring it to life with personalized service that goes
              beyond expectations, ensuring a seamless and memorable experience.
            </p>

            {/* ================== Button =================== */}
            <div className="text-center hidden lg:block mt-8">
              <button
                className="border border-[#003061] rounded-md px-4 py-3 text-[#003061] font-semibold hover:bg-[#003061] hover:text-white transition-all"
                onClick={() => navigate("/product")}
              >
                Let's See The Collection
              </button>
            </div>
          </div>
        </div>
        
        <div className="text-center lg:hidden mt-8">
          <button
            className="border border-[#003061] rounded-md px-4 py-3 text-[#003061] font-semibold hover:bg-[#003061] hover:text-white transition-all"
            onClick={() => navigate("/product")}
          >
            Let's See The Collection
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartShopping;

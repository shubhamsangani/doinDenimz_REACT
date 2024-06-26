import React from "react";
import "./Home.css";
import { FiPhone } from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import navlogo from "../../assets/nav_logo.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      {/* ================== Footer start =================== */}
      <div className="bg-[#122234] px-4 md:px-8 py-6 text-white text-center">
        <div className="md:flex md:justify-between md:items-center">
          <div>
            <h2>Customize your lifestyle</h2>
          </div>
          <div className="md:flex items-center">
            <div className="flex items-center justify-center mt-2 md:mt-0">
              <div>
                <FiPhone />
              </div>
              <div className="ps-2 !no-underline">Or contact us on +91 96380 14309</div>
            </div>
            <div className="md:ps-3 mt-4 md:mt-0">
              <a href="tel:+919638014309" className="border rounded py-2 px-4 hover:bg-white hover:text-[#122234] transition-all font-medium">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ================== Footer middle =================== */}
      <div className="bg-[#192C41] p-4 md:p-8">
        <div className="lg:flex">
          <div className="lg:w-[45%] w-full">
            <div>
              <img src={navlogo} alt="" className="w-auto h-[2rem]" />
            </div>
            <div className="mt-4">
              <p className="text-gray-500 font-normal text-justify-inter-word hyphens-auto last:text-left lg:w-[90%]">
                Explore our diverse jeans collection, tailored to suit your
                lifestyle. Elevate your wardrobe with premium quality denim and
                make a statement. Customize your style today.
              </p>
            </div>
            {/* <div className="flex mt-4 justify-center md:justify-start">
              <div className="bg-gray-700 cursor-pointer hover:bg-black duration-500 rounded-full p-2">
                <FaFacebookF className="text-white text-[17px]" />
              </div>
              <div className="bg-gray-700 cursor-pointer hover:bg-black duration-500 rounded-full p-2 ms-2">
                <FaXTwitter className="text-white" />
              </div>
              <div className="bg-gray-700 cursor-pointer hover:bg-black duration-500 rounded-full p-2 ms-2">
                <FaInstagram className="text-white text-[18px]" />
              </div>
            </div> */}
          </div>
          <div className="lg:w-[55%] w-full mt-5 lg:mt-0">
            <div className="grid md:grid-cols-3 grid-cols-2">
              <div>
                <div>
                  <h6 className="uppercase text-white footer_line ps-4 ">
                    Men's store
                  </h6>
                </div>
                <ul className="mt-3">
                  {/* <li className="text-gray-500 cursor-pointer lg:hover:text-white transition-all text-sm md:text-base">
                    Custom Jeans
                  </li>
                  <li className="text-gray-500 cursor-pointer mt-2 lg:hover:text-white transition-all text-sm md:text-base">
                    Custom Pants
                  </li>
                  <li className="text-gray-500 cursor-pointer mt-2 lg:hover:text-white transition-all text-sm md:text-base">
                    Custom Chinos
                  </li> */}
                  <li className="text-gray-500 cursor-pointer mt-2 lg:hover:text-white transition-all text-sm md:text-base">
                    <Link to='/product'>Jeans</Link>
                  </li>
                </ul>
              </div>
              {/* <div >
                                <div>
                                    <h6 className='uppercase text-white footer_line ps-4'>Women's store</h6>
                                </div>
                                <ul className='mt-3'>
                                    <li className='text-gray-500 cursor-pointer lg:hover:text-white transition-all text-sm md:text-base'>Custom Jeans</li>
                                    <li className='text-gray-500 cursor-pointer mt-2 lg:hover:text-white transition-all text-sm md:text-base'>Custom Pants</li>
                                    <li className='text-gray-500 cursor-pointer mt-2 lg:hover:text-white transition-all text-sm md:text-base'>Custom Chinos</li>
                                    <li className='text-gray-500 cursor-pointer mt-2 lg:hover:text-white transition-all text-sm md:text-base'>Jeans</li>
                                </ul>
                            </div> */}
              <div className="">
                <div>
                  <h6 className="uppercase text-white footer_line ps-4">
                    COmpany
                  </h6>
                </div>
                <ul className="mt-3">
                  <li className="text-gray-500 cursor-pointer lg:hover:text-white transition-all text-sm md:text-base">
                    <Link to="/about">About Us</Link>
                  </li>
                  <li className="text-gray-500 cursor-pointer lg:hover:text-white transition-all text-sm md:text-base">
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li className="text-gray-500 cursor-pointer lg:hover:text-white transition-all text-sm md:text-base">
                    <Link to="/terms-and-conditions">Terms and Conditions</Link>
                  </li>
                 
                  {/* <li className="text-gray-500 cursor-pointer mt-2 lg:hover:text-white transition-all text-sm md:text-base">
                    Perfect Fit Guarantee
                  </li>
                  <li className="text-gray-500 cursor-pointer mt-2 lg:hover:text-white transition-all text-sm md:text-base">
                    Georapi Blog
                  </li> */}
                </ul>
              </div>
              <div className="mt-3 md:mt-0">
                <div>
                  <h6 className="uppercase text-white footer_line ps-4">
                    Support
                  </h6>
                </div>
                <ul className="mt-3">
                  <li className="text-gray-500 cursor-pointer lg:hover:text-white transition-all text-sm md:text-base">
                    <Link to='/contact'>Contact Us</Link>
                  </li>
                  {/* <li className="text-gray-500 cursor-pointer mt-2 lg:hover:text-white transition-all text-sm md:text-base">
                    Order fabric samples
                  </li>
                  <li className="text-gray-500 cursor-pointer mt-2 lg:hover:text-white transition-all text-sm md:text-base">
                    Track order
                  </li>
                  <li className="text-gray-500 cursor-pointer mt-2 lg:hover:text-white transition-all text-sm md:text-base">
                    FAQs
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================== Footer End =================== */}
      <div className="bg-[#122234] px-4 md:px-8 py-4 text-white text-center">
        <div className="md:flex md:justify-between md:items-center">
          <div>
            <h2 className="text-sm md:text-base">
              © 2023 My Doin'Denimz Creation. all rights reserved.
            </h2>
          </div>
          {/* <div className="">
            <div className="text-sm md:text-base">
              Privacy Policy | Terms & Conditions
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Footer;

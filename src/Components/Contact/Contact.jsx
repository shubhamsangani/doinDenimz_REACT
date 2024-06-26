import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FetchAPI, contactUsAPI } from "../../api";
import clsx from "clsx";
import AOS from "aos";
import "aos/dist/aos.css";
import { successToast } from "../../store/Slice";

function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }, reset
  } = useForm();

  const formSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const { data } = await FetchAPI(contactUsAPI(), "post", formData);
      console.log(data);

      if (data.Message === "Your message has been successfully sent.") {
        successToast('Your message has been successfully sent')
        reset();
      }

    } catch (error) {
      console.log("Error in contact us API", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      <div className="bg-[#F9FAFB] py-4 px-4 md:px-8 rounded" data-aos="fade-left">
        <h4 className="text-xl font-semibold">Contact Us</h4>

        <form action="" onSubmit={handleSubmit(formSubmit)} className=" mt-4">
          <div>
            <div className="mt-4">
              <label htmlFor="" className="text-[#003061]">
                Name *
              </label>
              <br />
              <input
                type="text"
                name="contactus_name"
                placeholder="Enter your Name"
                className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                {...register("contactus_name", { required: true })}
              />
              {errors.contactus_name && <p className="text-red-600">Name is Required.</p>}
            </div>
            <div className="mt-4">
              <label htmlFor="" className="text-[#003061]">
                Email *
              </label>
              <br />
              <input
                type="email"
                name="contactus_email"
                placeholder="Enter your Email"
                className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                {...register("contactus_email", {
                  required: "Email is Required.",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Please enter valid Email address.",
                  },
                })}
              />
              {errors.contactus_email && (
                <p className="text-red-600">{errors.contactus_email.message}</p>
              )}
            </div>

            <div className="mt-4">
              <label htmlFor="" className="text-[#003061]">
                Mobile No. *
              </label>
              <br />
              <input
                type="number"
                name="contactus_mobile_no"
                placeholder="Enter your Mobile No."
                className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                {...register("contactus_mobile_no", {
                  required: "Mobile No. is Required.",
                  minLength: {
                    value: 10,
                    message: "Mobile No. should be 10 digit.",
                  },
                  maxLength: {
                    value: 10,
                    message: "Mobile No. should be 10 digit.",
                  },
                })}
              />
              {errors.contactus_mobile_no && (
                <p className="text-red-600">{errors.contactus_mobile_no.message}</p>
              )}
            </div>

            <div className="mt-4">
              <label htmlFor="" className="text-[#003061]">
                Message *
              </label>
              <br />
              <textarea
                name="contactus_message"
                rows="4"
                placeholder="Enter your Message"
                className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                {...register("contactus_message", { required: true })}
              />
              {errors.contactus_message && (
                <p className="text-red-600">Message is Required.</p>
              )}
            </div>
          </div>

          <div className="mt-5 text-center">
            <button
              type="submit"
            //   className="w-[50vw] md:w-[40vw] lg:w-[20vw] bg-[#003061] p-2 rounded text-white font-medium hover:bg-white hover:border-[#003061] border-[#003061] border hover:text-[#003061] transition"

              className={clsx(
                "w-[50vw]",
                "md:w-[40vw]",
                "lg:w-[24vw]",
                "p-2",
                "rounded",
                "text-white",
                "font-medium",
                "transition",
                isLoading
                  ? "bg-[#003061c5] pointer-events-none"
                  : "bg-[#003061] cursor-pointer hover:bg-white hover:border-[#003061] border border-[#003061] hover:text-[#003061]"
              )}
            >
              {isLoading ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i> Wait
                </>
              ) : (
                " Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;

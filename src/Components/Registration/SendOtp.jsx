import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { FetchAPI, forgetPasswordInitAPI } from "../../api";
import logo from "../../assets/logo.png";
import { errorToast, successToast } from "../../store/Slice";

function SendOtp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const { data } = await FetchAPI(
        forgetPasswordInitAPI(),
        "post",
        formData
      );
      console.log(data);
      localStorage.setItem('userEmail', JSON.stringify(data.Data))

      if (
        data.Message ===
        "Verification code is sent to your email. Kindly check it out"
      ) {
        successToast(data.Message)

        navigate("/create-password");
      }

      if (data.email) {
        errorToast(data.email)
      }
    } catch (error) {
      console.log("Error in forgotPassword API", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="p-2 flex flex-col justify-center items-center h-[90vh] md:h-auto lg:min-h-screen mt-4 sm:mt-0">
        <div className="flex flex-col justify-center items-center">
        <div className="md:hidden mb-5">
            <img
              src={logo}
              alt=""
              className="mx-auto w-[80%] md:w-[70%] lg:w-full"
            />
          </div>
          <h2 className="font-semibold text-3xl text-[#003060]">
            Forgot Password
          </h2>
          <p className="text-gray-500 leading-tight mt-3 w-[80%] lg:w-[60%] text-center text-sm md:text-base">
            Recover Your Access, Reset Your Password: Simple and Secure.
          </p>
        </div>

        <form
          action=""
          onSubmit={handleSubmit(formSubmit)}
          className="w-[85%] md:w-[72vw] lg:w-[36vw] mt-4"
        >
          <div>
            <div className="mt-4">
              <label htmlFor="" className="text-[#003061]">
                Email *
              </label>
              <br />
              <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-600">Email is Required.</p>
              )}
            </div>
          </div>

          <div className="my-5 text-center">
            <button
              type="submit"
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
                  ? "bg-[#003061c5] cursor-not-allowed"
                  : "bg-[#003061] cursor-pointer hover:bg-white hover:border-[#003061] border border-[#003061] hover:text-[#003061]"
              )}
            >
              {isLoading ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i> Wait
                </>
              ) : (
                " Send OTP"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SendOtp;

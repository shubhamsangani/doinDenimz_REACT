import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FetchAPI, emailVerificationAPI, otpVerificationAPI } from "../../api";
import clsx from "clsx";
import logo from "../../assets/logo.png";
import { errorToast, successToast } from "../../store/Slice";

function OtpVerificationForm() {
  const navigate = useNavigate();
  // const location = useLocation();
  // const { id, email } = location.state || {};
  const userSignUpInfo = JSON.parse(localStorage.getItem("userSignUpInfo"));
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [validateOTP, setValidateOTP] = useState(true);
  const [resendOTP, setResendOTP] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRefs = useRef([]);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      console.log("Submitted OTP:", otpValues.join(""));
      const otpVerifyJSON = {
        id: userSignUpInfo.id,
        OTP_code: otpValues.join(""),
      };
      const { data } = await FetchAPI(
        otpVerificationAPI(),
        "PATCH",
        otpVerifyJSON
      );
      console.log("OtpVerification", data);

      data?.OTP_error &&
        (data.OTP_error
          ? errorToast(data.OTP_error)
          : successToast(data.Message))

      if (data?.Message === "Your account is verified") {
        successToast(data.Message)
        navigate("/login");
      }
    } catch (error) {
      console.log("Error in OTP verify API", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTPHandler = async () => {
    setIsLoading(true);
    try {
      const emailVerifyJSON = {
        id: userSignUpInfo.id,
        email: userSignUpInfo.user_email,
      };
      console.log(emailVerifyJSON);
      const { data } = await FetchAPI(
        emailVerificationAPI(),
        "post",
        emailVerifyJSON
      );

      if (
        data.Message ===
        "Verification code is sent to your email. Kindly check it out"
      ) {
        successToast(data.Message)

        setResendOTP(false);
        setTimeLeft(60);
      }
    } catch (error) {
      console.log("Error in emailVerificationUser API", error);
    }
    finally{
      setIsLoading(false);
    }
  };

  const handleInputChange = (index, value, key) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    // Move focus to the next input field
    if (value !== "" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const startTimer = () => {
    setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        setResendOTP(true);
      }
    }, 1000);
  };
  useEffect(() => {
    if (validateOTP) {
      startTimer();
    }
  }, [timeLeft]);
  return (
    <div>
      <div className="p-2 md:flex md:flex-col md:justify-center md:items-center h-[90vh] md:h-auto lg:min-h-screen mt-4 sm:mt-0">
        <div className="flex flex-col justify-center items-center">
        <div className="md:hidden mb-5">
            <img
              src={logo}
              alt=""
              className="mx-auto w-[80%] md:w-[70%] lg:w-full"
            />
          </div>
          <h2 className="font-semibold text-3xl text-[#003060]">
            OTP Verification
          </h2>
          <p className="text-gray-500 leading-tight mt-3 w-[100%] text-center">
            Enter the OTP sent to{" "}
            <span className="text-gray-700 font-semibold"> {userSignUpInfo?.email} </span>
          </p>
        </div>

        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="mt-6 text-center">
              {Array.from({ length: 6 }).map((_, index) => (
                <Controller
                  key={index}
                  control={control}
                  name={`otp[${index}]`}
                  defaultValue={""}
                  {...register(`otp[${index}]`, { required: true })}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      maxLength={1}
                      className=" py-2 rounded-md border-gray-300 border w-12 me-2 text-2xl text-center focus:outline-none text-[#003061]"
                      onChange={(e) => {
                        handleInputChange(index, e.target.value, e.key);
                        field.onChange(e);
                      }}
                      ref={(input) => (inputRefs.current[index] = input)}
                    />
                  )}
                />
              ))}
              {errors.otp && (
                <p className="text-red-600 mt-2">OTP is Required.</p>
              )}
            </div>
          </div>

          <div className="mt-5 text-center">
            <button
              type="submit"
              className={clsx(
                "-ms-[8px]",
                "w-[215px]",
                "bg-[#003061]",
                "p-2",
                "rounded",
                "text-white",
                "font-medium",
                "hover:bg-white",
                "hover:border-[#003061]",
                "border-[#003061]",
                "border",
                "hover:text-[#003061]",
                "transition",
                isLoading ? "bg-[#003061c5]  pointer-events-none" : ""
              )}
            >
              {isLoading ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i> Wait
                </>
              ) : (
                " Verify OTP"
              )}
            </button>
          </div>
        </form>

        <p className="pt-8 text-center text-gray-500">
          Didn't Receive the OTP?&nbsp;
          {resendOTP ? (
            <Link
              to=""
              // className="text-[#003061] font-semibold cursor-pointer"
              className={clsx(
                "text-[#003061]",
                "font-semibold",
                "cursor-pointer",
                isLoading
                  ? "text-[#003061b7] pointer-events-none"
                  : ""
              )}
              onClick={() => resendOTPHandler()}
            >
              {/* Resend OTP */}
              {isLoading ? (
                <>
                  Resend OTP <i className="fa-solid fa-circle-notch fa-spin"></i>
                </>) : (
                " Resend OTP"
              )}
            </Link>
          ) : (
            <Link
              to=""
              className="text-[#003061b7] font-semibold cursor-not-allowed"
            >
              Resend OTP
            </Link>
          )}
        </p>
        <p className="text-sm text-center text-gray-600 mt-3">
          Resend OTP in ({timeLeft > 0 ? timeLeft : 0}s)
        </p>
      </div>
    </div>
  );
}

export default OtpVerificationForm;

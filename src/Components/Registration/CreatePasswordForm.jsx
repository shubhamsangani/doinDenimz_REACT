import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FetchAPI,
  emailVerificationAPI,
  forgetPasswordInitAPI,
  forgetPasswordUserChangedAPI,
} from "../../api";
import logo from "../../assets/logo.png";
import { errorToast, successToast } from "../../store/Slice";

function CreatePassowrdForm() {
  const navigate = useNavigate();
  const userEmail = JSON.parse(localStorage.getItem("userEmail"));

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validateOTP, setValidateOTP] = useState(true);
  const [resendOTP, setResendOTP] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const [isUpperCase, setIsUpperCase] = useState(false);
  const [isLowerCase, setIsLowerCase] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isSpecialChar, setIsSpecialChar] = useState(false);
  const [isMinLength, setIsMinLength] = useState(false);
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setIsUpperCase(/[A-Z]/.test(value));
    setIsLowerCase(/[a-z]/.test(value));
    setIsNumber(/\d/.test(value));
    setIsSpecialChar(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value));
    setIsMinLength(value.length >= 8);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const formSubmit = async (formData) => {
    setIsLoading(true);
    const createPasswordJSON = {
      email: userEmail.id,
      user_new_password: formData.user_new_password,
      OTP_code: formData.OTP_code,
    };
    try {
      const { data } = await FetchAPI(
        forgetPasswordUserChangedAPI(),
        "post",
        createPasswordJSON
      );
      console.log(createPasswordJSON);
      if (
        data.Message ===
        "Your Password is changed. please login with new Password"
      ) {
        successToast(
          "Your Password is changed. Please login with new Password"
        );

        navigate("/login");
      }

      if (data.OTP_error) {
        errorToast(data.OTP_error);
      }
    } catch (error) {
      console.log("Error in forgetPasswordUserChanged API", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTPHandler = async () => {
    setIsLoading(true);
    try {
      const { data } = await FetchAPI(forgetPasswordInitAPI(), "post", {
        email: userEmail.id,
      });
      console.log(data);

      if (
        data.Message ===
        "Verification code is sent to your email. Kindly check it out"
      ) {
        successToast(data.Message);

        setResendOTP(false);
        setTimeLeft(60);
      }
    } catch (error) {
      console.log("Error in emailVerificationUser API", error);
    } finally {
      setIsLoading(false);
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
      <div className="p-2 flex flex-col justify-center items-center lg:min-h-screen mt-4 sm:mt-0">
        <div className="flex flex-col justify-center items-center">
          <div className="md:hidden mb-5">
            <img
              src={logo}
              alt=""
              className="mx-auto w-[80%] md:w-[70%] lg:w-full"
            />
          </div>
          <h2 className="font-semibold text-3xl text-[#003060]">
            Create New Passowrd
          </h2>
          <p className="text-gray-500 leading-tight mt-3 w-[80%] lg:w-[60%] text-center text-sm md:text-base">
            New password must be different from previously used password.
          </p>
        </div>

        <form
          action=""
          onSubmit={handleSubmit(formSubmit)}
          className="w-[85%] md:w-[72vw] lg:w-[36vw] mt-4"
        >
          <div>
            {/*==================== New Password  ====================*/}
            <div className="mt-4">
              <label htmlFor="" className="text-[#003061]">
                New Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="user_new_password"
                  placeholder="Enter your new password"
                  className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                  {...register("user_new_password", {
                    required: "Password is Required.",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      // message:
                      //   "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character.",
                    },
                  })}
                  onChange={handlePasswordChange}
                />
                {showPassword ? (
                  <div
                    className="absolute top-3 right-3"
                    onClick={togglePasswordVisibility}
                  >
                    <i className="fa-solid fa-eye text-[#003061]"></i>
                  </div>
                ) : (
                  <div
                    className="absolute top-3 right-3"
                    onClick={togglePasswordVisibility}
                  >
                    <i className="fa-solid fa-eye-slash text-[#003061]"></i>
                  </div>
                )}
                {errors.user_new_password && (
                  <p className="text-red-600">
                    {errors.user_new_password.message}
                  </p>
                )}
                {/* ==================== password validation UI ====================*/}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-x-2 mt-2">
                  <div>
                    <span>
                      {isUpperCase ? (
                        <i className="fa-solid fa-check text-[#003060]"></i>
                      ) : (
                        <i className="fa-solid fa-xmark text-red-700"></i>
                      )}
                    </span>
                    <span
                      className={clsx(
                        "ps-1",
                        isUpperCase ? "text-[#003060]" : "text-red-700"
                      )}
                    >
                      1 Uppercase
                    </span>
                  </div>
                  <div>
                    <span className="">
                      {isLowerCase ? (
                        <i className="fa-solid fa-check text-[#003060]"></i>
                      ) : (
                        <i className="fa-solid fa-xmark text-red-700"></i>
                      )}
                    </span>
                    <span
                      className={clsx(
                        "ps-1",
                        isLowerCase ? "text-[#003060]" : "text-red-700"
                      )}
                    >
                      1 Lowercase
                    </span>
                  </div>
                  <div className="xl:col-span-2">
                    <span className="">
                      {isSpecialChar ? (
                        <i className="fa-solid fa-check text-[#003060]"></i>
                      ) : (
                        <i className="fa-solid fa-xmark text-red-700"></i>
                      )}
                    </span>
                    <span
                      className={clsx(
                        "ps-1",
                        isSpecialChar ? "text-[#003060]" : "text-red-700"
                      )}
                    >
                      1 Special Character
                    </span>
                  </div>
                  <div>
                    <span className="">
                      {isNumber ? (
                        <i className="fa-solid fa-check text-[#003060]"></i>
                      ) : (
                        <i className="fa-solid fa-xmark text-red-700"></i>
                      )}
                    </span>
                    <span
                      className={clsx(
                        "ps-1",
                        isNumber ? "text-[#003060]" : "text-red-700"
                      )}
                    >
                      1 Number
                    </span>
                  </div>
                  <div className="xl:col-span-2">
                    <span className="">
                      {isMinLength ? (
                        <i className="fa-solid fa-check text-[#003060]"></i>
                      ) : (
                        <i className="fa-solid fa-xmark text-red-700"></i>
                      )}
                    </span>
                    <span
                      className={clsx(
                        "ps-1",
                        isMinLength ? "text-[#003060]" : "text-red-700"
                      )}
                    >
                      8 Characters
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/*==================== Confirm Password  ====================*/}
            <div className="mt-4">
              <label htmlFor="" className="text-[#003061]">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm_password"
                  placeholder="Enter your Password"
                  className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                  {...register("confirm_password", {
                    required: true,
                    validate: (value) => {
                      if (watch("user_new_password") != value) {
                        return "The passwords do not match.";
                      }
                    },
                  })}
                />
                {showConfirmPassword ? (
                  <div
                    className="absolute top-3 right-3"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    <i className="fa-solid fa-eye text-[#003061]"></i>
                  </div>
                ) : (
                  <div
                    className="absolute top-3 right-3"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    <i className="fa-solid fa-eye-slash text-[#003061]"></i>
                  </div>
                )}
                {errors.confirm_password && (
                  <p className="text-red-600">
                    {errors.confirm_password.message}
                  </p>
                )}
              </div>
            </div>

            {/*==================== OTP code  ====================*/}
            <div className="mt-4">
              <label htmlFor="" className="text-[#003061]">
                OTP *
              </label>
              <br />
              <input
                type="text"
                name="OTP_code"
                placeholder="Enter your OTP"
                className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                {...register("OTP_code", { required: true })}
              />
              {errors.OTP_code && (
                <p className="text-red-600">OTP is Required.</p>
              )}
            </div>
          </div>

          <div className="mt-5 text-center">
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
                  ? "bg-[#003061c5] pointer-events-none"
                  : "bg-[#003061] cursor-pointer hover:bg-white hover:border-[#003061] border border-[#003061] hover:text-[#003061]"
              )}
            >
              {isLoading ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i> Wait
                </>
              ) : (
                " Create Password"
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
                isLoading ? "text-[#003061b7] pointer-events-none" : ""
              )}
              onClick={() => resendOTPHandler()}
            >
              {/* Resend OTP */}
              {isLoading ? (
                <>
                  Resend OTP{" "}
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                </>
              ) : (
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
        <p className="text-sm text-gray-600 mt-3">
          Resend OTP in ({timeLeft > 0 ? timeLeft : 0}s)
        </p>
      </div>
    </div>
  );
}

export default CreatePassowrdForm;

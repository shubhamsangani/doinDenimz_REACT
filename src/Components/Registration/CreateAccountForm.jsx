import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FetchAPI, emailVerificationAPI, registerUserAPI } from "../../api";
import clsx from "clsx";
import logo from "../../assets/logo.png";
import { errorToast, successToast } from "../../store/Slice";

function CreateAccountForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm({ defaultValues: { user_is_seller: true } });

  const isTermsChecked = watch("terms");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isUpperCase, setIsUpperCase] = useState(false);
  const [isLowerCase, setIsLowerCase] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isSpecialChar, setIsSpecialChar] = useState(false);
  const [isMinLength, setIsMinLength] = useState(false);
  const password = watch("password");

  useEffect(() => {
    const handlePasswordChange = () => {
      const value = password;
      setIsUpperCase(/[A-Z]/.test(value));
      setIsLowerCase(/[a-z]/.test(value));
      setIsNumber(/\d/.test(value));
      setIsSpecialChar(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value));
      setIsMinLength(value?.length >= 8);
    };

    handlePasswordChange();
  }, [password]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const { data } = await FetchAPI(registerUserAPI(), "post", formData);
      console.log(data);
      localStorage.setItem("userSignUpInfo", JSON.stringify(data.Data));

      if (data.errorMsg) {
        errorToast(data.errorMsg[0]);
      }

      if (data?.username) {
        errorToast(data.username[0]);
      }

      if (data.Message === "Candidate is registerd") {
        const emailVerifyJSON = {
          id: data.Data.id,
          email: data.Data.user_email,
        };
        const sendOtpAPI = await FetchAPI(
          emailVerificationAPI(),
          "post",
          emailVerifyJSON
        );

        {
          data.username
            ? errorToast(data.username[0])
            : successToast(sendOtpAPI.data.Message);
        }

        if (
          sendOtpAPI.data.Message ===
          "Verification code is sent to your email. Kindly check it out"
        ) {
          navigate("/otp-verify");
        }
      }
      reset();
    } catch (error) {
      console.log("Error in signup API", error);
    } finally {
      setIsLoading(false);
    }
  };

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
            Create an Account
          </h2>
          <p className="text-gray-500 leading-tight mt-3 w-[80%] lg:w-[60%] text-center text-sm md:text-base">
            Your personal details are safe, we will never share your
            information.
          </p>
        </div>

        <form
          action=""
          onSubmit={handleSubmit(formSubmit)}
          className="w-[85%] md:w-[72vw] lg:w-[36vw] mt-4"
        >
          <div>
            {/*==================== First Name  ====================*/}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="" className="text-[#003061]">
                  First Name *
                </label>
                <br />
                <input
                  type="text"
                  name="first_name"
                  placeholder="Enter your First Name"
                  className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                  disabled={isLoading}
                  {...register("first_name", { required: true })}
                />
                {errors.first_name && (
                  <p className="text-red-600">First Name is Required.</p>
                )}
              </div>

              {/*==================== Last Name  ====================*/}
              <div>
                <label htmlFor="" className="text-[#003061]">
                  Last Name *
                </label>
                <br />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Enter your Last Name"
                  className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                  disabled={isLoading}
                  {...register("last_name", { required: true })}
                />
                {errors.last_name && (
                  <p className="text-red-600">Last Name is Required.</p>
                )}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/*==================== Email  ====================*/}
              <div>
                <label htmlFor="" className="text-[#003061]">
                  Email *
                </label>
                <br />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                  disabled={isLoading}
                  {...register("email", {
                    required: "Email is Required.",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: "Please enter valid Email address.",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/*==================== Mobile No  ====================*/}
              <div>
                <label htmlFor="" className="text-[#003061]">
                  Mobile No. *
                </label>
                <br />
                <input
                  type="number"
                  name="user_mobileno"
                  placeholder="Enter your Mobile No."
                  className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                  disabled={isLoading}
                  {...register("user_mobileno", {
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
                {errors.user_mobileno && (
                  <p className="text-red-600">{errors.user_mobileno.message}</p>
                )}
              </div>
            </div>

            {/*==================== password  ====================*/}
            <div className="mt-4">
              <label htmlFor="" className="text-[#003061]">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your Password"
                  className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                  disabled={isLoading}
                  {...register("password", {
                    required: "Password is Required.",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      // message:
                      //   "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character.",
                    },
                  })}
                  // onChange={handlePasswordChange}
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

                {errors.password && (
                  <p className="text-red-600">{errors.password.message}</p>
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
          </div>

          {/*==================== TnC  ====================*/}
          <div className="mt-4">
            <label className="text-sm text-gray-500 align-middle cursor-pointer">
              <Controller
                control={control}
                name="terms"
                defaultValue={false}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    {...field}
                    className="me-2 align-middle cursor-pointer"
                  />
                )}
              />
              I have read and understand the&nbsp;
              <Link to='/terms-and-conditions' className="text-gray-700 font-semibold hover:text-gray-900">
                Terms & Conditions&nbsp;
              </Link>
              and&nbsp;
              <Link to='/privacy-policy' className="text-gray-700 font-semibold hover:text-gray-900">
                Privacy Policy*
              </Link>
            </label>
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
                isTermsChecked
                  ? "bg-[#003061] cursor-pointer hover:bg-white hover:border-[#003061] border border-[#003061] hover:text-[#003061]"
                  : "bg-[#003061c5] cursor-not-allowed",
                isLoading ? "bg-[#003061c5]  pointer-events-none" : ""
              )}
              disabled={!isTermsChecked}
            >
              {isLoading ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i> Wait{" "}
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-gray-500 mb-8">
          Already have an account? &nbsp;
          <Link
            to="/login"
            className="text-[#003061] font-semibold cursor-pointer"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default CreateAccountForm;

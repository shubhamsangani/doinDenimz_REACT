import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import clsx from "clsx";
import {
  FetchAPI,
  emailVerificationAPI,
  getUserIDAPI,
  loginUserAPI,
} from "../../api";
import { useDispatch } from "react-redux";
import { setUserID } from "../../store/APISlice";
import { errorToast, successToast } from "../../store/Slice";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verifyBtn, setVerifyBtn] = useState(false);
  const [loginData, setLoginData] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formSubmit = async (formData) => {
    setIsLoading(true);
    setLoginData(formData);
    try {
      const { data } = await FetchAPI(loginUserAPI(), "post", formData);
      console.log(data);

      if (data.Data && data.message === "You are successfully login") {
        // localStorage.setItem("userInfo", JSON.stringify(data.Data));
        dispatch(setUserID(data.Data)); //localstorage save

        successToast(data.message)

        if(location.state){
          navigate(location.state.prev)
        }
        else{
          navigate("/");
        }
      }

      if (!data.Data && data.message) {
        errorToast(data.message[0])
      }

      if (data.user_is_verified) {
        setVerifyBtn(true);
        errorToast(data.user_is_verified[0])
      }
    } catch (error) {
      console.log("Error in Login API", error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyAccount = async () => {
    setIsLoading(true);
    try {
      const { data } = await FetchAPI(getUserIDAPI(), "post", {
        email: loginData.email,
      });
      console.log(data);

      if (data.message === "User detail") {
        const emailVerifyJSON = {
          id: data.userDetails.id,
          email: loginData.email,
        };
        const sendOtpAPI = await FetchAPI(
          emailVerificationAPI(),
          "post",
          emailVerifyJSON
        );

        {
          data.username
            ? errorToast(data.username[0])
            : successToast(sendOtpAPI.data.Message)
        }

        if (
          sendOtpAPI.data.Message ===
          "Verification code is sent to your email. Kindly check it out"
        ) {
          navigate("/otp-verify");
        }
      }
    } catch (error) {
      console.log("Error in verify email API", error);
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
          <h2 className="font-semibold text-3xl text-[#003060]">Login</h2>
          <p className="text-gray-500 leading-tight mt-3 w-[80%] lg:w-[60%] text-center text-sm md:text-base">
            Please login to access your saved sizes if you’ve shopped Online or
            In Store with us.
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
                disabled={isLoading}
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-600">Email is Required.</p>
              )}
            </div>
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
                  {...register("password", { required: true })}
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
                  <p className="text-red-600">Password is Required.</p>
                )}
              </div>
            </div>
          </div>

          <div className="text-right">
            <Link
              to="/send-otp"
              className="mt-3  text-[#003061] font-medium cursor-pointer"
            >
              Forgot Password?
            </Link>
          </div>

          {verifyBtn === false && (
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
                    ? "bg-[#003061c5] pointer-events-none"
                    : "bg-[#003061] cursor-pointer hover:bg-white hover:border-[#003061] border border-[#003061] hover:text-[#003061]"
                )}
              >
                {isLoading ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin"></i> Wait
                  </>
                ) : (
                  " Login Account"
                )}
              </button>
            </div>
          )}
        </form>

        {verifyBtn && (
          <div className="my-5 text-center">
            <button
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
              onClick={verifyAccount}
            >
              {isLoading ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i> Wait
                </>
              ) : (
                " Verify Account"
              )}
            </button>
          </div>
        )}

        <p className="text-center text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-[#003061] font-semibold cursor-pointer"
          >
            Sign UP{" "}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;

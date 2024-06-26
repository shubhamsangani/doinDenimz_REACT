import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import clsx from "clsx";
import { FetchAPI, changePasswordUserAPI } from "../../api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { errorToast, successToast } from "../../store/Slice";

function ChangePassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  // const { userInfo } = useSelector((state) => state.API);
  const { id, email } = JSON.parse(localStorage.getItem("userInfo")) || ''

  const toggleCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };
  const toggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const formSubmit = async (formData) => {
    setIsLoading(true);
    const changePasswordJSON = {
      id: id,
      email: email,
      password: formData.password,
      user_new_password: formData.user_new_password,
    };
    try {
      const { data } = await FetchAPI(
        changePasswordUserAPI(),
        "PATCH",
        changePasswordJSON
      );
      console.log(changePasswordJSON);

      if (data.Message === "Your password is successfully changed.") {
        successToast('Your password is successfully changed')
        reset();
      }

      if (data?.message) {
        errorToast(data.message[0])
      }
    } catch (error) {
      console.log("Error in changePasswordUser API", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* ======================= Heading ======================= */}
      <div className="text-center">
        <h4 className="text-gray-800 text-lg font-semibold">
          Change Your Password
        </h4>
        <p className="text-gray-500 text-sm md:text-base md:w-[90%] xl:w-[80%] mx-auto mt-2">
          "Change Your Password" is vital for online security. Regularly update
          it with a mix of letters, numbers, and symbols. Avoid common phrases
          or personal info. This proactive step strengthens account security,
          protecting against unauthorized access and cyber threats.
        </p>
      </div>

      <form action="" onSubmit={handleSubmit(formSubmit)} className=" mt-6">
        {/* ======================= Form ======================= */}
        <div className="w-full md:w-[90%] lg:w-[70%] mx-auto">
          {/* ======================= Current Password ======================= */}
          <div className="">
            <label htmlFor="" className="text-[#003061]">
              Current Password *
            </label>
            <br />
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="password"
                placeholder="Current Password"
                className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                {...register("password", { required: true })}
              />
              {showCurrentPassword ? (
                <div
                  className="absolute top-3 right-3"
                  onClick={toggleCurrentPassword}
                >
                  <i className="fa-solid fa-eye text-[#003061]"></i>
                </div>
              ) : (
                <div
                  className="absolute top-3 right-3"
                  onClick={toggleCurrentPassword}
                >
                  <i className="fa-solid fa-eye-slash text-[#003061]"></i>
                </div>
              )}
            </div>
            {errors.password && (
              <p className="text-red-600">Current Password is Required.</p>
            )}
          </div>

          {/* ======================= New Password ======================= */}
          <div className="mt-4">
            <label htmlFor="" className="text-[#003061]">
              New Password *
            </label>
            <br />
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="user_new_password"
                placeholder="New Password"
                className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                // {...register('user_new_password', { required: true })}
                {...register("user_new_password", {
                  required: "New Password is Required.",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    // message:
                    //   "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character.",
                  },
                })}
                onChange={handlePasswordChange}
              />
              {showNewPassword ? (
                <div
                  className="absolute top-3 right-3"
                  onClick={toggleNewPassword}
                >
                  <i className="fa-solid fa-eye text-[#003061]"></i>
                </div>
              ) : (
                <div
                  className="absolute top-3 right-3"
                  onClick={toggleNewPassword}
                >
                  <i className="fa-solid fa-eye-slash text-[#003061]"></i>
                </div>
              )}
            </div>
            {errors.user_new_password && (
              <p className="text-red-600">{errors.user_new_password.message}</p>
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

          {/* ======================= Confirm Password ======================= */}
          <div className="mt-4">
            <label htmlFor="" className="text-[#003061]">
              Confirm New Password *
            </label>
            <br />
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirm_password"
                placeholder="Confirm New Password"
                className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                // {...register('confirm_password', { required: true })}
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
                  onClick={toggleConfirmPassword}
                >
                  <i className="fa-solid fa-eye text-[#003061]"></i>
                </div>
              ) : (
                <div
                  className="absolute top-3 right-3"
                  onClick={toggleConfirmPassword}
                >
                  <i className="fa-solid fa-eye-slash text-[#003061]"></i>
                </div>
              )}
            </div>
            {errors.confirm_password && (
              <p className="text-red-600">{errors.confirm_password.message}</p>
            )}
          </div>
        </div>
        <div className="my-8 text-center">
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
              "transition-all",
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
              " Change Password"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;

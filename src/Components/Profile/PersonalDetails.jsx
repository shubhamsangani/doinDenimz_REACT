import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
  Chip,
} from "@material-tailwind/react";
import {
  FetchAPI,
  personalDetailsAPI,
  editProfileAPI,
  addressRegisterAPI,
  addressGetAllAPI,
  addressDeleteAPI,
  addressUpdateAPI,
  defaultAddressAPI,
  pincodeAPI,
} from "../../api";
import clsx from "clsx";
import { FaMobile } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { successToast } from "../../store/Slice";
// import pincodes from "../../pincodes.json";
import states from "../../state.json";
import cities from "../../Cities.json";

function PersonalDetails() {
  //User Info Form
  const {
    register: registerForm1,
    handleSubmit: handleSubmitForm1,
    formState: { errors: errorsForm1 },
  } = useForm();

  //Address Form
  const {
    register: registerForm2,
    handleSubmit: handleSubmitForm2,
    formState: { errors: errorsForm2 },
    setValue: setValue2,
    reset,
    watch,
  } = useForm();

  const dispatch = useDispatch();
  const [personalDetails, setPersonalDetails] = useState([]);
  const [addressDetails, setAddressDetails] = useState([]);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [defaluAddressIndex, setDefaluAddressIndex] = useState(null);
  const [editID, setEditID] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeData, setPincodeData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [addressValue, setAddressValue] = useState({});

  const zipcode = watch("zipcode");
  const city = watch("city");
  const state = watch("state");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  //Handler of Address Model
  const handleOpen = () => {
    setOpen(!open);
    if (editID !== -1) {
      reset();
    }
    setEditID(-1);
    setAddressValue({});
    setValue2("city", "");
    setValue2("state", "");
  };

  //Handler of User Info Model
  const handleOpenInfo = () => setOpenInfo(!openInfo);

  //Get User Info API
  const personalDetailsData = async () => {
    try {
      const { data } = await FetchAPI(personalDetailsAPI(), "post", {
        id: userInfo?.id,
      });
      setPersonalDetails(data.userDetails);
      console.log(personalDetails);
    } catch (error) {
      console.log("Error in personalDetails API", error);
    }
  };

  //Update User Info API
  const formSubmit = async (formData) => {
    setIsLoading(true);
    try {
      formData.id = userInfo.id;
      formData.email = personalDetails.user_email;
      const { data } = await FetchAPI(editProfileAPI(), "PATCH", formData);
      console.log(data);
      personalDetailsData();
      handleOpenInfo();
      if (data.Message === "User Profile is updated.") {
        successToast("User Profile is updated");
      }
    } catch (error) {
      console.log("Error in edit profile API", error);
    } finally {
      setIsLoading(false);
    }
  };

  //Get Address all API
  const addressDetailsData = async () => {
    try {
      const { data } = await FetchAPI(addressGetAllAPI(), "post", {
        user_id: userInfo?.id,
      });
      setAddressDetails(data.Data);
      console.log("address", addressDetails);
    } catch (error) {
      console.log("Error in addressDetails API", error);
    }
  };

  useEffect(() => {
    Promise.all([personalDetailsData(), addressDetailsData()])
      .then(() => {
        setLoading(false); // Set loading to false once all API calls are successful
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // In case of an error, also set loading to false
      });
  }, []);

  //Post Address API
  const addAddress = async (formData) => {
    setIsLoading(true);

    try {
      formData.user_id = userInfo.id;
      if (formData.is_address_action) {
        formData.is_address_action = "active";
      } else {
        formData.is_address_action = "deactive";
      }
      const { data } = await FetchAPI(addressRegisterAPI(), "POST", formData);
      console.log(data);

      if (data.Message === "Address Details is Added") {
        successToast("Address Details is Added");
      }
    } catch (error) {
      console.log("Error in address register API", error);
    } finally {
      setIsLoading(false);
    }
  };

  //Update Address API
  const updateAddress = async (formData) => {
    setIsLoading(true);
    try {
      formData.user_id = userInfo.id;
      formData.address_id = editID;
      if (formData.is_address_action) {
        formData.is_address_action = "active";
      } else {
        formData.is_address_action = "deactive";
      }
      const { data } = await FetchAPI(addressUpdateAPI(), "PATCH", formData);
      console.log(data);

      if (data.Message === "Address Details is Updated") {
        successToast("Address Details is Updated");
      }
    } catch (error) {
      console.log("Error in address update API", error);
    } finally {
      setIsLoading(false);
    }
  };

  //Submit function for New or Update Address
  const formAddress = async (formData) => {
    if (editID == -1) {
      await addAddress(formData);
    } else {
      await updateAddress(formData);
    }
    addressDetailsData();
    reset();
    handleOpen();
  };

  //Delete Address API
  const deleteAddress = async (addressID, index) => {
    try {
      setDeletingIndex(index);
      const { data } = await FetchAPI(addressDeleteAPI(), "DELETE", {
        address_id: addressID,
      });
      console.log(data);
      addressDetailsData();
      if (data.Message === "Address Details is Delete successfully") {
        successToast("Address Details is deleted");
      }
    } catch (error) {
      console.log("Error in address delete API", error);
    } finally {
      setDeletingIndex(null);
    }
  };

  //Edit Address
  const editAddress = async (item) => {
    handleOpen();
    setEditID(item.address_id);
    setAddressValue(item);
  };

  // Use useEffect to set form values when oldData changes
  useEffect(() => {
    if (addressValue) {
      Object.keys(addressValue).forEach((key) => {
        setValue2(key, addressValue[key]);
      });
    }
  }, [addressValue, setValue2]);

  //default Address API
  const defaultAddress = async (addressID, index) => {
    const defaultAddressJSON = {
      user_id: userInfo.id,
      is_address_action: "active",
      address_id: addressID,
    };
    try {
      setDefaluAddressIndex(index);
      const { data } = await FetchAPI(
        defaultAddressAPI(),
        "PATCH",
        defaultAddressJSON
      );
      console.log(data);
      addressDetailsData();
      if (data.Message === "Address Details is Updated") {
        successToast("Address Details is Updated");
      }
    } catch (error) {
      console.log("Error in default address API", error);
    } finally {
      setDefaluAddressIndex(null);
    }
  };

  //Pincode API function
  const pincode = async (pincode) => {
    try {
      setPincodeLoading(true);
      const { data } = await FetchAPI(pincodeAPI(), "POST", {
        pincode: pincode,
      });
      setPincodeData(data.Data);
    } catch (error) {
      console.log("Error in pincode API", error);
    } finally {
      setPincodeLoading(false);
    }
  };

  useEffect(() => {
    const fetchPincodeData = async () => {
      if (zipcode?.length === 6) {
        await pincode(zipcode);
      }
    };

    fetchPincodeData();
  }, [zipcode]);

  useEffect(() => {
    if (pincodeData) {
      setValue2("city", pincodeData[0]?.districtName);
      setValue2("state", pincodeData[0]?.stateName);
    } else {
      setValue2("city", "");
      setValue2("state", "");
    }
  }, [pincodeData, setValue2]);

  return (
    <>
      {loading ? (
        <div className="loader-container-address">
          <span className="loader"></span>
        </div>
      ) : (
        <div>
          {/* ======================= Heading ======================= */}
          <div className="text-center">
            <h4 className="text-gray-800 text-lg font-semibold">
              Personal Details
            </h4>
            <p className="text-gray-500 text-sm md:text-base md:w-[90%] xl:w-[80%] mx-auto mt-2">
              "PERSONAL DETAILS" encompasses vital information about you,
              including your name, contact details, and address. It ensures
              accurate communication and smooth transactions. Keep this section
              updated to facilitate seamless interactions and ensure that your
              preferences and orders are handled efficiently.
            </p>
          </div>

          {/* ======================= User Information ======================= */}
          <div className="text-center mt-6">
            <h4 className="text-gray-800 text-lg font-semibold">
              User Information
            </h4>
          </div>

          <div className="my-4 border border-gray-300 p-4 rounded-md">
            <div className="flex justify-between items-center">
              <h6 className="capitalize">{personalDetails?.user_firstname}</h6>
              <Tooltip content="Edit Profile" placement="bottom">
                <div className="cursor-pointer" onClick={handleOpenInfo}>
                  <CiEdit className="text-xl" />
                </div>
              </Tooltip>
            </div>
            <div className="grid grid-cols-5 md:grid-cols-6 gap-x-4 gap-y-1 mt-3">
              <div className="col-span-2 md:col-span-1">
                <span className="text-gray-600">First Name:</span>
              </div>
              <div className="col-span-3 md:col-span-2">
                <span className="capitalize">
                  {personalDetails?.user_firstname}
                </span>
              </div>
              <div className="col-span-2 md:col-span-1">
                <span className="text-gray-600">Last Name:</span>
              </div>
              <div className="col-span-3 md:col-span-2">
                <span className="capitalize">
                  {personalDetails?.user_lastname}
                </span>
              </div>
              <div className="col-span-2 md:col-span-1">
                <span className="text-gray-600">Email:</span>
              </div>
              <div className="col-span-3 md:col-span-2">
                <span className="break-words">
                  {personalDetails?.user_email}
                </span>
              </div>
              <div className="col-span-2 md:col-span-1">
                <span className="text-gray-600">Mobile No.:</span>
              </div>
              <div className="col-span-3 md:col-span-2">
                <span>{personalDetails?.user_mobileno}</span>
              </div>
            </div>
          </div>

          {/* ======================= Address ======================= */}
          <div className="text-center mt-6">
            <h4 className="text-gray-800 text-lg font-semibold">Addresses</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {addressDetails?.length > 0 ? (
              addressDetails?.map((item, index) => {
                return (
                  <div
                    className="border border-gray-300 p-4 rounded-md"
                    key={index}
                  >
                    <div className="flex justify-between items-center">
                      <div className="">
                        <span className="font-medium capitalize">
                          {item.first_name} {item.last_name}
                        </span>
                        <Chip
                          className="inline-block ms-2 rounded-full py-1"
                          variant="outlined"
                          value={item.address_name}
                          color="indigo"
                        />
                      </div>
                      <div className="flex">
                        <Tooltip content="Edit Address" placement="bottom">
                          <div
                            className="cursor-pointer"
                            onClick={() => editAddress(item)}
                          >
                            <CiEdit className="text-xl" />
                          </div>
                        </Tooltip>

                        {/* Delete Address API */}
                        <Tooltip content="Delete Address" placement="bottom">
                          {deletingIndex === index ? (
                            <i className="fa-solid fa-circle-notch fa-spin ps-2"></i>
                          ) : (
                            <div
                              className="ps-2 cursor-pointer"
                              onClick={() =>
                                deleteAddress(item.address_id, index)
                              }
                            >
                              <IoMdClose className="text-xl" />
                            </div>
                          )}
                        </Tooltip>
                      </div>
                    </div>

                    <p className="mt-3 text-gray-600 text-sm w-[90%] capitalize">
                      {item.address}, {item.address_area}, {item.landmark},{" "}
                      {item.city},&nbsp;
                      <span>
                        {item.state.charAt(0).toUpperCase() +
                          item.state.slice(1).toLowerCase()}
                      </span>
                      , {item.country},
                      <br />
                      {item.zipcode}, <br />
                      <span className="flex items-center ">
                        <span className="flex items-center">
                          <FaMobile className="me-2" /> {item.mobile_no}
                        </span>
                        {item.phone_no && (
                          <span className="flex items-center ms-4">
                            <BsTelephoneFill className="me-2" /> {item.phone_no}
                          </span>
                        )}
                      </span>
                    </p>

                    {/* Default Address API  */}
                    <div className="mt-2">
                      {defaluAddressIndex === index ? (
                        <i className="fa-solid fa-circle-notch fa-spin"></i>
                      ) : (
                        item.is_address_action === "deactive" && (
                          <div
                            className="underline cursor-pointer"
                            onClick={() =>
                              defaultAddress(item.address_id, index)
                            }
                          >
                            Set as your default address
                          </div>
                        )
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-[5rem] flex justify-center items-center text-center">
                <p className="text-gray-600 text-xl md:text-2xl">
                  No Saved Address
                </p>
              </div>
            )}

            <div className="border border-gray-300 p-4 rounded-md flex items-center justify-center ">
              <div
                className="flex items-center cursor-pointer"
                onClick={handleOpen}
              >
                <IoIosAddCircleOutline />
                <span className="ps-2">Add New Delivery Address</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================= Model User Info ======================= */}
      <div>
        <Dialog
          open={openInfo}
          handler={handleOpenInfo}
          size="lg"
          className="px-4 "
        >
          <div className="flex items-center justify-between">
            <DialogHeader className="justify-center flex-grow text-base md:text-xl">
              Update User Information
            </DialogHeader>
            <div>
              <IoMdClose
                className="text-2xl cursor-pointer"
                onClick={handleOpenInfo}
              />
            </div>
          </div>

          <form action="" onSubmit={handleSubmitForm1(formSubmit)} className="">
            <DialogBody>
              {/* ======================= Form ======================= */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="">
                  <label htmlFor="" className="text-[#003061]">
                    First Name *
                  </label>
                  <br />
                  <input
                    type="text"
                    name="first_name"
                    defaultValue={personalDetails?.user_firstname}
                    placeholder="Enter your First Name"
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...registerForm1("first_name", { required: true })}
                  />
                  {errorsForm1.first_name && (
                    <p className="text-red-600">First Name is Required.</p>
                  )}
                </div>

                <div className="">
                  <label htmlFor="" className="text-[#003061]">
                    Last Name *
                  </label>
                  <br />
                  <input
                    type="text"
                    name="last_name"
                    defaultValue={personalDetails?.user_lastname}
                    placeholder="Enter your Last Name"
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...registerForm1("last_name", { required: true })}
                  />
                  {errorsForm1.last_name && (
                    <p className="text-red-600">Last Name is Required.</p>
                  )}
                </div>

                <div className="">
                  <label htmlFor="" className="text-[#003061]">
                    Email *
                  </label>
                  <br />
                  <input
                    type="email"
                    name="email"
                    value={personalDetails?.user_email}
                    disabled
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    // {...registerForm1("email", {
                    //   required: "Email is Required.",
                    //   pattern: {
                    //     value:
                    //       /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    //     message: "Please enter valid Email address.",
                    //   },
                    // })}
                  />
                  {/* {errorsForm1.email && (
                    <p className="text-red-600">{errorsForm1.email.message}</p>
                  )} */}
                </div>

                <div className="">
                  <label htmlFor="" className="text-[#003061]">
                    Mobile No. *
                  </label>
                  <br />
                  <input
                    type="number"
                    name="user_mobileno"
                    defaultValue={personalDetails?.user_mobileno}
                    placeholder="Enter your Mobile No."
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...registerForm1("user_mobileno", {
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
                  {errorsForm1.user_mobileno && (
                    <p className="text-red-600">
                      {errorsForm1.user_mobileno.message}
                    </p>
                  )}
                </div>
              </div>
            </DialogBody>

            <DialogFooter className="justify-center">
              <button
                type="submit"
                // className="w-[50vw] md:w-[40vw] lg:w-[15vw] bg-[#003061] border-[#003061] border p-2 rounded text-white font-medium hover:bg-white hover:border-[#003061]  hover:text-[#003061] transition-all"
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
                  " Save"
                )}
              </button>
            </DialogFooter>
          </form>
        </Dialog>
      </div>

      {/* ======================= Model Address ======================= */}
      <div>
        <Dialog open={open} handler={handleOpen} size="lg" className="px-4 ">
          <div className="flex items-center justify-between">
            <DialogHeader className="justify-center flex-grow text-base md:text-xl">
              {editID == -1 ? "Add New" : "Update"} Delivery Address
            </DialogHeader>
            <div>
              <IoMdClose
                className="text-2xl cursor-pointer"
                onClick={handleOpen}
              />
            </div>
          </div>

          <form
            action=""
            onSubmit={handleSubmitForm2(formAddress)}
            className=""
          >
            <DialogBody className="overflow-y-scroll h-[25rem]">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    First Name *
                  </label>
                  <br />
                  <input
                    type="text"
                    name="first_name"
                    placeholder="Enter your First Name"
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...registerForm2("first_name", { required: true })}
                  />
                  {errorsForm2.first_name && (
                    <p className="text-red-600">First Name is Required.</p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    Last Name *
                  </label>
                  <br />
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Enter your Last Name"
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...registerForm2("last_name", { required: true })}
                  />
                  {errorsForm2.last_name && (
                    <p className="text-red-600">Last Name is Required.</p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    Mobile No. *
                  </label>
                  <br />
                  <input
                    type="number"
                    name="mobile_no"
                    placeholder="Enter your Mobile No."
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...registerForm2("mobile_no", {
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
                  {errorsForm2.mobile_no && (
                    <p className="text-red-600">
                      {errorsForm2.mobile_no.message}
                    </p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    Phone No. (optional)
                  </label>
                  <br />
                  <input
                    type="number"
                    name="phone_no"
                    placeholder="Enter your Phone No."
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...registerForm2("phone_no")}
                  />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    Address Line 1 *
                  </label>
                  <br />
                  <input
                    type="text"
                    name="address"
                    placeholder="House No., Building, Street"
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...registerForm2("address", { required: true })}
                  />
                  {errorsForm2.address && (
                    <p className="text-red-600">Address is Required.</p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    Address Line 2 *
                  </label>
                  <br />
                  <input
                    type="text"
                    name="address_area"
                    placeholder="Area Name or Sector Name"
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...registerForm2("address_area", { required: true })}
                  />
                  {errorsForm2.address_area && (
                    <p className="text-red-600">Address is Required.</p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    Landmark *
                  </label>
                  <br />
                  <input
                    type="text"
                    name="landmark"
                    placeholder="Landmark"
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...registerForm2("landmark", { required: true })}
                  />
                  {errorsForm2.landmark && (
                    <p className="text-red-600">Landmark is Required.</p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1 relative">
                  <label htmlFor="" className="text-[#003061]">
                    Zipcode *
                  </label>
                  <br />
                  <input
                    type="number"
                    name="zipcode"
                    placeholder="Enter your Zipcode"
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061] "
                    {...registerForm2("zipcode", {
                      required: "Zipcode is Required.",
                      minLength: {
                        value: 6,
                        message: "Zipcode should be 6 digit.",
                      },
                      maxLength: {
                        value: 6,
                        message: "Zipcode should be 6 digit.",
                      },
                    })}
                  />
                  {pincodeLoading ? (
                    <div className="absolute top-[39px] right-4 ">
                      <i className="fa-solid fa-circle-notch fa-spin"></i>
                    </div>
                  ) : null}
                  {errorsForm2.zipcode && (
                    <p className="text-red-600">
                      {errorsForm2.zipcode.message}
                    </p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    City *
                  </label>
                  <br />
                  <select
                    name="city"
                    value={city}
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...registerForm2("city", { required: true })}
                  >
                    <option value="" selected disabled className="w-full">
                      Select City
                    </option>
                    {cities.map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
                  </select>
                  {errorsForm2.city && (
                    <p className="text-red-600">Select City.</p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    State *
                  </label>
                  <br />
                  <select
                    name="state"
                    value={state}
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...registerForm2("state", { required: true })}
                  >
                    <option value="" selected disabled className="w-full">
                      Select State
                    </option>
                    {states.map((item, index) => (
                      <option value={item.name} key={index}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {errorsForm2.state && (
                    <p className="text-red-600">Select State.</p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    Country *
                  </label>
                  <br />
                  <input
                    type="text"
                    name="country"
                    value={"India"}
                    readOnly
                    placeholder="Enter your Country"
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...registerForm2("country", { required: true })}
                  />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    Address Type *
                  </label>
                  <br />
                  <input
                    type="text"
                    name="address_name"
                    placeholder="e.g. Home or Office"
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...registerForm2("address_name", { required: true })}
                  />
                  {errorsForm2.address_name && (
                    <p className="text-red-600">Address Type is Required.</p>
                  )}
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="checkbox"
                  name="is_address_action"
                  id=""
                  {...registerForm2("is_address_action")}
                />
                <label htmlFor="" className="ps-2 text-gray-800 font-normal">
                  Set as your default address
                </label>
              </div>
            </DialogBody>

            <DialogFooter className="justify-center">
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
                  " Save Address"
                )}
              </button>
            </DialogFooter>
          </form>
        </Dialog>
      </div>
    </>
  );
}

export default PersonalDetails;

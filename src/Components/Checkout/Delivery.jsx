import React, { useEffect, useState } from "react";
import "./Checkout.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddressID,
  setAddressMethod,
  setNewAddressPaymentForm,
  successToast,
} from "../../store/Slice";
import {
  FetchAPI,
  addressGetAllAPI,
  addressRegisterAPI,
  addressUpdateAPI,
  pincodeAPI,
} from "../../api";
import { FaMobile } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import {
  Chip,
  Radio,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
} from "@material-tailwind/react";
import clsx from "clsx";
import { IoMdClose } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
// import pincodes from "../../pincodes.json";
import states from "../../state.json";
import cities from "../../Cities.json";

function Delivery() {
  const dispatch = useDispatch();
  const [addressDetails, setAddressDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editID, setEditID] = useState(-1);
  const { addressMethod, addressID } = useSelector((state) => state.denim);
  const [open, setOpen] = useState(false);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeData, setPincodeData] = useState([]);
  const [pincodeData2, setPincodeData2] = useState([]);
  const [addressValue, setAddressValue] = useState({});
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm();

  //Update Address Form
  const {
    register: registerForm2,
    handleSubmit: handleSubmitForm2,
    formState: { errors: errorsForm2 },
    setValue: setValue2,
    reset: reset2,
    watch: watch2,
  } = useForm();

  const zipcode = watch("zipcode");
  const city = watch("city");
  const state = watch("state");
  const zipcode2 = watch2("zipcode");
  const city2 = watch2("city");
  const state2 = watch2("state");

  //Handler of Address Model
  const handleOpen = () => {
    setOpen(!open);
    reset2();
    setEditID(-1);
    setAddressValue({});
    setValue2("city", "");
    setValue2("state", "");
  };

  const handleAdressMethod = (event) => {
    dispatch(setAddressMethod(event.target.value));
    setPincodeData([]);
  };

  //Get Address all API
  const addressDetailsData = async () => {
    setIsLoading(true);
    try {
      const { data } = await FetchAPI(addressGetAllAPI(), "post", {
        user_id: userInfo?.id,
      });
      setAddressDetails(data.Data);
      // console.log("address", addressDetails);
    } catch (error) {
      console.log("Error in addressDetails API", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    addressDetailsData();
  }, []);

  //Default Address
  const defaultAddress = addressDetails?.filter(
    (el) => el.is_address_action === "active"
  );

  //Other Address
  const otherAddress = addressDetails?.filter(
    (el) => el.is_address_action !== "active"
  );

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
        dispatch(setAddressMethod());
        dispatch(setAddressID());
        successToast("Address details added");
        reset();
      }
    } catch (error) {
      console.log("Error in address register API", error);
    } finally {
      setIsLoading(false);
    }
  };

  //Submit function for New  Address
  const formSubmit = async (formData) => {
    dispatch(setNewAddressPaymentForm(true));
    await addAddress(formData);
    addressDetailsData();
    reset2();
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
        successToast("Address details updated");
      }
    } catch (error) {
      console.log("Error in address update API", error);
    } finally {
      setIsLoading(false);
    }
  };

  //Submit function for Update Address
  const formAddress = async (formData) => {
    await updateAddress(formData);
    addressDetailsData();
    reset2();
    handleOpen();
  };

  //Pincode API function
  const pincode = async (pincode) => {
    try {
      setPincodeLoading(true);
      const { data } = await FetchAPI(pincodeAPI(), "POST", {
        pincode: pincode,
      });
      if(zipcode){
        setPincodeData(data.Data);
        }
        if(zipcode2){
        setPincodeData2(data.Data);
      }
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
      if (zipcode2?.length === 6) {
        await pincode(zipcode2);
      }
    };

    fetchPincodeData();
  }, [zipcode, zipcode2]);

  useEffect(() => {
    if (pincodeData) {
      setValue("city", pincodeData[0]?.districtName || "");
      setValue("state", pincodeData[0]?.stateName || "");
    } else {
      setValue("city", "");
      setValue("state", "");
    }
  }, [pincodeData, setValue]);

  useEffect(() => {
    if (pincodeData2) {
      setValue2("city", pincodeData2[0]?.districtName || "");
      setValue2("state", pincodeData2[0]?.stateName || "");
    } else {
      setValue2("city", "");
      setValue2("state", "");
    }
  }, [pincodeData2, setValue2]);

  return (
    <div>
      <h6 className="font-semibold text-lg text-[#1F2937]">
        Select Delivery Address
      </h6>

      {isLoading ? (
        <div className="loader-container-address">
          <span className="loader"></span>
        </div>
      ) : (
        <div>
          {/* ======================= Default address ======================= */}
          {defaultAddress?.length > 0 && (
            <>
              <h6 className="font-medium mt-4 text-base uppercase text-gray-700">
                Default address
              </h6>

              {defaultAddress?.map((item, index) => {
                return (
                  <div
                    className=" border border-gray-400 p-4 rounded-md mt-3"
                    key={index}
                  >
                    <div className="flex justify-between">
                      <label
                        className="flex items-center cursor-pointer"
                        onClick={() =>
                          dispatch(
                            setAddressID({
                              id: item.address_id,
                              state: item.state,
                            })
                          )
                        }
                      >
                        <div className="flex items-center">
                          <Radio
                            color="indigo"
                            name="address"
                            value="defaultAddress"
                            // defaultChecked
                            checked={addressMethod === "defaultAddress"}
                            // onClick={() => dispatch(setAddressID(item.address_id))}
                            onChange={handleAdressMethod}
                            className="accent-[#003060] cursor-pointer"
                          />
                          <div className="ps-4">
                            <div className=" text-gray-700">
                              <div className="mb-2">
                                <span className="font-semibold text-gray-800 capitalize">
                                  {item.first_name}&nbsp;
                                  {item.last_name}
                                </span>
                                <Chip
                                  className="inline-block ms-2 rounded-full"
                                  variant="outlined"
                                  value={item.address_name}
                                  color="indigo"
                                  size="sm"
                                />
                              </div>

                              <p className="break-words capitalize">
                                {item.address}
                              </p>
                              <p className="capitalize">
                                {item.city},&nbsp;
                                <span>
                                  {item.state.charAt(0).toUpperCase() +
                                    item.state.slice(1).toLowerCase()}
                                </span>
                                , {item.country}
                              </p>
                              <p>{item.zipcode}</p>
                              <div>
                                <span className="flex items-center">
                                  <FaMobile className="me-2" /> {item.mobile_no}
                                </span>
                                {item.phone_no && (
                                  <span className="flex items-center mt-1">
                                    <BsTelephoneFill className="me-2" />
                                    {item.phone_no}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>

                      <Tooltip content="Edit Address" placement="top">
                        <div
                          className="cursor-pointer"
                          onClick={() => editAddress(item)}
                        >
                          <CiEdit className="text-xl" />
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* ======================= Other address ======================= */}
          {otherAddress?.length > 0 && (
            <>
              <h6 className="font-medium mt-5 text-base uppercase text-gray-700">
                Other address
              </h6>

              {otherAddress?.map((item, index) => {
                return (
                  <div
                    className=" border border-gray-400 p-4 rounded-md mt-3"
                    key={index}
                  >
                    <div className="flex justify-between">
                      <label
                        className="flex items-center cursor-pointer"
                        onClick={() =>
                          dispatch(
                            setAddressID({
                              id: item.address_id,
                              state: item.state,
                            })
                          )
                        }
                      >
                        <div className="flex items-center">
                          <Radio
                            color="indigo"
                            name="address"
                            value={item.address_id}
                            checked={addressMethod === item.address_id}
                            // onClick={() => dispatch(setAddressID(item.address_id))}
                            onChange={handleAdressMethod}
                            className="accent-[#003060] cursor-pointer"
                          />
                          <div className="ps-4">
                            <div className=" text-gray-700">
                              <div className="mb-2">
                                <span className="font-semibold text-gray-800 capitalize">
                                  {item.first_name}&nbsp;
                                  {item.last_name}
                                </span>
                                <Chip
                                  className="inline-block ms-2 rounded-full"
                                  variant="outlined"
                                  value={item.address_name}
                                  color="indigo"
                                  size="sm"
                                />
                              </div>
                              <p className="break-words capitalize">
                                {item.address}
                              </p>
                              <p className="capitalize">
                                {item.city},&nbsp;
                                <span>
                                  {item.state.charAt(0).toUpperCase() +
                                    item.state.slice(1).toLowerCase()}
                                </span>
                                , {item.country}
                              </p>
                              <p>{item.zipcode}</p>
                              <div>
                                <span className="flex items-center">
                                  <FaMobile className="me-2" /> {item.mobile_no}
                                </span>
                                {item.phone_no && (
                                  <span className="flex items-center">
                                    <BsTelephoneFill className="me-2" />
                                    {item.phone_no}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>

                      <Tooltip content="Edit Address" placement="top">
                        <div
                          className="cursor-pointer"
                          onClick={() => editAddress(item)}
                        >
                          <CiEdit className="text-xl" />
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* ======================= Add new address ======================= */}
          <div className=" border border-gray-400 p-4 rounded-md mt-4">
            <label className="flex items-center cursor-pointer">
              <div className="flex items-center">
                <Radio
                  color="indigo"
                  name="address"
                  value="newAddress"
                  checked={addressMethod === "newAddress"}
                  onChange={handleAdressMethod}
                  className="accent-[#003060] cursor-pointer"
                />
                <div className="ps-4">
                  <label htmlFor="" className="font-medium">
                    Add a New Address
                  </label>
                </div>
              </div>
            </label>

            {/* ======================= Add new address Form ======================= */}
            {addressMethod === "newAddress" && (
              <form
                action=""
                onSubmit={handleSubmit(formSubmit)}
                className="mt-4"
              >
                <hr className="h-[2px] bg-gray-400" />
                <h6 className="font-semibold text-lg text-[#1F2937] mt-6">
                  Enter Your Details
                </h6>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="">
                    <label htmlFor="" className="text-[#003061]">
                      First Name *
                    </label>
                    <br />
                    <input
                      type="text"
                      name="first_name"
                      placeholder="Enter your First Name"
                      className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                      {...register("first_name", { required: true })}
                    />
                    {errors.first_name && (
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
                      placeholder="Enter your Last Name"
                      className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                      {...register("last_name", { required: true })}
                    />
                    {errors.last_name && (
                      <p className="text-red-600">Last Name is Required.</p>
                    )}
                  </div>

                  <div className="">
                    <label htmlFor="" className="text-[#003061]">
                      Mobile No. *
                    </label>
                    <br />
                    <input
                      type="number"
                      name="mobile_no"
                      placeholder="Enter your Mobile No."
                      className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                      {...register("mobile_no", {
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
                    {errors.mobile_no && (
                      <p className="text-red-600">{errors.mobile_no.message}</p>
                    )}
                  </div>

                  <div className="">
                    <label htmlFor="" className="text-[#003061]">
                      Phone No. (optional)
                    </label>
                    <br />
                    <input
                      type="number"
                      name="phone_no"
                      placeholder="Enter your Mobile No."
                      className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                      {...register("phone_no")}
                    />
                  </div>
                </div>

                {/* ======================= Enter your Address Form ======================= */}
                <h6 className="font-semibold text-lg text-[#1F2937] mt-6">
                  Enter Your Address
                </h6>
                <div className="grid grid-cols-2 gap-4 mt-2">
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
                      {...register("address", { required: true })}
                    />
                    {errors.address && (
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
                      {...register("address_area", { required: true })}
                    />
                    {errors.address_area && (
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
                      {...register("landmark", { required: true })}
                    />
                    {errors.landmark && (
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
                      className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                      // {...registerForm2("zipcode", { required: true })}
                      {...register("zipcode", {
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
                    {errors.zipcode && (
                      <p className="text-red-600">{errors.zipcode.message}</p>
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
                      {...register("city", { required: "Select City." })}
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
                    {errors.city && (
                      <p className="text-red-600">{errors.city.message}</p>
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
                      {...register("state", { required: true })}
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
                    {errors.state && (
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
                      {...register("country", { required: true })}
                    />
                    {errors.country && (
                      <p className="text-red-600">Country is Required.</p>
                    )}
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
                      {...register("address_name", { required: true })}
                    />
                    {errors.address_name && (
                      <p className="text-red-600">Address Type is Required.</p>
                    )}
                  </div>
                </div>
                {/* <div className="mt-4">
                <label className="text-sm text-gray-500 align-middle">
                  <Controller
                    control={control}
                    name="terms"
                    defaultValue={false}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        {...field}
                        className="me-2 align-middle"
                      />
                    )}
                  />
                  I have read and understand the{" "}
                  <span className="text-gray-700 font-semibold">
                    {" "}
                    Terms & Conditions{" "}
                  </span>{" "}
                  &{" "}
                  <span className="text-gray-700 font-semibold">
                    {" "}
                    Privacy Policy*{" "}
                  </span>
                </label>
              </div> */}

                <div className="mt-8 text-center">
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
                        <i className="fa-solid fa-circle-notch fa-spin"></i>{" "}
                        Wait
                      </>
                    ) : (
                      " Save Address"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ======================= Model Address ======================= */}
      <div>
        <Dialog open={open} handler={handleOpen} size="lg" className="px-4 ">
          <div className="flex items-center justify-between">
            <DialogHeader className="justify-center flex-grow text-base md:text-xl">
              Update Delivery Address
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
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    // {...registerForm2("zipcode", { required: true })}
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
                    value={city2}
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
                    <p className="text-red-600">Town/City is Required.</p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    State *
                  </label>
                  <br />
                  <select
                    name="state"
                    value={state2}
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...registerForm2("state", { required: true })}
                  >
                    <option value="" disabled className="w-full">
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
                  {errorsForm2.country && (
                    <p className="text-red-600">Country is Required.</p>
                  )}
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
                    <p className="text-red-600">Name is Required.</p>
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
    </div>
  );
}

export default Delivery;

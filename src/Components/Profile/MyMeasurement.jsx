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
} from "@material-tailwind/react";
import {
  FetchAPI,
  measurmentGetAllAPI,
  measurmentDeleteAPI,
  measurmentRegisterAPI,
  measurmentUpdateAPI,
} from "../../api";
import { useSelector } from "react-redux";
import { successToast } from "../../store/Slice";

function MyMeasurement() {
  const [measurementData, setMeasurementData] = useState([]);
  const [measurementIndex, setMeasurementIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editID, setEditID] = useState(-1);
  const [measurementValue, setMeasurementValue] = useState({});
  // const { userInfo } = useSelector((state) => state.API);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  //Handler of Measurement Model
  const handleOpen = () => {
    setOpen(!open);
    if (editID !== -1) {
      reset();
    }
    setEditID(-1);
    setMeasurementValue({});
  };

  //Post Measurement profile
  const addMeasurement = async (formData) => {
    setIsLoading(true);
    try {
      formData.user_id = userInfo.id;
      formData.measurment_profile_action = "active";
      const { data } = await FetchAPI(
        measurmentRegisterAPI(),
        "POST",
        formData
      );
      console.log(data);

      if (data.Message === "Measurment Profile is Added") {
       successToast('Measurment Profile is Added')
      }
    } catch (error) {
      console.log("Error in Measurement register API", error);
    } finally {
      setIsLoading(false);
    }
  };

  //Update Measurement API
  const updateMeasurement = async (formData) => {
    setIsLoading(true);
    try {
      formData.user_id = userInfo.id;
      formData.measurment_profile_id = editID;
      // formData.measurment_profile_action = "active"
      const { data } = await FetchAPI(measurmentUpdateAPI(), "PATCH", formData);
      console.log(data, "update");

      if (data.Message === "Measurment Profile is Updated") {
        successToast('Measurment Profile is Updated')
      }
    } catch (error) {
      console.log("Error in measurement update API", error);
    } finally {
      setIsLoading(false);
    }
  };

  //Submit function for New or Update Measurement
  const formMeasurement = async (formData) => {
    if (editID == -1) {
      await addMeasurement(formData);
    } else {
      await updateMeasurement(formData);
    }
    measurmentGetAll();
    reset();
    handleOpen();
  };

  //Edit Measurement
  const editMeasurement = async (item) => {
    handleOpen();
    setEditID(item.measurment_profile_id);
    setMeasurementValue(item);
  };
  // Use useEffect to set form values when oldData changes
  useEffect(() => {
    if (measurementValue) {
      Object.keys(measurementValue).forEach((key) => {
        setValue(key, measurementValue[key]);
      });
    }
  }, [measurementValue, setValue]);

  //Get Measurement all API
  const measurmentGetAll = async () => {
    setIsLoading(true);
    try {
      const { data } = await FetchAPI(measurmentGetAllAPI(), "post", {
        user_id: userInfo.id,
      });
      setMeasurementData(data.Data);
      console.log("measurement", data.Data);
    } catch (error) {
      console.log("Error in measurementData API", error);
    } finally {
      setIsLoading(false);
    }
  };
  // console.log("measurementData", measurementData);

  useEffect(() => {
    measurmentGetAll();
  }, []);

  //Delete Measurement API
  const deleteMeasurement = async (measurementID, index) => {
    try {
      setMeasurementIndex(index);
      const { data } = await FetchAPI(measurmentDeleteAPI(), "DELETE", {
        measurment_profile_id: measurementID,
        user_id: userInfo.id,
      });
      console.log(data);
      if (data.Message === "Measurment Profile is Delete successfully") {
        successToast('Measurment Profile is Deleted')
      }
      measurmentGetAll();
    } catch (error) {
      console.log("Error in measurement delete API", error);
    } finally {
      setMeasurementIndex(null);
    }
  };

  return (
    <div>
      <div>
        {/* ======================= Heading ======================= */}
        <div className="text-center">
          <h4 className="text-gray-800 text-lg font-semibold">
            My Measurement
          </h4>
          <p className="text-gray-500 text-sm md:text-base md:w-[90%] xl:w-[80%] mx-auto mt-2">
            "MY MEASUREMENT" ensures the perfect fit. Accurate measurements are
            key for tailored garments. Utilize a measuring tape, ensuring
            precision in chest, waist, and hip dimensions. These measurements
            guarantee clothing that complements your unique body shape and size.
          </p>
        </div>

        {/* ======================= Measurement ======================= */}

        {isLoading ? (
          <div className="loader-container-address">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {measurementData?.length > 0 ? (
              measurementData?.map((item, index) => {
                return (
                  <div
                    className="border border-gray-300 px-6 py-4 rounded-md"
                    key={index}
                  >
                    <div className="flex justify-between items-center">
                      <h6 className="capitalize">{item.for_name}</h6>
                      <div className="flex">
                        <div
                          className="cursor-pointer"
                          onClick={() => editMeasurement(item)}
                        >
                          <CiEdit className="text-xl" />
                        </div>
                        {measurementIndex === index ? (
                          <i className="fa-solid fa-circle-notch fa-spin"></i>
                        ) : (
                          <div
                            className="ps-2 cursor-pointer"
                            onClick={() =>
                              deleteMeasurement(
                                item.measurment_profile_id,
                                index
                              )
                            }
                          >
                            <IoMdClose className="text-xl" />
                          </div>
                        )}
                      </div>
                    </div>
                    <h6 className="text-gray-600 mt-1">
                      Profile Name:
                      <span className="text-gray-800 capitalize">
                        {item.profilename}
                      </span>
                    </h6>

                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-1 mt-5">
                      <div className="text-gray-600">
                        Height:
                        <span className="text-gray-800 font-medium">
                          {item.hight} cm
                        </span>
                      </div>
                      <div className="text-gray-600">
                        Weight:
                        <span className="text-gray-800 font-medium">
                          {item.weight} kg
                        </span>
                      </div>
                      <div className="text-gray-600">
                        Waist:
                        <span className="text-gray-800 font-medium">
                          {item.waist} cm
                        </span>
                      </div>
                      <div className="text-gray-600">
                        Hips:
                        <span className="text-gray-800 font-medium">
                          {item.seat} cm
                        </span>
                      </div>
                      <div className="text-gray-600">
                        Crotch:
                        <span className="text-gray-800 font-medium">
                          {item.crotch} cm
                        </span>
                      </div>
                      <div className="text-gray-600">
                        Length:
                        <span className="text-gray-800 font-medium">
                          {item.length} cm
                        </span>
                      </div>
                      <div className="text-gray-600">
                        Thigh:
                        <span className="text-gray-800 font-medium">
                          {item.things} cm
                        </span>
                      </div>
                      <div className="text-gray-600">
                        Knee:
                        <span className="text-gray-800 font-medium">
                          {item.knee} cm
                        </span>
                      </div>
                      <div className="text-gray-600">
                        Ankle:
                        <span className="text-gray-800 font-medium">
                          {item.ankle} cm
                        </span>
                      </div>
                      <div className="text-gray-600">
                        Fit:
                        <span className="text-gray-800 font-medium capitalize">
                          {item.fit}
                        </span>
                      </div>

                      <div className="text-gray-600">
                        Rise:
                        <span className="text-gray-800 font-medium capitalize">
                          {item.rise}
                        </span>
                      </div>
                      <div className="text-gray-600 col-span-2">
                        Fit Requirement:
                        <span className="text-gray-800 font-medium capitalize">
                          {item.fitrequiment}
                        </span>
                      </div>
                    </div>
                    {/* <div className="underline mt-3 cursor-pointer">
                  Set as your default Measurement
                </div> */}
                  </div>
                );
              })
            ) : (
              <div className="h-[5rem] flex justify-center items-center text-center">
                <p className="text-gray-600 text-xl md:text-2xl">
                  No Saved Measurement
                </p>
              </div>
            )}

            <div className="border border-gray-300 p-4 rounded-md flex items-center justify-center ">
              <div
                className="flex items-center cursor-pointer"
                onClick={handleOpen}
              >
                <IoIosAddCircleOutline />
                <span className="ps-2">Add a Measurement</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ======================= Dialog ======================= */}
      <div>
        <Dialog open={open} handler={handleOpen} size="lg" className="px-4 ">
          <div className="flex items-center justify-between">
            <DialogHeader className="justify-center flex-grow text-base md:text-xl">
              {editID == -1 ? "Add New" : "Update"} Measurement
            </DialogHeader>
            <div>
              <IoMdClose
                className="text-2xl cursor-pointer"
                onClick={handleOpen}
              />
            </div>
          </div>

          <form action="" onSubmit={handleSubmit(formMeasurement)} className="">
            <DialogBody className="overflow-y-scroll h-[25rem]">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    Measurement NickName *
                  </label>
                  <br />
                  <input
                    type="text"
                    name="for_name"
                    placeholder="Enter your Name"
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...register("for_name", { required: true })}
                  />
                  {errors.for_name && (
                    <p className="text-red-600">Name is Required.</p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    Gender *
                  </label>
                  <br />
                  <select
                    name="gender"
                    id=""
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...register("gender", { required: true })}
                  >
                    <option value="" disabled selected className="w-full">
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-600">Select Gender.</p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    Height *
                  </label>
                  <br />
                  <input
                    type="text"
                    name="hight"
                    placeholder="Enter your Height"
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...register("hight", {
                      required: "Height is Required.",
                      pattern: {
                        value: /^[0-9]+(\.[0-9]+)?$/,
                        message: "Only numeric values are allowed.",
                      },
                    })}
                  />
                  {errors.hight && (
                    <p className="text-red-600">{errors.hight.message}</p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    Weight *
                  </label>
                  <br />
                  <input
                    type="text"
                    name="weight"
                    placeholder="Enter your Weight"
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...register("weight", {
                      required: "Weight is Required.",
                      pattern: {
                        value: /^[0-9]+(\.[0-9]+)?$/,
                        message: "Only numeric values are allowed.",
                      },
                    })}
                  />
                  {errors.weight && (
                    <p className="text-red-600">{errors.weight.message}</p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    Leg Length *
                  </label>
                  <br />
                  <input
                    type="text"
                    name="length"
                    placeholder="Enter your Leg Length"
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...register("length", {
                      required: "Leg Length is Required.",
                      pattern: {
                        value: /^[0-9]+(\.[0-9]+)?$/,
                        message: "Only numeric values are allowed.",
                      },
                    })}
                  />
                  {errors.length && (
                    <p className="text-red-600">{errors.length.message}</p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    Pant Waist *
                  </label>
                  <br />
                  <input
                    type="text"
                    name="waist"
                    placeholder="Enter your Pant Waist"
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...register("waist", {
                      required: "Pant Waist is Required.",
                      pattern: {
                        value: /^[0-9]+(\.[0-9]+)?$/,
                        message: "Only numeric values are allowed.",
                      },
                    })}
                  />
                  {errors.waist && (
                    <p className="text-red-600">{errors.waist.message}</p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    Hips *
                  </label>
                  <br />
                  <input
                    type="text"
                    name="seat"
                    placeholder="Enter your Hips"
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...register("seat", {
                      required: "Hips is Required.",
                      pattern: {
                        value: /^[0-9]+(\.[0-9]+)?$/,
                        message: "Only numeric values are allowed.",
                      },
                    })}
                  />
                  {errors.seat && (
                    <p className="text-red-600">{errors.seat.message}</p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    Thigh *
                  </label>
                  <br />
                  <input
                    type="text"
                    name="things"
                    placeholder="Enter your Thigh"
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...register("things", {
                      required: "Thigh is Required.",
                      pattern: {
                        value: /^[0-9]+(\.[0-9]+)?$/,
                        message: "Only numeric values are allowed.",
                      },
                    })}
                  />
                  {errors.things && (
                    <p className="text-red-600">{errors.things.message}</p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    Crotch *
                  </label>
                  <br />
                  <input
                    type="text"
                    name="crotch"
                    placeholder="Enter your crotch"
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...register("crotch", {
                      required: "crotch is Required.",
                      pattern: {
                        value: /^[0-9]+(\.[0-9]+)?$/,
                        message: "Only numeric values are allowed.",
                      },
                    })}
                  />
                  {errors.crotch && (
                    <p className="text-red-600">{errors.crotch.message}</p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    Knee *
                  </label>
                  <br />
                  <input
                    type="text"
                    name="knee"
                    placeholder="Enter your Knee"
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...register("knee", {
                      required: "Knee is Required.",
                      pattern: {
                        value: /^[0-9]+(\.[0-9]+)?$/,
                        message: "Only numeric values are allowed.",
                      },
                    })}
                  />
                  {errors.knee && (
                    <p className="text-red-600">{errors.knee.message}</p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    Ankle *
                  </label>
                  <br />
                  <input
                    type="text"
                    name="ankle"
                    placeholder="Enter your Ankle"
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...register("ankle", {
                      required: "Ankle is Required.",
                      pattern: {
                        value: /^[0-9]+(\.[0-9]+)?$/,
                        message: "Only numeric values are allowed.",
                      },
                    })}
                  />
                  {errors.ankle && (
                    <p className="text-red-600">{errors.ankle.message}</p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    Fit *
                  </label>
                  <br />
                  <select
                    name="fit"
                    id=""
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...register("fit", { required: true })}
                  >
                    <option value="" disabled selected className="w-full">
                      Select Fit
                    </option>
                    <option value="skinny">Skinny</option>
                    <option value="slim">Slim</option>
                    <option value="relaxed">Relaxed</option>
                    <option value="regular">Regular</option>
                    <option value="loose">Loose</option>
                  </select>
                  {errors.fit && (
                    <p className="text-red-600">Select one option.</p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    Rise *
                  </label>
                  <br />
                  <select
                    name="rise"
                    id=""
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...register("rise", { required: true })}
                  >
                    <option value="" disabled selected className="w-full">
                      Select Rise
                    </option>
                    <option value="highrise">High Rise</option>
                    <option value="midrise">Mid Rise</option>
                    <option value="lowrise">Low Rise</option>
                    <option value="lowcrotch">Low Crotch</option>
                  </select>
                  {errors.rise && (
                    <p className="text-red-600">Select one option.</p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    Fit Requirement *
                  </label>
                  <br />
                  <input
                    type="text"
                    name="fitrequiment"
                    placeholder="Enter your Name"
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...register("fitrequiment", { required: true })}
                  />
                  {errors.fitrequiment && (
                    <p className="text-red-600">Fit Requiment is Required.</p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="" className="text-[#003061]">
                    Profile Name *
                  </label>
                  <br />
                  <input
                    type="text"
                    name="profilename"
                    placeholder="Enter your Name"
                    className="w-full p-2 rounded-md border-gray-300 border mt-1 focus:outline-none text-[#003061]"
                    {...register("profilename", { required: true })}
                  />
                  {errors.profilename && (
                    <p className="text-red-600">Profile Name is Required.</p>
                  )}
                </div>
              </div>
              {/* <div className="mt-2">
                <input type="checkbox" name="" id="" />
                <label htmlFor="" className="ps-2 text-gray-800 font-normal">
                  Set as your default Measurement
                </label>
              </div> */}
            </DialogBody>

            <DialogFooter className="justify-center flex-col">
              <button
                type="submit"
                className="w-[50vw] md:w-[40vw] lg:w-[15vw] bg-[#003061] border-[#003061] border p-2 rounded text-white font-medium hover:bg-white hover:border-[#003061]  hover:text-[#003061] transition-all"
              >
                Save Measurement
              </button>
              {/* <div className="underline mt-3 cursor-pointer text-gray-600 font-medium">
                Size guide
              </div> */}
            </DialogFooter>
          </form>
        </Dialog>
      </div>
    </div>
  );
}

export default MyMeasurement;

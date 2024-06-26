import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { GoPlus } from "react-icons/go";
import { GoDash } from "react-icons/go";
import { Squash as Hamburger } from "hamburger-react";
import {
  fitOptionAPI,
  FetchAPI,
  lengthOptionAPI,
  cuffOptionAPI,
  flyOptionAPI,
  frontPocketOptionAPI,
  backPocketOptionAPI,
  finishingOptionAPI,
  fabricsOptionAPI,
  monogramOptionAPI,
  threadOptionAPI,
  buttonOptionAPI,
  brandbackpatchOptionAPI,
} from "../../api";
import { useDispatch, useSelector } from "react-redux";

function CustomisationList() {
  const [openSections, setOpenSections] = useState([]);
  const [fitOption, setFitOption] = useState([]);
  const [lengthOption, setLengthOption] = useState([]);
  const [cuffOption, setCuffOption] = useState([]);
  const [flyOption, setFlyOption] = useState([]);
  const [frontPocketOption, setFrontPocketOption] = useState([]);
  const [backPocketOption, setBackPocketOption] = useState([]);
  const [finishingOption, setFinishingOption] = useState([]);
  const [fabricsOption, setFabricsOption] = useState([]);
  const [monogramOption, setMonogramOption] = useState([]);
  const [threadOption, setThreadOption] = useState([]);
  const [buttonOption, setButtonOption] = useState([]);
  const [brandbackpatchOption, setBrandbackpatchOption] = useState([]);
  const [loading, setLoading] = useState(true);
  const { imgBaseURL } = useSelector((state) => state.denim);


  const handleOpen = (index) => {
    setOpenSections((prevOpenSections) => {
      if (prevOpenSections.includes(index)) {
        // If the section is already open, close it
        return prevOpenSections.filter((item) => item !== index);
      } else {
        // If the section is closed, open it
        return [...prevOpenSections, index];
      }
    });
  };

  const fitOptionData = async () => {
    try {
      const { data } = await FetchAPI(fitOptionAPI(), "post");
      setFitOption(data.Data);
      console.log(fitOption);
    } catch (error) {
      console.log("Error in fitOption API", error);
    }
  };
  const lengthOptionData = async () => {
    try {
      const { data } = await FetchAPI(lengthOptionAPI(), "post");
      setLengthOption(data.Data);
      console.log(lengthOption);
    } catch (error) {
      console.log("Error in lengthOption API", error);
    }
  };
  const cuffOptionData = async () => {
    try {
      const { data } = await FetchAPI(cuffOptionAPI(), "post");
      setCuffOption(data.Data);
      console.log(cuffOption);
    } catch (error) {
      console.log("Error in cuffOption API", error);
    }
  };
  const flyOptionData = async () => {
    try {
      const { data } = await FetchAPI(flyOptionAPI(), "post");
      setFlyOption(data.Data);
      console.log(flyOption);
    } catch (error) {
      console.log("Error in flyOption API", error);
    }
  };
  const frontPocketOptionData = async () => {
    try {
      const { data } = await FetchAPI(frontPocketOptionAPI(), "post");
      setFrontPocketOption(data.Data);
      console.log(frontPocketOption);
    } catch (error) {
      console.log("Error in frontPocketOption API", error);
    }
  };
  const backPocketOptionData = async () => {
    try {
      const { data } = await FetchAPI(backPocketOptionAPI(), "post");
      setBackPocketOption(data.Data);
      console.log(backPocketOption);
    } catch (error) {
      console.log("Error in backPocketOption API", error);
    }
  };
  const finishingOptionData = async () => {
    try {
      const { data } = await FetchAPI(finishingOptionAPI(), "post");
      setFinishingOption(data.Data);
      console.log(finishingOption);
    } catch (error) {
      console.log("Error in finishingOption API", error);
    }
  };
  const fabricsOptionData = async () => {
    try {
      const { data } = await FetchAPI(fabricsOptionAPI(), "post");
      setFabricsOption(data.Data);
      console.log(fabricsOption);
    } catch (error) {
      console.log("Error in fabricsOption API", error);
    }
  };
  const monogramOptionData = async () => {
    try {
      const { data } = await FetchAPI(monogramOptionAPI(), "post");
      setMonogramOption(data.Data);
      console.log(monogramOption);
    } catch (error) {
      console.log("Error in monogramOption API", error);
    }
  };
  const threadOptionData = async () => {
    try {
      const { data } = await FetchAPI(threadOptionAPI(), "post");
      setThreadOption(data.Data);
      console.log(threadOption);
    } catch (error) {
      console.log("Error in threadOption API", error);
    }
  };
  const buttonOptionData = async () => {
    try {
      const { data } = await FetchAPI(buttonOptionAPI(), "post");
      setButtonOption(data.Data);
      console.log(buttonOption);
    } catch (error) {
      console.log("Error in buttonOption API", error);
    }
  };
  const brandbackpatchOptionData = async () => {
    try {
      const { data } = await FetchAPI(brandbackpatchOptionAPI(), "post");
      setBrandbackpatchOption(data.Data);
      console.log(brandbackpatchOption);
    } catch (error) {
      console.log("Error in brandbackpatchOption API", error);
    }
  };

  useEffect(() => {
    Promise.all([
      fitOptionData(),
      lengthOptionData(),
      cuffOptionData(),
      flyOptionData(),
      frontPocketOptionData(),
      backPocketOptionData(),
      finishingOptionData(),
      fabricsOptionData(),
      monogramOptionData(),
      threadOptionData(),
      buttonOptionData(),
      brandbackpatchOptionData(),
    ])
      .then(() => {
        setLoading(false); // Set loading to false once all API calls are successful
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // In case of an error, also set loading to false
      });
  }, []);

  function getThreadColor(description) {
    switch (description) {
      case "#885c20":
        return "bg-[#885c20]";
      case "#f7f4ee":
        return "bg-[#f7f4ee]";
      case "#71594f":
        return "bg-[#71594f]";
      case "#4b4b4b":
        return "bg-[#4b4b4b]";
      case "#474f68":
        return "bg-[#474f68]";
      case "#151515":
        return "bg-[#151515]";
      case "#9fa6c7":
        return "bg-[#9fa6c7]";
    }
  }

  return (
    <>
      {loading ? (
        <div className="loader-container-customisation">
          <span className="loader"></span>
        </div>
      ) : (
        <div>
          <Accordion
            open={openSections.includes(1)}
            icon={<Icon id={1} openSections={openSections} />}
          >
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="text-gray-600 font-normal"
            >
              Fit Option
            </AccordionHeader>
            <AccordionBody>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {fitOption?.map((item, index) => {
                  return (
                    <div className="relative" key={index}>
                      <input
                        type="radio"
                        className=" h-[125px] w-full cursor-pointer appearance-none rounded-md transition-all border-gray-200 border-2 checked:border-[#3B82F6] checked:border-[2px]"
                        name="fit-option"
                      />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] pointer-events-none">
                        <img
                          src={`${imgBaseURL}${item.fit_image_1}`}
                          alt=""
                          className="h-[80px] w-auto"
                        />
                      </div>
                      <div className="text-[#374151] font-medium text-center">
                        {item.fit_heading}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionBody>
          </Accordion>

          <Accordion
            open={openSections.includes(2)}
            icon={<Icon id={2} openSections={openSections} />}
          >
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="text-gray-600 font-normal"
            >
              Length Option
            </AccordionHeader>
            <AccordionBody>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {lengthOption?.map((item, index) => {
                  return (
                    <div className="relative" key={index}>
                      <input
                        type="radio"
                        className=" h-[100px] w-full cursor-pointer appearance-none rounded-md transition-all border-gray-200 border-2 checked:border-[#3B82F6] checked:border-[2px]"
                        name="length-option"
                      />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] pointer-events-none">
                        <img
                          src={`${imgBaseURL}${item.length_image_1}`}
                          alt=""
                          className="w-full h-auto scale-125 md:scale-150"
                        />
                      </div>
                      <div className="text-[#374151] font-medium text-center">
                        {item.length_heading}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionBody>
          </Accordion>

          <Accordion
            open={openSections.includes(3)}
            icon={<Icon id={3} openSections={openSections} />}
          >
            <AccordionHeader
              onClick={() => handleOpen(3)}
              className="text-gray-600 font-normal"
            >
              Cuffs Option
            </AccordionHeader>
            <AccordionBody>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cuffOption?.map((item, index) => {
                  return (
                    <div className="relative" key={index}>
                      <input
                        type="radio"
                        className=" h-[100px] w-full cursor-pointer appearance-none rounded-md transition-all border-gray-200 border-2 checked:border-[#3B82F6] checked:border-[2px]"
                        name="length-option"
                      />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] pointer-events-none">
                        <img
                          src={`${imgBaseURL}${item.cuffs_image_1}`}
                          alt=""
                          className="w-full h-auto md:scale-125 "
                        />
                      </div>
                      <div className="text-[#374151] font-medium text-center">
                        {item.cuffs_name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionBody>
          </Accordion>

          <Accordion
            open={openSections.includes(4)}
            icon={<Icon id={4} openSections={openSections} />}
          >
            <AccordionHeader
              onClick={() => handleOpen(4)}
              className="text-gray-600 font-normal"
            >
              Fly Option
            </AccordionHeader>
            <AccordionBody>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {flyOption?.map((item, index) => {
                  return (
                    <div className="relative" key={index}>
                      <input
                        type="radio"
                        className=" h-[100px] w-full cursor-pointer appearance-none rounded-md transition-all border-gray-200 border-2 checked:border-[#3B82F6] checked:border-[2px]"
                        name="length-option"
                      />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] pointer-events-none">
                        <img
                          src={`${imgBaseURL}${item.fly_image_1}`}
                          alt=""
                          className="w-full h-auto md:scale-125"
                        />
                      </div>
                      <div className="text-[#374151] font-medium text-center">
                        {item.fly_name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionBody>
          </Accordion>

          <Accordion
            open={openSections.includes(5)}
            icon={<Icon id={5} openSections={openSections} />}
          >
            <AccordionHeader
              onClick={() => handleOpen(5)}
              className="text-gray-600 font-normal"
            >
              Front Pockets Option
            </AccordionHeader>
            <AccordionBody>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {frontPocketOption?.map((item, index) => {
                  return (
                    <div className="relative" key={index}>
                      <input
                        type="radio"
                        className=" h-[100px] w-full cursor-pointer appearance-none rounded-md transition-all border-gray-200 border-2 checked:border-[#3B82F6] checked:border-[2px]"
                        name="length-option"
                      />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] pointer-events-none">
                        <img
                          src={`${imgBaseURL}${item.front_pocket_image_1}`}
                          alt=""
                          className="w-full h-auto md:scale-125"
                        />
                      </div>
                      <div className="text-[#374151] font-medium text-center">
                        {item.front_pocket_name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionBody>
          </Accordion>

          <Accordion
            open={openSections.includes(6)}
            icon={<Icon id={6} openSections={openSections} />}
          >
            <AccordionHeader
              onClick={() => handleOpen(6)}
              className="text-gray-600 font-normal"
            >
              Back Pockets Option
            </AccordionHeader>
            <AccordionBody>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {backPocketOption?.map((item, index) => {
                  return (
                    <div className="relative" key={index}>
                      <input
                        type="radio"
                        className=" h-[100px] w-full cursor-pointer appearance-none rounded-md transition-all border-gray-200 border-2 checked:border-[#3B82F6] checked:border-[2px]"
                        name="length-option"
                      />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] pointer-events-none">
                        <img
                          src={`${imgBaseURL}${item.back_pocket_image_1}`}
                          alt=""
                          className="w-full h-auto md:scale-125 "
                        />
                      </div>
                      <div className="text-[#374151] font-medium text-center">
                        {item.back_pocket_name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionBody>
          </Accordion>

          <Accordion
            open={openSections.includes(7)}
            icon={<Icon id={7} openSections={openSections} />}
          >
            <AccordionHeader
              onClick={() => handleOpen(7)}
              className="text-gray-600 font-normal"
            >
              Finishing Option
            </AccordionHeader>
            <AccordionBody>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {finishingOption?.map((item, index) => {
                  return (
                    <div className="relative" key={index}>
                      <input
                        type="radio"
                        className=" h-[100px] w-full cursor-pointer appearance-none rounded-md transition-all border-gray-200 border-2 checked:border-[#3B82F6] checked:border-[2px]"
                        name="length-option"
                      />
                      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <img
                          src={`${imgBaseURL}${item.finishing_image_1}`}
                          alt=""
                          className="w-full h-auto md:scale-125"
                        />
                      </div>
                      <div className="text-[#374151] font-medium text-center">
                        {item.finishing_name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionBody>
          </Accordion>

          <Accordion
            open={openSections.includes(8)}
            icon={<Icon id={8} openSections={openSections} />}
          >
            <AccordionHeader
              onClick={() => handleOpen(8)}
              className="text-gray-600 font-normal"
            >
              Fabrics Option
            </AccordionHeader>
            <AccordionBody>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {fabricsOption?.map((item, index) => {
                  return (
                    <div className="relative" key={index}>
                      <input
                        type="radio"
                        className=" h-[90px] w-full cursor-pointer appearance-none rounded-md transition-all border-gray-200 border-2 checked:border-[#3B82F6] checked:border-[2px] overflow-hidden"
                        name="length-option"
                      />
                      <div className="absolute top-[33%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[70%] h-[45%]">
                        <img
                          src={`${imgBaseURL}${item.fabrics_image_1}`}
                          alt=""
                          className="w-full h-full scale-125"
                        />
                      </div>
                      <div className="text-[#374151] font-medium text-center">
                        {item.fabrics_name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionBody>
          </Accordion>

          <Accordion
            open={openSections.includes(9)}
            icon={<Icon id={9} openSections={openSections} />}
          >
            <AccordionHeader
              onClick={() => handleOpen(9)}
              className="text-gray-600 font-normal"
            >
              Monogram
            </AccordionHeader>
            <AccordionBody>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {monogramOption?.map((item, index) => {
                  return (
                    <div className="relative" key={index}>
                      <input
                        type="radio"
                        className=" h-[100px] w-full cursor-pointer appearance-none rounded-md transition-all border-gray-200 border-2 checked:border-[#3B82F6] checked:border-[2px]"
                        name="length-option"
                      />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] pointer-events-none">
                        <img
                          src={`${imgBaseURL}${item.monogram_image_1}`}
                          alt=""
                          className="w-full h-auto md:scale-125"
                        />
                      </div>
                      <div className="text-[#374151] font-medium text-center">
                        {item.monogram_name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionBody>
          </Accordion>

          <Accordion
            open={openSections.includes(10)}
            icon={<Icon id={10} openSections={openSections} />}
          >
            <AccordionHeader
              onClick={() => handleOpen(10)}
              className="text-gray-600 font-normal"
            >
              Snitiching Thread Color
            </AccordionHeader>
            <AccordionBody>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {threadOption?.map((item, index) => {
                  return (
                    <div className="relative" key={index}>
                      <input
                        type="radio"
                        className=" h-[80px] w-full cursor-pointer appearance-none rounded-md transition-all border-gray-200 border-2 checked:border-[#3B82F6] checked:border-[2px] "
                        name="length-option"
                      />
                      <div className="absolute top-[39%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none ">
                        <div
                          className={`w-[60px] h-[60px] rounded-full ${getThreadColor(
                            item.thread_description
                          )}`}
                        ></div>
                      </div>
                      <div className="text-[#374151] font-medium text-center">
                        {item.thread_name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionBody>
          </Accordion>

          <Accordion
            open={openSections.includes(11)}
            icon={<Icon id={11} openSections={openSections} />}
          >
            <AccordionHeader
              onClick={() => handleOpen(11)}
              className="text-gray-600 font-normal"
            >
              Buttons & Rivets
            </AccordionHeader>
            <AccordionBody>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {buttonOption?.map((item, index) => {
                  return (
                    <div className="relative" key={index}>
                      <input
                        type="radio"
                        className=" h-[100px] w-full cursor-pointer appearance-none rounded-md transition-all border-gray-200 border-2 checked:border-[#3B82F6] checked:border-[2px]"
                        name="length-option"
                      />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] pointer-events-none">
                        <img
                          src={`${imgBaseURL}${item.button_image_1}`}
                          alt=""
                          className="w-full h-auto md:scale-125"
                        />
                      </div>
                      <div className="text-[#374151] font-medium text-center">
                        {item.button_name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionBody>
          </Accordion>

          <Accordion
            open={openSections.includes(12)}
            icon={<Icon id={12} openSections={openSections} />}
          >
            <AccordionHeader
              onClick={() => handleOpen(12)}
              className="text-gray-600 font-normal"
            >
              Brand Back Patch
            </AccordionHeader>
            <AccordionBody>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {brandbackpatchOption?.map((item, index) => {
                  return (
                    <div className="relative" key={index}>
                      <input
                        type="radio"
                        className=" h-[100px] w-full cursor-pointer appearance-none rounded-md transition-all border-gray-200 border-2 checked:border-[#3B82F6] checked:border-[2px]"
                        name="length-option"
                      />
                      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <img
                          src={`${imgBaseURL}${item.brandbackpatch_image_1}`}
                          alt=""
                          className="w-full h-auto scale-150"
                        />
                      </div>
                      <div className="text-[#374151] font-medium text-center">
                        {item.brandbackpatch_name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionBody>
          </Accordion>
        </div>
      )}
    </>
  );
}

function Icon({ id, openSections }) {
  return <>{openSections?.includes(id) ? <GoDash /> : <GoPlus />}</>;
}

function Customisation() {
  const [openFilter, setOpenFilter] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleWindowResize = () =>
    window.innerWidth >= 431 && setOpenFilter(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="mt-8 md:mt-0 ">
      <div className="flex items-center justify-between mb-2">
        <div className="w-full">
          <h4 className="text-gray-800 font-medium text-2xl md:mb-3">
            Customisation
          </h4>
          <hr className="bg-gray-400 h-[2px] hidden md:block" />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent md:hidden"
          ripple={false}
          onClick={() => setOpenFilter(!openFilter)}
        >
          <Hamburger toggled={openFilter} toggle={setOpenFilter} size={23} />
        </IconButton>
        <hr className="bg-gray-400 h-[2px] md:hidden block" />
      </div>

      <div className="hidden md:block customisation pe-2">
        <CustomisationList />
      </div>

      <Collapse open={openFilter}>
        <CustomisationList />
      </Collapse>
    </div>
  );
}

export default Customisation;

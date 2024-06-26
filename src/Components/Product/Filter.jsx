import React, { useEffect, useState } from "react";
import "./Product.css";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  IconButton,
  Collapse,
  Tooltip,
} from "@material-tailwind/react";
import { GoPlus } from "react-icons/go";
import { GoDash } from "react-icons/go";
import { Squash as Hamburger } from "hamburger-react";
import {
  FetchAPI,
  performanceFeatureAPI,
  productColorAPI,
  productSizeAPI,
  fabricsOptionAPI,
  productOccassionAPI,
} from "../../api";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFilters,
  setActive,
  setFilteredProducts,
  setFilters,
} from "../../store/FilterSlice";
import { BiReset } from "react-icons/bi";

function FilterList() {
  const dispatch = useDispatch();
  const [openSections, setOpenSections] = useState([]);
  const [productColor, setProductColor] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [performanceFeature, setPerformanceFeature] = useState([]);
  const [fabrics, setFabrics] = useState([]);
  const [productOccassion, setProductOccassion] = useState([]);
  const [loading, setLoading] = useState(true);
  const { imgBaseURL } = useSelector((state) => state.denim);
  const { productData } = useSelector((state) => state.API);

  const { filters, filteredProducts, active } = useSelector((state) => state.filter);

  const activeProductData = productData.filter((el) => el.is_product_action === 'active')

  // console.log(openSections);
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

  const productColorData = async () => {
    try {
      const { data } = await FetchAPI(productColorAPI(), "post");
      setProductColor(data.Data);
      console.log(productColor);
    } catch (error) {
      console.log("Error in ProductColor API", error);
    }
  };
  const productSizeData = async () => {
    try {
      const { data } = await FetchAPI(productSizeAPI(), "post");
      setProductSize(data.Data);
      console.log(productSize);
    } catch (error) {
      console.log("Error in productSize API", error);
    }
  };
  const performanceFeatureData = async () => {
    try {
      const { data } = await FetchAPI(performanceFeatureAPI(), "post");
      setPerformanceFeature(data.Data);
      console.log(performanceFeature);
    } catch (error) {
      console.log("Error in performanceFeature API", error);
    }
  };
  const fabricsData = async () => {
    try {
      const { data } = await FetchAPI(fabricsOptionAPI(), "post");
      setFabrics(data.Data);
      console.log(fabrics);
    } catch (error) {
      console.log("Error in fabrics API", error);
    }
  };
  const productOccassionData = async () => {
    try {
      const { data } = await FetchAPI(productOccassionAPI(), "post");
      setProductOccassion(data.Data);
      console.log(productOccassion);
    } catch (error) {
      console.log("Error in productOccassion API", error);
    }
  };

  useEffect(() => {
    Promise.all([
      productColorData(),
      productSizeData(),
      performanceFeatureData(),
      fabricsData(),
      productOccassionData(),
    ])
      .then(() => {
        setLoading(false); // Set loading to false once all API calls are successful
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // In case of an error, also set loading to false
      });
  }, []);

  function getProductColor(description) {
    switch (description) {
      case "#808080":
        return "bg-[#808080]";
      case "#1F2B3B":
        return "bg-[#1F2B3B]";
      case "#4D7CB6":
        return "bg-[#4D7CB6]";
      case "#D0CFCD":
        return "bg-[#D0CFCD]";
      case "#65788A":
        return "bg-[#65788A]";
      case "#1E212A":
        return "bg-[#1E212A]";
      case "#1F1E20":
        return "bg-[#1F1E20]";
      case "#32496F":
        return "bg-[#32496F]";
    }
  }

  // Handler function to update filters
  const handleFilterChange = (filterType, value) => {
    dispatch(setFilters({ filterType, value }));
    dispatch(setActive(1))
    if (window.innerWidth > 450) {
      document.documentElement.scrollTo({
        top: 500,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  // Handler function to reset filters
  const resetFilter = () => {
    dispatch(resetFilters());
    dispatch(setActive(1))
    if (window.innerWidth > 450) {
      document.documentElement.scrollTo({
        top: 500,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const filtered = activeProductData.filter((product, index) => {
      const matchesColors =
        filters.colors.length === 0 ||
        filters.colors.includes(product.product_color);

      const matchesSizes =
        filters.sizes.length === 0 ||
        product.ProductosizeData?.some((size) =>
          filters.sizes.includes(size.productsize_id)
        );

      const matchesPerformanceFeatures =
        filters.performanceFeatures.length === 0 ||
        product.ProductperfomacefeaturesData?.some((performanceFeatures) =>
          filters.performanceFeatures.includes(
            performanceFeatures.productperformancefeature_id
          )
        );

      const matchesOccasions =
        filters.occasions.length === 0 ||
        product.ProductoccassionData?.some((occasion) =>
          filters.occasions.includes(occasion.productoccassion_id)
        );

      const matchesStretchLevel =
        filters.stretchLevel.length === 0 ||
        filters.stretchLevel.includes(product.product_strech_level);

      const matchesfabrics =
        filters.fabrics.length === 0 ||
        filters.fabrics.includes(product.product_fabric);

      const matchesPrices =
        filters.prices.length === 0 ||
        filters.prices.includes(getPriceRange(product.product_final_price));

      return (
        matchesColors &&
        matchesSizes &&
        matchesPerformanceFeatures &&
        matchesPrices &&
        matchesOccasions &&
        matchesfabrics &&
        matchesStretchLevel
      );
    });
    dispatch(setFilteredProducts(filtered));
  }, [productData, filters]);

  // Function to get price range based on product price
  const getPriceRange = (price) => {
    if (price >= 1500 && price <= 1999) {
      return "1500-1999";
    } else if (price >= 2000 && price <= 2999) {
      return "2000-2999";
    } else if (price >= 3000 && price < 10000) {
      return "3000-10000";
    }
  };

  return (
    <>
      {loading ? (
        <div className="loader-container-filter">
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
              Colors
            </AccordionHeader>
            <AccordionBody>
              <div className="grid grid-cols-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 filter_color_container">
                {productColor.map((item, index) => {
                  return (
                    <div className="" key={index}>
                      <Tooltip content={item.productcolor_name}>
                        <input
                          type="checkbox"
                          className={`relative h-11 w-11 cursor-pointer appearance-none rounded-md  transition-all checked:border-[#3B82F6] checked:border-[3px] 
                    ${getProductColor(item.productcolor_description)}`}
                          checked={filters.colors.includes(
                            item.productcolor_name
                          )}
                          onChange={() =>
                            handleFilterChange("colors", item.productcolor_name)
                          }
                        />
                      </Tooltip>
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
              Sizes
            </AccordionHeader>
            <AccordionBody>
              <div className="grid grid-cols-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 filter_size_container">
                {productSize.map((item, index) => {
                  return (
                    <div className="relative" key={index}>
                      <input
                        type="checkbox"
                        className=" h-12 md:h-11 w-full cursor-pointer appearance-none rounded-md border-[#9CA3AF] border-2 transition-all checked:border-[#3B82F6] checked:border-[3px]"
                        checked={filters.sizes.includes(item.productsize_id)}
                        onChange={() =>
                          handleFilterChange("sizes", item.productsize_id)
                        }
                      />
                      <span className="absolute pointer-events-none text-gray-600 font-medium top-2/4 left-2/4 text-lg filter_size">
                        {item.productsize}
                      </span>
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
              Performance Feature
            </AccordionHeader>
            <AccordionBody>
              {performanceFeature.map((item, index) => {
                return (
                  <div className="flex items-center mb-1" key={index}>
                    <input
                      type="checkbox"
                      name=""
                      checked={filters.performanceFeatures.includes(
                        item.productperformancefeature_id
                      )}
                      onChange={() =>
                        handleFilterChange(
                          "performanceFeatures",
                          item.productperformancefeature_id
                        )
                      }
                    />
                    <label
                      htmlFor=""
                      className="ms-2 font-medium text-gray-600"
                    >
                      {item.productperformancefeature}
                    </label>
                  </div>
                );
              })}
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
              Fabric
            </AccordionHeader>
            <AccordionBody>
              {fabrics.map((item, index) => {
                return (
                  <div className="flex items-center mb-1" key={index}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      checked={filters.fabrics.includes(
                        item.fabrics_description
                      )}
                      onChange={() =>
                        handleFilterChange("fabrics", item.fabrics_description)
                      }
                    />
                    <label
                      htmlFor=""
                      className="ms-2 font-medium text-gray-600"
                    >
                      {item.fabrics_description}
                      {/* <span className="text-gray-500"> (13) </span> */}
                    </label>
                  </div>
                );
              })}
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
              Strech Level
            </AccordionHeader>
            <AccordionBody>
              {[
                { label: "3% (97%Cotton, 3%Elastane)", value: "3" },
                { label: "2% (98%Cotton, 2%Elastane)", value: "2" },
                { label: "1% (99%Cotton, 1%Elastane)", value: "1" },
                // Add more price range options as needed
              ].map((level) => (
                <div className="flex items-center mt-1" key={level.value}>
                  <input
                    type="checkbox"
                    name=""
                    onChange={() =>
                      handleFilterChange("stretchLevel", level.value)
                    }
                    checked={filters.stretchLevel.includes(level.value)}
                  />
                  <label htmlFor="" className="ms-2 font-medium text-gray-600">
                    {level.label}
                  </label>
                </div>
              ))}
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
              Occasion
            </AccordionHeader>
            <AccordionBody>
              {productOccassion.map((item, index) => {
                return (
                  <div className="flex items-center mb-1" key={index}>
                    <input
                      type="checkbox"
                      name="occasions"
                      checked={filters.occasions.includes(
                        item.productoccassion_id
                      )}
                      onChange={() =>
                        handleFilterChange(
                          "occasions",
                          item.productoccassion_id
                        )
                      }
                    />
                    <label
                      htmlFor=""
                      className="ms-2 font-medium text-gray-600"
                    >
                      {item.productoccassion}
                      {/* <span className="text-gray-500"> (126) </span> */}
                    </label>
                  </div>
                );
              })}
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
              Price
            </AccordionHeader>
            <AccordionBody>
              {[
                { label: "₹1500 - ₹1999", value: "1500-1999" },
                { label: "₹2000 - ₹2999", value: "2000-2999" },
                { label: "Above ₹3000", value: "3000-10000" },
                // Add more price range options as needed
              ].map((priceRange) => (
                <div className="flex items-center mt-1" key={priceRange.value}>
                  <input
                    type="checkbox"
                    name="priceRange"
                    onChange={() =>
                      handleFilterChange("prices", priceRange.value)
                    }
                    checked={filters.prices.includes(priceRange.value)}
                  />
                  <label htmlFor="" className="ms-2 font-medium text-gray-600">
                    {priceRange.label}
                  </label>
                </div>
              ))}
            </AccordionBody>
          </Accordion>

          <div className="text-center">
            <button
              className="border border-[#003061] rounded-md px-4 py-3 mt-8 text-[#003061] font-semibold hover:bg-[#003061] hover:text-white transition-all w-full
            flex items-center justify-center"
              onClick={resetFilter}
            >
              <BiReset className="text-xl" />{" "}
              <span className="ps-2">Reset</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Icon({ id, openSections }) {
  return <>{openSections?.includes(id) ? <GoDash /> : <GoPlus />}</>;
}

function Filter() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 431 && setOpenFilter(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="w-full">
          <h4 className="text-gray-800 font-medium text-2xl md:mb-3">
            Filters
          </h4>
          <hr className="bg-gray-400 h-[2px] hidden md:block" />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent md:hidden"
          ripple={false}
          onClick={() => setOpenFilter(!openFilter)}
        >
          <Hamburger toggled={openFilter} toggle={setOpenFilter} size={20} />
        </IconButton>
        <hr className="bg-gray-400 h-[2px] md:hidden block" />
      </div>

      <div className="hidden md:block filter_scroll pe-2">
        <FilterList />
      </div>

      <Collapse open={openFilter}>
        <FilterList />
      </Collapse>
    </div>
  );
}

export default Filter;

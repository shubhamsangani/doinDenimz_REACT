import React, { useEffect } from "react";
import profileBanner from "../assets/profilebanner.png";
import {
  Collapse,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  IconButton,
} from "@material-tailwind/react";
import { AiOutlineUser } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import { CiWallet } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { GoSignOut } from "react-icons/go";
import { LiaLuggageCartSolid } from "react-icons/lia";
import { IoIosArrowForward } from "react-icons/io";
import { LiaTapeSolid } from "react-icons/lia";
import PersonalDetails from "../Components/Profile/PersonalDetails";
import ChangePassword from "../Components/Profile/ChangePassword";
import MyMeasurement from "../Components/Profile/MyMeasurement";
// import PaymentSetting from "../Components/Profile/PaymentSetting";
import Favorites from "../Components/Profile/Favorites";
import MyOrders from "../Components/Profile/MyOrders";
import { FetchAPI, logoutUserAPI } from "../api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { favoriteGetAll, fetchProduct } from "../store/APISlice";
import AOS from "aos";
import "aos/dist/aos.css";
import { successToast } from "../store/Slice";

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.API);
  const [displayContent, setDisplayContent] = React.useState(
    parseInt(localStorage.getItem("sidebarList") ?? "0", 10)
  );
  const displaySidebar = [
    { name: "Personal Details", stateValue: 0, icon: <AiOutlineUser /> },
    { name: "Change Your Password", stateValue: 1, icon: <CiLock /> },
    { name: "My Measurement", stateValue: 2, icon: <LiaTapeSolid /> },
    // { name: "Payment Settings", stateValue: 3, icon: <CiWallet /> },
    { name: "Favorites", stateValue: 4, icon: <CiHeart /> },
    { name: "My Orders", stateValue: 5, icon: <LiaLuggageCartSolid /> },
    { name: "Sign Out", stateValue: 6, icon: <GoSignOut /> },
  ];
  const userInfo =
    JSON.parse(localStorage.getItem("userInfo")) ||
    JSON.parse(localStorage.getItem("userSignUpInfo"));

  const handleSidebarList = async (listIndex) => {
    setDisplayContent(listIndex);
    localStorage.setItem("sidebarList", listIndex);
    if (window.innerWidth < 960 && listIndex !== 6) {
      // window.scrollTo(0, 600);
      document.documentElement.scrollTo({
        top: 600,
        left: 0,
        behavior: "smooth", // Optional if you want to skip the scrolling animation
      });
    }
    if (listIndex === 6) {
      //For Logout click
      const { data } = await FetchAPI(logoutUserAPI(), "PATCH", {
        id: userInfo.id,
      });

      successToast(data.Message)
      localStorage.clear()
      navigate("/");
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="pt-[62px] md:pt-[72px] xl:pt-[88px]">
      {/* ======================= Top Section ======================= */}
      <div className="relative" data-aos="fade-down">
        <img
          src={profileBanner}
          alt=""
          className="w-full md:h-auto h-[100px] "
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className=" absolute top-1/2 left-[0.5rem] xl:left-[2rem] -translate-y-1/2 px-4 md:ps-8">
          <h1 className="text-white text-lg md:text-2xl lg:text-3xl xl:text-4xl font-semibold uppercase">
            welcome, {userName}!
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 p-8 overflow-x-hidden">
        {/* ======================= Sidebar ======================= */}
        <div className="col-span-12 lg:col-span-4 xl:col-span-3" data-aos="fade-right">
          <div className="">
            <Typography variant="h5" color="blue-gray">
              Details
            </Typography>

            <hr className="mt-3 border-blue-gray-300" />
          </div>

          <List className="py-0">
            {displaySidebar.map((item, index) => {
              const sidebarLength = displaySidebar.length
              return (
                <div
                  key={index}
                  // onClick={() => setDisplayContent(item.stateValue)} >
                  onClick={() => handleSidebarList(item.stateValue)}
                >
                  <ListItem
                    className={`px-0 bg-transparent font-medium ${
                      displayContent === item.stateValue
                        ? "!text-[#003061] !bg-white"
                        : ""
                    } `}
                  >
                    <ListItemPrefix>
                      <div
                        className={`text-xl bg-gray-300 rounded-full p-2 ${
                          displayContent === item.stateValue
                            ? "!bg-[#003061] text-white"
                            : ""
                        }`}
                      >
                        {item.icon}
                      </div>
                    </ListItemPrefix>
                    {item.name}
                    <ListItemSuffix className={index == sidebarLength-1 ? "hidden" : "block"}>
                      <IoIosArrowForward />
                    </ListItemSuffix>
                  </ListItem>
                  <hr className=" border-blue-gray-300" />
                </div>
              );
            })}
          </List>
        </div>

        {/* ======================= Content ======================= */}
        <div className="col-span-12 lg:col-span-8 xl:col-span-9" data-aos="fade-left">
          {displayContent === 0 && (
            <div>
              <PersonalDetails />
            </div>
          )}
          {displayContent === 1 && (
            <div>
              <ChangePassword />
            </div>
          )}
          {displayContent === 2 && (
            <div>
              <MyMeasurement />
            </div>
          )}
          {/* {displayContent === 3 && (
            <div>
              <PaymentSetting />
            </div>
          )} */}
          {displayContent === 4 && (
            <div>
              <Favorites />
            </div>
          )}
          {displayContent === 5 && (
            <div>
              <MyOrders />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

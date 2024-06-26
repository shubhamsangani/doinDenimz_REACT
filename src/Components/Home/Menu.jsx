import React, { useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Tooltip,
  Badge,
} from "@material-tailwind/react";
import Hamburger from "hamburger-react";
import navlogo from "../../assets/nav_logo.png";
import { AiOutlineUser } from "react-icons/ai";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { TbLogin } from "react-icons/tb";

function NavList({ handleCloseNav }) {
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const isProductPage = location.pathname === '/product';
  const isMeasurementPage = location.pathname === '/measurement-guide';
  const isAboutPage = location.pathname === '/about';
  const isContactPage = location.pathname === '/contact';

  return (
    <ul className="mt-4 ms-1 xl:ms-0 flex flex-col gap-2 xl:mb-0 xl:mt-0 xl:flex-row xl:items-center xl:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`p-1 font-medium ${isHomePage ? 'pointer-events-none' : ''}`}
        onClick={handleCloseNav}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "flex items-center xl:text-white xl:border-b-2 xl:h-12 transition-colors text-[#E5E7EB] text-base"
              : "flex items-center xl:hover:text-white xl:hover:border-b-2 xl:h-12 transition-colors text-[#E5E7EB] text-base"
          }
        >
          Home
        </NavLink>
      </Typography>
      {/* <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
        onClick={handleCloseNav}
      >
        <NavLink to='/custom-jeans' className={({ isActive }) =>
          isActive ? 'flex items-center xl:text-white xl:border-b-2 xl:h-12 transition-colors text-[#E5E7EB] text-base' : 'flex items-center xl:hover:text-white xl:hover:border-b-2 xl:h-12 transition-colors text-[#E5E7EB] text-base'}>
          Custom Jeans
        </NavLink>
      </Typography> */}
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`p-1 font-medium ${isProductPage ? 'pointer-events-none' : ''}`}
        onClick={handleCloseNav}
      >
        <NavLink
          to="/product"
          className={({ isActive }) =>
            isActive
              ? "flex items-center xl:text-white xl:border-b-2 xl:h-12 transition-colors text-[#E5E7EB] text-base"
              : "flex items-center xl:hover:text-white xl:hover:border-b-2 xl:h-12 transition-colors text-[#E5E7EB] text-base"
          }
        >
          Men
        </NavLink>
      </Typography>
      {/* <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
        onClick={handleCloseNav}
      >
        <NavLink to='' className='flex items-center xl:hover:text-white xl:hover:border-b-2 xl:h-12 transition-colors text-[#E5E7EB] text-base'>
          Women
        </NavLink>
      </Typography> */}
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`p-1 font-medium ${isMeasurementPage ? 'pointer-events-none' : ''}`}
        onClick={handleCloseNav}
      >
        <NavLink
          to="/measurement-guide"
          className={({ isActive }) =>
            isActive
              ? "flex items-center xl:text-white xl:border-b-2 xl:h-12 transition-colors text-[#E5E7EB] text-base"
              : "flex items-center xl:hover:text-white xl:hover:border-b-2 xl:h-12 transition-colors text-[#E5E7EB] text-base"
          }
        >
          Measurement Guide
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`p-1 font-medium ${isAboutPage ? 'pointer-events-none' : ''}`}
        onClick={handleCloseNav}
      >
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "flex items-center xl:text-white xl:border-b-2 xl:h-12 transition-colors text-[#E5E7EB] text-base"
              : "flex items-center xl:hover:text-white xl:hover:border-b-2 xl:h-12 transition-colors text-[#E5E7EB] text-base"
          }
        >
          About
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`p-1 font-medium ${isContactPage ? 'pointer-events-none' : ''}`}
        onClick={handleCloseNav}
      >
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "flex items-center xl:text-white xl:border-b-2 xl:h-12 transition-colors text-[#E5E7EB] text-base"
              : "flex items-center xl:hover:text-white xl:hover:border-b-2 xl:h-12 transition-colors text-[#E5E7EB] text-base"
          }
        >
          Contact Us
        </NavLink>
      </Typography>
    </ul>
  );
}

function NavIcon({ handleCloseNav }) {
  const location = useLocation();
  const { cartItem } = useSelector((state) => state.API);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // const userSignUpInfo = JSON.parse(localStorage.getItem("userSignUpInfo"));

  const isCartPage = location.pathname === '/cart';
  const isProfilePage = location.pathname === '/profile';

  return (
    <ul className="mt-4 ms-1 xl:ms-0 flex flex-row gap-2 xl:mb-0 xl:mt-0 items-center xl:gap-6">
      {/* <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link><HiMiniMagnifyingGlass className='text-white text-xl' />
        </Link>
      </Typography> */}
      <Tooltip content={userInfo  ? "Profile" : "Login"} className='hidden lg:block'>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className={`p-1 font-medium ${isProfilePage ? 'pointer-events-none' : ''}`}
          onClick={handleCloseNav}
        >
          <Link to={userInfo ? "/profile" : "/login"} state={{ prev: location.pathname }}>
            {userInfo  ?
            <AiOutlineUser className="text-white text-xl" /> :
            <TbLogin className="text-white text-2xl" />  }
          </Link>
        </Typography>
      </Tooltip>
      
      <Badge content={!cartItem || !userInfo ? '0' : cartItem?.length} color="white" >
        <Tooltip content="Cart" className='hidden lg:block'>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className={`p-1 font-medium ${isCartPage ? 'pointer-events-none' : ''}`}
            onClick={handleCloseNav}
          >
            <Link to="/cart">
              <BsCart className="text-white text-xl" />
            </Link>
          </Typography>
        </Tooltip>
      </Badge>
    </ul>
  );
}

export default function Menu() {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  const handleWindowResize = () =>
    window.innerWidth >= 1025 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleCloseNav = () => {
    setOpenNav(!openNav);
  };
  return (
    <Navbar className="max-w-full rounded-none shadow-none border-0 px-4 md:px-12 py-4 !bg-[#192C41] fixed top-0 z-50">
      <div className="flex items-center justify-between">
        <div onClick={() => navigate("/")}>
          <img
            src={navlogo}
            alt=""
            className="w-auto h-[30px] md:h-[40px] cursor-pointer"
          />
        </div>
        <div className="hidden xl:block">
          <NavList />
        </div>
        <div className="hidden xl:block">
          <NavIcon />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent xl:hidden"
          ripple={false}
          onClick={handleCloseNav}
        >
          <Hamburger toggled={openNav} toggle={setOpenNav} size={25} />
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList handleCloseNav={handleCloseNav} />
        <NavIcon handleCloseNav={handleCloseNav} />
      </Collapse>
    </Navbar>
  );
}

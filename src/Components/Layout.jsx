import React from "react";
import Menu from "./Home/Menu";
import Footer from "./Home/Footer";
import { Outlet } from "react-router-dom";

function Layout({ children }) {
  return (
    <div>
      <Menu /> {/* Render Navbar */}

      <div>{children}</div> {/* Render main content */}
      <Outlet />

      <Footer /> {/* Render Footer */}
    </div>
  );
}

export default Layout;

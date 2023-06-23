import Navigation from "./Header/Navigation";
import DashFooter from "./Footer/DashFooter";
import React from "react";
import "./defaultLayout.module.scss"
// import SideBarLeft from "./Sidebar/SideBarLeft";


const defaultLayout = ({ children }) => {
  return (
    <>
      <Navigation />
      {/* <SideBarLeft/> */}
      <div className="container">
        <div className="content">{children}</div>
      </div>
      <DashFooter />
    </>
  );
};

export default defaultLayout;

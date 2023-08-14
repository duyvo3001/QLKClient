import DashFooter from "./Footer/DashFooter";
import React from "react";
import "./defaultLayout.scss"
import SideBarLeft from "./Sidebar/SideBarLeft";

const defaultLayout = ({ children }) => {
  return (
    <>
      <SideBarLeft />
      <div className="maincontent" >
        <div>{children}</div>
      </div>
      <DashFooter />
    </>
  );
};

export default defaultLayout;

import Navigation from "./Header/Navigation";
import DashFooter from "./Footer/DashFooter";
import React from 'react'
import * as style from './defaultLayout.module.scss'
import classnames from 'classnames/bind'
import SideBarLeft from "./Sidebar/SideBarLeft";
const cx = classnames.bind(style)

const defaultLayout = ({ children }) => {
  return (
    <>
      <Navigation />
      <SideBarLeft/>
      <div className={cx('container')}>
        <div className={cx('content')}>{children}</div>
      </div>
      <DashFooter />
    </>
  )
}

export default defaultLayout
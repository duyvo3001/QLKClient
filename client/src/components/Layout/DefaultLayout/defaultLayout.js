import Navigation from "./Header/Navigation";
import DashFooter from "./Footer/DashFooter";
import React from 'react'
import * as style from './defaultLayout.module.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(style)

const defaultLayout = ({ children }) => {
  return (
    <>
      <Navigation />
      <div className={cx('container')}>
        <div className={cx('content')}>{children}</div>
      </div>
      <DashFooter />
    </>
  )
}

export default defaultLayout
import {React, useState} from 'react'
import "./SideBar.scss"
const SideBarLeft = () => {
    const [isExpended, setIsExpended] =useState(true)
    return (
        <div className='sidenav'>
            <div className='nav-upper'>
                <div className='nav-heading'>
                    <div className='nav-brand'>
                        <h2>Show</h2>
                    </div>
                    <button className='nav-btn' >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SideBarLeft
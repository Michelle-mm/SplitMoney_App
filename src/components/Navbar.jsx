import React, {useState, useEffect} from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoHome, IoPeople, IoSettingsOutline } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import {useStateContext} from "../contexts/ContextProvider";
export const Navbar = () => {
    const {themeColor} = useStateContext();
    const [mdWindow, setMdWindow] = useState(false);
    const navItems=[
        {name: 'home', icon: <IoHome/>},
        {name: 'friends', icon: <IoPeople/>},
        {name: 'splits', icon: <RiMoneyDollarCircleLine/>},
        {name: 'settings', icon: <IoSettingsOutline/>}
    ]
    
    // const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
    // const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';
    return (
        <div className="side-bar-menu text-white rounded-t-xl lg:rounded-none"
            style={{backgroundColor: themeColor}}>
            <p className="appTitle ml-4 my-5 text-5xl font-bold">SplitApp</p>
            {navItems.map((item)=>(
                <NavLink to={`/${item.name}`}
                        key={item.name}
                        style={({ isActive }) => ({
                            backgroundColor: isActive ? 'whitesmoke' : themeColor,
                            borderRadius: isActive? '10px': 'none',
                            color: isActive? themeColor: 'white'
                        })}
                        className="flex items-center text-4xl lg:text-3xl lg:font-bold lg:mx-2 p-3 lg:leading-6">
                    {item.icon}
                    <p className="navIconText ml-4 font-normal">{item.name}</p>
                </NavLink>
            ))}
            <p className="copyRight font-semibold text-white mt-auto mb-5 self-center">&lt;&lt;&lt; &copy; Michelle &gt;&gt;&gt;</p>
        </div>
    )
}

import React, { useState } from 'react'
import {NavLink } from 'react-router-dom';
import {useStateContext} from "../contexts/ContextProvider";
import { UserSpents, History } from '.';

export const Home = () => {
    const {themeColor, textColor, showHistory, setShowHistory} = useStateContext();
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="HomePage mt-10 m-5 relative">
            <div className="flex justify-between w-full p-4">
                <h1 className="text-5xl font-bold" style={{color: themeColor}}>Welcome Home!</h1>
                <NavLink to={'/history'}
                        onClick={()=>setShowHistory((prev)=>!prev)}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        style={{color: isHovered? textColor: themeColor, borderColor: isHovered? textColor: themeColor}}
                        className="rounded-md p-2 text-xl bg-white font-semibold border-2 shadow-md lg:text-2xl">
                    <p>{showHistory? `Back to Home`:`Check History`}</p>
                </NavLink>
            </div>
            <div className="homeContent mt-10 rounded-md w-full">
                <UserSpents/>
            </div>
        </div>
    )
}



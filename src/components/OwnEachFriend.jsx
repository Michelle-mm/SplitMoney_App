import React, {useState} from 'react'
import { RiAlarmWarningFill } from "react-icons/ri";
import {useStateContext} from "../contexts/ContextProvider";

export const OwnEachFriend = ({friendName, amount}) => { 
    const { themeColor } = useStateContext();   
    const spanStyle = "sm:text-base text-xl font-normal whitespace-nowrap block";
    return (
        <div className="eachFriendDetail relative overflow-hidden flex justify-center gap-4 items-center lg:max-w-26x rounded-2xl px-1 py-4 border-2 flex-1 text-center shadow-lg" 
            style={{borderColor: amount>0? themeColor: "#f54343", backgroundColor:"#f5f5f5f3", color: amount>0? themeColor: "#f54343"}}>
                <div className="flex md:gap-2 items-center">
                    <RiAlarmWarningFill className="w-24 h-auto opacity-30 absolute -right-5 lg:opacity-50 md:-left-6 md:w-28"/>
                    {amount>0? 
                        <p className="text-xl md:text-2xl font-bold z-10 ">{friendName}<span className={`${spanStyle} sm:-mr-3`}>own you</span></p>:
                        <p className="text-xl md:text-2xl font-bold z-10 "><span className={`${spanStyle} sm:-mr-3`}>You own</span> {friendName}</p>
                    }
                </div>
                
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold" style={{color: amount>0? themeColor: "#f54343"}}>${amount}</p>
        </div>
    )
}

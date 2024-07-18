import React, {useState, useRef} from 'react'
import { MdOutlineCancel } from "react-icons/md";
import {useStateContext} from "../contexts/ContextProvider";
export const Settings = () => {
    const {themeColor, setThemeColor, textColor, setTextColor} = useStateContext();
    // const defaultColorOptions = {
    //     lightBlue: "#A4D8FA",
    //     blue: "#54B6F8", 
    //     darkBlue: "#2C76C5",
    //     lightPurple: "#B27DF1",
    //     purple: "#A82AF5",
    //     lightGreen: "#97ECC5",
    //     green: "#51BD8B",
    //     orange: "#F0CF2A"
    // }
    // const defaultTextColorOptions={
    //     redBrown: "#635755",
    //     greenBrown: "#556356",
    //     blueBrown: "#555E63",
    //     purpleBrown: "#605563",
    //     black: "#000000",
    //     lightBlack: "#192227",
    //     grayBrown: "#606060",
    //     gray: "#676F73"
    // }
    const defaultColorOptions = ["#A4D8FA", "#84c7db", "#54B6F8", "#2C76C5", "#B27DF1", "#A82AF5", "#97ECC5", "#51BD8B", "#F0CF2A"]
    const defaultTextColorOptions=["#6a6c6d", "#635755","#556356","#555E63","#605563","#000000","#192227","#606060","#676F73"]

    function handleColorChange(event){
        const regex = /#[e-fE-F][0-3a-fA-F][0-9a-fA-F]{2}/;
        const color = event.target.value;
        const found = color.match(regex);
        setThemeColor(color);
        if(found){
            alert("This color maybe similiar to the warning_color, We don't suggest to use this color as theme color");
        } 
    }
    function handleTextColorChange(textcolor){
        // console.log(textcolor);
        setTextColor(textcolor);
    }

    return (
        <div className="mt-5 mx-9">
            <h1 className="text-5xl font-bold mb-2" style={{color: themeColor}}>Settings</h1>
            <hr/>
            <div className="flex-col border-t-1 border-color p-4 ml-4">
                <div className="colorPicker mt-3">
                    <label htmlFor="color-picker" className="font-semibold text-3xl mr-2" style={{color: themeColor}}>Theme Color:</label>
                    <br></br>
                    <input id="color-picker" type="color" value={themeColor} 
                            className="w-40 h-12 mt-3 ml-2"
                            onChange={(e)=>handleColorChange(e)}
                            />
                    <div className="colorPicker mt-3">
                        <label htmlFor="color-picker" className="font-semibold text-3xl mr-2" style={{color: themeColor}}>Default Theme Colors:</label>
                        <br></br>
                        <div className="flex gap-3 mt-5">
                            {defaultColorOptions.map((eachColor) => (
                                <button
                                    key={eachColor}
                                    type="button"
                                    className="w-14 h-14 md:w-16 md:h-16 rounded-full"
                                    style={{ backgroundColor: eachColor }}
                                    data-color={eachColor}
                                    onClick={(e) => setThemeColor(e.target.dataset.color)}
                                    />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="colorPicker mt-3">
                    <label htmlFor="color-picker" className="font-semibold text-3xl mr-2" style={{color: textColor}}>Text Color:</label>
                    <br></br>
                    <div className="flex gap-3 mt-5">
                        {defaultTextColorOptions.map((eachColor) => (
                                <button
                                    key={eachColor}
                                    type="button"
                                    className="w-14 h-14 md:w-16 md:h-16 rounded-full"
                                    style={{ backgroundColor: eachColor }}
                                    data-color={eachColor}
                                    onClick={(e) => handleTextColorChange(e.target.dataset.color)}
                                    />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

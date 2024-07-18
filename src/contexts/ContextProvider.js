import React ,{useState, createContext, useContext} from "react";
const StateContext = createContext();

export const ContextProvider = ({children})=>{
    const [themeColor, setThemeColor] = useState('#84c7db');
    const [textColor, setTextColor] = useState('#606060');
    const [showHistory, setShowHistory] = useState(false);
    
    return (
        <StateContext.Provider value={
            {   themeColor, setThemeColor,
                textColor, setTextColor,
                showHistory, setShowHistory
            }
        }>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = ()=>useContext(StateContext);
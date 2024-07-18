import React, { useState, useEffect} from 'react'
import {NavLink } from 'react-router-dom';
import {useStateContext} from "../contexts/ContextProvider";
import axios from 'axios';

export const History = () => {
    const {themeColor, textColor, showHistory, setShowHistory} = useStateContext();
    const [fetchedData, setFetchedData] = useState([]);
    const [isHovered, setIsHovered] = useState(false);
    async function fetchData(){
        try {
            const response = await axios.get('http://localhost:4000/splits');
            // console.log(response.data);
            const newFetchArr = [];
            for (let i=0; i<response.data.length; i++){
                const eachData = (response.data)[i];
                newFetchArr.push(eachData);
            }
            setFetchedData(newFetchArr);
        } catch (error) {
            console.error('There was an error getting the data!', error);
        }
    }
    
    useEffect(()=>{
        fetchData();
    }, []);
    return (
        <div className="mt-10 m-5 font-semibold text-center min-h-dvh">
            <div className="flex justify-between p-4 mb-10">
                <h1 className="text-5xl font-bold" style={{color: themeColor}}>Split History</h1>
                <NavLink to={'/home'}
                            onClick={()=>setShowHistory((prev)=>!prev)}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            style={{color: isHovered? textColor: themeColor, borderColor: isHovered? textColor: themeColor}}
                            className="rounded-md p-2 text-xl bg-white font-semibold border-2 shadow-md lg:text-2xl">
                        <p>{showHistory? `Back to Home`:`Check History`}</p>
                </NavLink>
            </div>
            <table className="table-auto w-full border-collapse rounded-lg overflow-auto">
                <thead className="font-bold text-xl lg:text-2xl" style={{color: themeColor}}>
                    <tr>
                        <th className="col-1" style={{borderColor: themeColor}}>Item</th>
                        <th className="col-2" style={{borderColor: themeColor}}>Paid By</th>
                        <th className="col-3" style={{borderColor: themeColor}}>Total Money Amount:</th>
                        <th className="col-4" style={{borderColor: themeColor}}>Split:</th>
                        <th className="col-5" style={{borderColor: themeColor}}>Date:</th>
                        <th className="col-6" style={{borderColor: themeColor}}>Participants: </th>
                    </tr>
                </thead>
                <tbody>
                {fetchedData.length>0? fetchedData.map((eachData, index)=>{
                    return(
                        <tr key={index} className="border-2 p-2 text-lg md:text-xl lg:text-2xl font-semibold lg:font-bold" style={{color: index%2===0? themeColor: textColor, borderColor: themeColor}}>
                            <td className="col-1" style={{borderColor: themeColor}}>{eachData.description}</td>
                            <td className="col-2" style={{borderColor: themeColor}}>{eachData.paidBy}</td>
                            <td className="col-3" style={{borderColor: themeColor}}>{eachData.totalcost}</td>
                            <td className="col-4" style={{borderColor: themeColor}}>{eachData.splitType}</td>
                            <td className="col-5" style={{borderColor: themeColor}}>{(eachData.entryDate).split("T")[0]}</td>
                            <td className="col-6 text-start p-2" style={{borderColor: themeColor}}>{
                                    eachData.participants.length > 0 && eachData.participants.map((eachParticipant, index)=>{
                                        return(
                                            <p key={`p${index}`} className="ml-4 mb-3">{eachParticipant.name}: ${eachParticipant.amount}</p>
                                        )
                                    })
                                }
                            </td>
                        </tr>
                    );
                }): <tr><td colSpan="6" className="text-3xl text-gray-400 font-bold whitespace-nowrap text-center">No History</td></tr>}
                </tbody>
            </table>
        </div>
    )
}

import React, {useState, useEffect} from 'react'
import {useStateContext} from "../contexts/ContextProvider";
import { FaExclamation } from "react-icons/fa";
import { MdAttachMoney, MdDelete } from "react-icons/md";
import axios from 'axios';
import { OwnEachFriend } from './OwnEachFriend';

export const UserSpents = () => {
    const { themeColor, textColor } = useStateContext();
    const [rawData, setRawData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [meParticipate, setMeParticipate] = useState([]);
    const [mySpent, setMySpent] = useState({
        paidByMe: 0,
        moneyIOwn: 0,
        myTotalSpent: 0
    });
    const [ownEachFriend, setOwnEachFriend] = useState([]);

    useEffect(() => {
        // fetch only once
        let processing = true;
        fetchData(processing);
        return ()=>{
            processing = false;
        }
    }, []); 

    useEffect(() => {
        if (rawData.length > 0) {
            filterData();
        }
    }, [rawData]);

    useEffect(() => {
        if (filteredData.length > 0) {
            calculateValues();
        }
        // console.log("render")
    }, [filteredData]);


    // Fetch data from MongoDB
    const fetchData = async (processing) => {
        try {
            const response = await axios.get('http://localhost:4000/splits');
            if (processing) {setRawData(response.data);}
        } catch (error) {
            console.error('There was an error getting the data!', error);
        }
    };

    // Filter the response data
    const filterData = () => {
        const filtered = rawData.filter(eachData => 
            eachData.paidBy === "user" || 
            eachData.participants.some(participant => participant.name === "me")
        );
        setFilteredData(filtered);
    };

    // alculate values
    const calculateValues = () => {
        let totalSpent = 0;
        let newOwnEachFriend = [];
        // classify
        filteredData.forEach((eachData) => {
            if (eachData.paidBy === 'user') {
                totalSpent += parseInt(eachData.totalcost);
                eachData.participants.forEach((participant) => {
                    if (participant.name !== 'me') {
                        updateFriendAmount(newOwnEachFriend, participant.name, participant.amount, true);
                    }
                });
            } else {
                const myParticipation = eachData.participants.find(p => p.name === 'me');
                if (myParticipation) {
                    totalSpent += parseInt(myParticipation.amount);
                    updateFriendAmount(newOwnEachFriend, eachData.paidBy, myParticipation.amount, false);
                }
            }
        });

        setMySpent(prev => ({ ...prev, myTotalSpent: totalSpent }));
        setOwnEachFriend(newOwnEachFriend);
        calculateTotalOwn(ownEachFriend);
        // for showing all records that includes me
        const newMeParticipate = filteredData.map((eachData) => ({
            id: eachData._id,
            item: eachData.description,
            paidBy: eachData.paidBy === 'user' ? "Me" : eachData.paidBy,
            totalAmount: eachData.totalcost,
            myspent: eachData.participants.find(p => p.name === "me")?.amount || "I did not join split",
            didIJoinSplit: eachData.participants.some(p => p.name === "me"),
            date: (eachData.entryDate).split("T")[0]
        }));
        setMeParticipate(newMeParticipate);
    };

    const updateFriendAmount = (friendArray, friendName, amount, userPaid) => {
        const friendIndex = friendArray.findIndex(f => f.friendName === friendName);
        if (friendIndex !== -1) {
            friendArray[friendIndex].amount += userPaid ? amount : -amount;
        } else {
            friendArray.push({ friendName, amount: userPaid ? amount : -amount });
        }
    };
    const calculateTotalOwn = (friendArray)=>{
        let totalOwn = 0
        const ownArr = friendArray.filter((f)=>f.amount<0);
        ownArr.forEach((arr)=>totalOwn+=arr.amount);
        setMySpent(prev => ({ ...prev, moneyIOwn: -totalOwn}));
    }

   
    const handleDelete = async (id) => {
        try {
            if (window.confirm('Are you sure to delete this split record?')) {
                await axios.delete(`http://localhost:4000/delete-split/${id}`);
                // After successful deletion, fetch the data again
                let processing = true;
                fetchData(processing);
                return ()=>{
                    processing = false;
                }
            }
        } catch (error) {
            console.error('There was an error deleting the data!', error);
        }
    };
    
    return (
        <div className="p-2 w-full flex flex-col gap-5 font-bold">
            <div className=" lg:mt-10 p-3 flex flex-col gap-5 w-full rounded-md font-bold text-BRGRAY lg:flex-row">
                <div className="showSpentBox w-full shadow-xl h-48 lg:flex-1" style={{backgroundColor: themeColor}}>
                    <p className="z-10 text-3xl">Total Spent this Month: <span style={{color: mySpent.myTotalSpent > 10000? "#e61414": textColor}}>${mySpent.myTotalSpent}</span> </p>
                    <MdAttachMoney className="homeIcons absolute -top-12 -right-24 text-19xl rotate-20"/> 
                </div>
                <div className="showSpentBox w-full shadow-xl h-48 lg:flex-1" style={{backgroundColor: themeColor}}>
                    <p className="z-10 text-3xl">The total amount I Own: <span style={{color: mySpent.moneyIOwn > 2000? "#e61414": textColor}}>${mySpent.moneyIOwn}</span> </p>
                    <FaExclamation className="homeIcons absolute -top-3 -right-16 text-14xl rotate-20 z-"/>
                </div>
            </div>
            <div className="w-full min-h-fit flex justify-between md:justify-center gap-1 md:gap-4 md:p-2 overflow-auto">
                {ownEachFriend.length>0 ? (
                    ownEachFriend.map((ownData,index)=>(
                        <OwnEachFriend key={index} friendName={ownData.friendName} amount={ownData.amount} index={index}/>
                    ))   
                ): <span className="w-full h-full text-3xl text-gray-400 font-bold text-center">No Record</span>
                }
            </div>
            <ul className="flex flex-col gap-4 max-h-400 lg:min-h-600 lg:max-h-700 overflow-y-auto p-3">
                {meParticipate.length >0 ? meParticipate.map((each, index)=>(
                    <li key={index} className="flex justify-between items-center text-xl text-red-400 font-semibold p-3 rounded-lg"
                        style={{backgroundColor: index%2===0? themeColor: "white", 
                                borderWidth: index%2===0? "0px": "2px",
                                borderColor:index%2===0? "white": textColor,
                                color:index%2===0? "white": textColor}}> 
                        <div>
                            <p className="text-3xl mb-2">{each.item}:</p>
                            <p>Paid by: {each.paidBy}</p>
                            <p>{`Did I participate the split? ${each.didIJoinSplit? "Yes": "No"}`}</p>
                            <p>{each.didIJoinSplit? `My split: ${each.myspent}`: `total: ${each.totalAmount}`}</p>
                            <p>Date: {(each.date).split("T14")[0]}</p>
                        </div>
                        <button className="text-3xl mr-5 p-3 rounded-md hover:bg-gray-300 active:text-red-300"
                            onClick={()=>handleDelete(each.id)}>
                                <MdDelete/>
                        </button>
                    </li>)):
                    <p className="m-8 text-3xl text-red-500 font-bold">No Split Data!</p>
                }
            </ul>
        </div>
    )
}

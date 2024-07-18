import React, {useState, useEffect} from 'react'
import { IoMdAdd, IoMdPerson  } from "react-icons/io";
import { FaRegStar, FaFemale, FaMale  } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import {useStateContext} from "../contexts/ContextProvider";
import axios from 'axios';
export const Friends = () => {
    const {themeColor, textColor} = useStateContext();
    const [isHovered, setIsHovered] = useState(false);
    const [showFriends, setShowFriends] = useState(false);
    const [friendLst, setFriendLst] = useState([]);
    const [friendIcons, setFriendIcons] = useState({
        general: <IoMdPerson/>,
        fav: <FaRegStar className="text-amber-200 font-bold"/>,
        male: <FaMale />,
        female: <FaFemale />
    })
    useEffect(()=>{
        fetchFriendData();
    }, []);

    async function fetchFriendData(){
        try{
            const friendResponse = await axios.get("http://localhost:4000/friends");
            setFriendLst(friendResponse.data);
        } catch(error){
            console.log("There is an error getting the friends data!", error);
        } 
    }
    const handleDelete = async (id, deleteName) => {
        try {
            if (window.confirm(`Do you really want to delete ${deleteName} from you friend list?`)){
                await axios.delete(`http://localhost:4000/delete-friend/${id}`);
                // Update state after deleting
                setFriendLst(prevData => prevData.filter(item => item._id !== id));
            }
        } catch (error) {
            console.error('There was an error deleting the data!', error);
        }
    };
    const AddFriend = ()=>{
        async function handleAddFriendForm(event){
            event.preventDefault();
            const name = event.target.elements.name.value;
            const iconKey = event.target.elements.icon.value;
    
            const validName = friendLst.every(eachExistedFriend => {
                if (name === eachExistedFriend.name) {
                    alert("This Friend Name has Already Existed, Please Choose Another One.");
                    return false;
                } else{
                    return true;
                }
            });
            if(validName){
                const friendData = {
                    name: name,
                    iconKey: iconKey
                }
                try {
                    const response = await axios.post('http://localhost:4000/friends', friendData);
                    alert(response.data);
                } catch (error) {
                    console.error('There was an error saving the friends data!', error);
                }
                fetchFriendData();
                setShowFriends(prev => !prev);
            }
        }
              
        return(
            <form className="friendForm my-9 mx-8 md:mx-12 w-11/12 lg:w-1/2" style={{color: themeColor}} onSubmit={handleAddFriendForm}>
                <div className="text-4xl font-bold mb-4 flex justify-between" >
                    <h3 className="whitespace-nowrap">Add to Friend List!!</h3>
                    <TiDelete onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={()=>setShowFriends(false)}
                            
                            style={{color: isHovered? textColor: themeColor}}/>
                </div>
                <label htmlFor="name" className="text-3xl">Name:</label>
                <input type="text" id="name" name="name" required className="border-2 rounded-md w-4/5 h-16 text-2xl" style={{borderColor: themeColor}}/>
                <p className="friendIconForm flex gap-5 items-center my-10 text-3xl font-semibold">Friend Icon:
                    <label htmlFor="general">
                        <input type="radio" id="general" name="icon" value="general" defaultChecked={true}/>
                        <IoMdPerson className="text-4xl"/>
                    </label>
                    <label htmlFor="favorate">
                        <input type="radio" id="favorate" name="icon" value="fav" />
                        <FaRegStar/>
                    </label>
                    <label htmlFor="male">
                        <input type="radio" id="male" name="icon" value="male"/>
                        <FaMale/>
                    </label>
                    <label htmlFor="female">
                        <input type="radio" id="female" name="icon" value="female"/>
                        <FaFemale/>
                    </label>
                </p>
                <button type="submit" className="rounded-lg text-white text-3xl font-bold p-3 my-5" 
                        style={{backgroundColor: themeColor}}
                        >ADD
                </button>
                <hr className="border-1 w-full"/>
            </form>
        )
    }
    return (
        <div className="mx-9 mt-5">
            <h1 className="flex flex-col text-5xl font-bold" style={{color: themeColor}}>Friends:</h1>
            {showFriends? <AddFriend/>: <p className="text-gray-300 text-4xl font-semibold my-9 ml-10">Create your friend list!</p>}
            <ul className="mt-3 ml-2 w-10/12 overflow-y-auto">
                {friendLst.map((friend) => (
                <li key={friend._id} className="flex mb-5 leading-relaxed text-3xl" style={{color: textColor}}>
                    <p className="flex items-center gap-3 flex-1">{friendIcons[friend.iconKey]}{friend.name}</p>
                    <button className="text-xl font-semibold text-white p-2 mr-3 rounded-md bg-red-300"
                            onClick={()=>handleDelete(friend._id, friend.name)}
                        >
                        <MdDelete/>
                    </button>
                </li>
                ))}
            </ul>
            {!showFriends && 
                <button className="fixed bottom-28 lg:bottom-24 right-5 rounded-full p-3 m-5 text-6xl text-white self-end" 
                        onClick={()=>setShowFriends(prev => !prev)}
                        style={{backgroundColor: themeColor}}>
                    <IoMdAdd/>
                </button>
            }
        </div>
    )
}

import React from 'react'
import {useStateContext} from "../contexts/ContextProvider";

export const SelectFriends = () => {
    const {setSplitWith, themeColor, friends} = useStateContext();
    function afterSelectFriend(event){
        event.preventDefault(); 
        console.log(event.target.value);
        // friendRef.current = event.target;
        // setShowFriendsForm(false);
    }

    return(
        <fieldset className="absolute top-0 w-11/12 min-h-400 m-6 p-4 flex flex-col rounded-lg bg-white/30 backdrop-blur-md
                        md:static md:max-w-fit">
            <legend className="font-bold text-2xl" style={{color: themeColor}}>Who also participates? </legend>
            <form onSubmit={(e) => afterSelectFriend(e)} className="flex-1 mt-6 overflow-y-auto flex flex-col justify-between gap-3">
                <label htmlFor="whoseIn" className="text-xl">
                        <input type="checkbox" className="mr-2" name='me' id="whoseIn"/>
                        Me
                </label>
                {friends.length>0 ? friends.map((friend)=>{
                    return(
                        <label key={friend.id} htmlFor="whoseIn" className="text-xl">
                            <input type="checkbox" className="mr-2" name={friend.name} id="whoseIn"/>
                            {friend.name}
                        </label>
                    );
                }): <p className="text-xl text-gray-400 self-center font-semibold">Empty Friend List</p>}
                <button type="submit" className="p-2 bg-main-bg text-white rounded-md w-full">OK</button> 
            </form>
        </fieldset>
    );
}

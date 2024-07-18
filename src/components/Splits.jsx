import React, { useState, useEffect } from 'react';
import { MdDescription, MdOutlineAttachMoney } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { useStateContext } from "../contexts/ContextProvider";
import axios from 'axios';

const initialFormState = { description: '', totalcost: '', paidBy: '' };

export const Splits = () => {
    const { themeColor } = useStateContext();
    const [splitInDetail, setSplitInDetail] = useState(false);
    const [friendsData, setFriendsData] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
    const [selectedParticipants, setSelectedParticipants] = useState({});

    useEffect(() => {
        fetchFriendData();
    }, []);

    const fetchFriendData = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/friends");
            setFriendsData(data);
        } catch (error) {
            console.error("Error fetching friends data:", error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleParticipantChange = (event) => {
        const { name, checked } = event.target;
        setSelectedParticipants(prev => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const participants = Object.entries(selectedParticipants)
            .filter(([_, isSelected]) => isSelected)
            .map(([name]) => ({
                name,
                amount: splitInDetail 
                    ? parseFloat(e.target[`detailcost-${name}`]?.value || 0)
                    : parseFloat(formData.totalcost) / Object.values(selectedParticipants).filter(Boolean).length
            }));

        const data = {
            ...formData,
            splitType: splitInDetail ? 'In_Detail' : 'Equally',
            participants
        };

        try {
            await axios.post('http://localhost:4000/splits', data);
            alert("Data save successfully!");
            resetForm();
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const resetForm = () => {
        setFormData(initialFormState);
        setSplitInDetail(false);
        setSelectedParticipants({});
    };

    return (
        <div className="mx-9 mt-5 relative font-semibold" style={{color: themeColor, borderColor: themeColor}}>
            <h1 className="text-5xl font-bold mb-7 md:mb-9">Let's Split!</h1>
            <form onSubmit={handleSubmit} className="splitForm wi-full lg:w-10/12">
                <fieldset className="splitInfor text-3xl mt-12 m-7 flex flex-col gap-6">
                    <FormInput
                        icon={<MdDescription />}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        themeColor = {themeColor}
                        placeholder="Please enter description"
                    />
                    <FormInput
                        icon={<RiMoneyDollarCircleFill />}
                        name="totalcost"
                        value={formData.totalcost}
                        onChange={handleChange}
                        themeColor = {themeColor}
                        placeholder="Please enter total cost"
                        type="number"
                    />
                    <label htmlFor="paidBy" className="flex items-center">
                        <span className="pr-2 whitespace-nowrap">Paid By:</span>
                        <select 
                            name="paidBy" 
                            className="border-1 text-slate-400" 
                            required 
                            value={formData.paidBy}
                            onChange={handleChange}
                        >
                            <option value="">--Select--</option>
                            <option value="user">Me</option>
                            {friendsData.map((friend) => (
                                <option key={friend._id} value={friend.name}>{friend.name}</option>
                            ))}
                        </select>
                    </label>
                </fieldset>

                <SplitTypeButtons splitInDetail={splitInDetail} setSplitInDetail={setSplitInDetail} themeColor={themeColor} />

                <p className="pr-2 m-7 text-3xl whitespace-nowrap">Split with:</p>
                <fieldset className="splitWithForm overflow-y-auto flex flex-col justify-between gap-5">
                    <ParticipantCheckbox 
                        name="me" 
                        label="Me" 
                        splitInDetail={splitInDetail} 
                        checked={selectedParticipants.me || false}
                        onChange={handleParticipantChange}
                        themeColor={themeColor}
                    />
                    {friendsData.map((friend) => (
                        <ParticipantCheckbox 
                            key={friend._id}
                            name={friend.name}
                            label={friend.name}
                            splitInDetail={splitInDetail}
                            checked={selectedParticipants[friend.name] || false}
                            onChange={handleParticipantChange}
                            themeColor={themeColor}
                        />
                    ))}
                </fieldset>
                <button type="submit" className="submitBtn p-2 m-7 w-11/12 text-white rounded-md" style={{backgroundColor: themeColor}}>OK</button>
            </form>
        </div>
    );
};

const FormInput = ({ icon, name, value, onChange, placeholder, themeColor, type = "text" }) => (
    <label htmlFor={name} className="flex items-center text-3xl">
        <span className="p-1 mr-2 w-12 h-12 text-4xl rounded-full flex items-center justify-center" style={{backgroundColor: themeColor, color:"white"}}>
            {icon}
        </span>
        <input 
            type={type} 
            name={name} 
            className="border-2" 
            required 
            value={value} 
            placeholder={placeholder} 
            onChange={onChange} 
        />
    </label>
);

const SplitTypeButtons = ({ splitInDetail, setSplitInDetail, themeColor }) => (
    <div className="flex gap-4 items-center pr-5 m-7">
        <p className="pr-2 text-3xl whitespace-nowrap">Split:</p>
        {['Equally', 'In Detail'].map(type => (
            <button
                key={type}
                type="button"
                className={`p-2 flex-1 text-2xl text-white rounded-md ${splitInDetail === (type === 'In Detail') ? 'opacity-100' : 'opacity-70'}`}
                style={{backgroundColor: themeColor}}
                onClick={() => setSplitInDetail(type === 'In Detail')}
            >
                {type}
            </button>
        ))}
    </div>
);

const ParticipantCheckbox = ({ name, label, splitInDetail, checked, onChange, themeColor }) => (
    <label htmlFor={`participants-${name}`} className="text-2xl flex items-center">
        <input 
            type="checkbox" 
            className="mr-2" 
            name={name} 
            id={`participants-${name}`} 
            checked={checked}
            onChange={onChange}
        />
        <span className="mr-2">{label}:</span>
        {splitInDetail && (
            <input 
                type="number" 
                name={`detailcost-${name}`} 
                placeholder="$"
                className="costbox border-1 rounded-sm text-2xl" 
                style={{ borderColor: themeColor }} 
            />
        )}
    </label>
);
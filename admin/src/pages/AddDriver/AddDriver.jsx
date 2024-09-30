import React, { useState } from 'react';
import './AddDriver.css'; // Make sure to create and style this CSS file
import axios from 'axios';
import { toast } from 'react-toastify';
import { url } from '../../assets/assets'; // Adjust the import path as necessary

const AddDriver = () => {
    const [data, setData] = useState({
        name: "",
        phone: "",
        location: "",
        email: ""
    });

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${url}/api/driver/add`, data);
            if (response.data.success) {
                toast.success("Driver added successfully!");
                setData({
                    name: "",
                    phone: "",
                    location: "",
                    email: ""
                });
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("An error occurred while adding the driver.");
        }
    };

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    return (
        <div className='add-driver'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-driver-name flex-col'>
                    <p>Driver Name</p>
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Type here' required />
                </div>
                <div className='add-driver-phone flex-col'>
                    <p>Driver Phone</p>
                    <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Type here' required />
                </div>
                <div className='add-driver-location flex-col'>
                    <p>Driver Location</p>
                    <input name='location' onChange={onChangeHandler} value={data.location} type="text" placeholder='Type here' required />
                </div>
                <div className='add-driver-email flex-col'>
                    <p>Driver Email</p>
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Type here' required />
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    );
};

export default AddDriver;

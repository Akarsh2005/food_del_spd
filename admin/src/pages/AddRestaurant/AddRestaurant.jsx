import React, { useState } from 'react';
import './AddRestaurant.css'; // Make sure to create and style this CSS file
import { assets, url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddRestaurant = () => {
    const [data, setData] = useState({
        name: "",
        address: "",
        phone: ""
    });

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const response = await axios.post(`${url}/api/restaurant/add`, data);
        if (response.data.success) {
            toast.success(response.data.message);
            setData({
                name: "",
                address: "",
                phone: ""
            });
        } else {
            toast.error(response.data.message);
        }
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    return (
        <div className='add-restaurant'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-restaurant-name flex-col'>
                    <p>Restaurant name</p>
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Type here' required />
                </div>
                <div className='add-restaurant-address flex-col'>
                    <p>Restaurant address</p>
                    <input name='address' onChange={onChangeHandler} value={data.address} type="text" placeholder='Type here' required />
                </div>
                <div className='add-restaurant-phone flex-col'>
                    <p>Restaurant phone</p>
                    <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Type here' required />
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    );
}

export default AddRestaurant;

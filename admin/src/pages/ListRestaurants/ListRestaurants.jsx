import React, { useEffect, useState } from 'react';
import './ListRestaurants.css'; // You can reuse the existing List.css or create a new one for restaurants if needed
import { url } from '../../assets/assets'; // Ensure you have the correct URL for your API
import axios from 'axios';
import { toast } from 'react-toastify';

const ListRestaurants = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/restaurant/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching restaurants");
      }
    } catch (error) {
      toast.error("Error fetching restaurants");
    }
  };

  const removeRestaurant = async (restaurantId) => {
    try {
      const response = await axios.delete(`${url}/api/restaurant/${restaurantId}`);
      if (response.data.success) {
        fetchList(); // Refresh the list after deletion
        toast.success(response.data.message);
      } else {
        toast.error("Error deleting restaurant");
      }
    } catch (error) {
      toast.error("Error deleting restaurant");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Restaurants List</p>
      <div className='list-table'>
        <div className="list-table-format title">
          <b>Name</b>
          <b>Address</b>
          <b>Phone</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <p>{item.name}</p>
            <p>{item.address}</p>
            <p>{item.phone}</p>
            <p className='cursor' onClick={() => removeRestaurant(item._id)}>x</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListRestaurants;

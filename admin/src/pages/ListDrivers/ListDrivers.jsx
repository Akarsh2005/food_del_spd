import React, { useEffect, useState } from 'react';
import './ListDrivers.css'; // Ensure to create and style this CSS file for drivers
import { url } from '../../assets/assets'; // Ensure you have the correct URL for your API
import axios from 'axios';
import { toast } from 'react-toastify';

const ListDrivers = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/driver/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching drivers");
      }
    } catch (error) {
      toast.error("Error fetching drivers");
    }
  };

  const removeDriver = async (driverId) => {
    try {
      const response = await axios.delete(`${url}/api/driver/${driverId}`);
      if (response.data.success) {
        fetchList(); // Refresh the list after deletion
        toast.success(response.data.message);
      } else {
        toast.error("Error deleting driver");
      }
    } catch (error) {
      toast.error("Error deleting driver");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Drivers List</p>
      <div className='list-table'>
        <div className="list-table-format title">
          <b>Name</b>
          <b>Phone</b>
          <b>Location</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <p>{item.name}</p>
            <p>{item.phone}</p>
            <p>{item.location}</p>
            <p className='cursor' onClick={() => removeDriver(item._id)}>x</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListDrivers;

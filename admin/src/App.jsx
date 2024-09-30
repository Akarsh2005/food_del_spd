import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import AddRestaurant from './pages/AddRestaurant/AddRestaurant';
import ListRestaurants from './pages/ListRestaurants/ListRestaurants';
import AddDriver from './pages/AddDriver/AddDriver';
import ListDrivers from './pages/ListDrivers/ListDrivers';
import Payment from './pages/Payment/Payment';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='app'>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className='app-content'>
        <Sidebar />
        <Routes>
          <Route path='/add' element={<Add />} />
          <Route path='/list' element={<List />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/add-restaurant' element={<AddRestaurant />} />
          <Route path='/list-restaurant' element={<ListRestaurants />} />
          <Route path='/add-driver' element={<AddDriver />} />
          <Route path='/list-drivers' element={<ListDrivers />} />
          <Route path='/payments' element={<Payment />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

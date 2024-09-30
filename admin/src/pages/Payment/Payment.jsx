import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Payment.css'; // Ensure to create and style this CSS file for payments
import { toast } from 'react-toastify';
import { url } from '../../assets/assets'; // Ensure you have the correct URL for your API

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${url}/api/payments`);
        if (response.data.success) {
          setPayments(response.data.data);
        } else {
          toast.error("Error fetching payments");
        }
        setLoading(false);
      } catch (err) {
        toast.error("Error fetching payments");
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const deletePayment = async (paymentId) => {
    try {
      const response = await axios.delete(`${url}/api/payments/${paymentId}`);
      if (response.data.success) {
        setPayments(payments.filter(payment => payment._id !== paymentId));
        toast.success(response.data.message);
      } else {
        toast.error("Error deleting payment");
      }
    } catch (err) {
      toast.error("Error deleting payment");
    }
  };

  if (loading) return <p>Loading payments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='payment add flex-col'>
      <p>All Payments List</p>
      <div className='payment-table'>
        <div className="payment-table-format title">
          <b>User ID</b>
          <b>Order ID</b>
          <b>Amount</b>
          <b>Status</b>
          <b>Payment Method</b>
          <b>Date</b>
          <b>Action</b>
        </div>
        {payments.map((payment, index) => (
          <div key={index} className='payment-table-format'>
            <p>{payment.userId}</p>
            <p>{payment.orderId}</p>
            <p>{payment.amount}</p>
            <p>{payment.status}</p>
            <p>{payment.paymentMethod}</p>
            <p>{new Date(payment.paymentDate).toLocaleDateString()}</p>
            <p className='cursor' onClick={() => deletePayment(payment._id)}>x</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payment;

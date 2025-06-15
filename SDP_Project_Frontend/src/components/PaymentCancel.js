import React, { useEffect, useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import './PaymentCancel.css';
// import { useSelector } from 'react-redux';

const PaymentCancel = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('Payment was cancelled');
  
  const location = useLocation();
  // const user = useSelector(state => state.User);
  
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  // const token = user.token;

  useEffect(() => {
    const handleCancelledPayment = async () => {
      try {
        if (token) {
          // Notify the backend about the cancelled payment
          await axios.get(/*`http://localhost:5000/api/payments/cancel-paypal-order?token=${token}`*/`https://homehub360.onrender.com/api/payments/cancel-paypal-order?token=${token}`);
        }
      } catch (err) {
        console.error('Error handling cancelled payment:', err);
        setError('Payment was cancelled: ' + (err.response?.data?.message || err.message));
        Navigate('/search_property');
      } finally {
        setLoading(false);
      }
    };
    
    handleCancelledPayment();
  }, [token]);
  
  if (loading) {
    return <div className="payment-result-container loading">Processing cancellation...</div>;
  }
  
  return (
    <div className="payment-result-container cancel">
      <div className="result-icon cancel-icon">
        <i className="fas fa-times-circle"></i>
      </div>
      
      <h1>Payment Cancelled</h1>
      <p>Your payment process has been cancelled.</p>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="action-buttons">
        <Link to="/search_property" className="btn primary-btn">
          Back to Properties
        </Link>
        
        <Link to="/contact" className="btn secondary-btn">
          Need Help? Contact Us
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancel;

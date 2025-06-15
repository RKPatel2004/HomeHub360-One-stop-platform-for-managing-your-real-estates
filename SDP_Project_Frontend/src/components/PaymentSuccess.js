import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaymentResult.css';
import {  useSelector } from 'react-redux';


const PaymentSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const user = useSelector(state => state.User)
  const [error, setError] = useState(null);
  const [propertyId, setPropertyId] = useState(null);


  
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);
  
  const orderId = useMemo(() => searchParams.get('orderId'), [searchParams]);
  
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        if (orderId) {
          console.log('Order ID:', orderId);
          
          const token = user.token;
          console.log('Token:', token);
          const config = token 
            ? { headers: { Authorization: `Bearer ${token}` } }
            : {};
          
          const { data } = await axios.get(
            /*`http://localhost:5000/api/payments/details?orderId=${orderId}`*/`https://homehub360.onrender.com/api/payments/details?orderId=${orderId}`,
            config
          );
          
          console.log('Payment details response:', data);
          
          if (data.success) {
            if (data.token) {
              localStorage.setItem('token', data.token);
            }
            
            setPaymentDetails(data.payment);
            setPropertyId(data.payment.propertyId);
          } else {
            throw new Error(data.message || 'Failed to get payment details');
          }
          
          setLoading(false);
        } else {
          setError('Payment information not found in the URL');
          setLoading(false);
        }
      } catch (error) {
        console.error('Payment processing error:', error);
        setError('Failed to process payment: ' + (error.response?.data?.message || error.message));
        setLoading(false);
      }
    };
    
    fetchPaymentDetails();
  }, [orderId, user.token]);
  
  const handleDashboardClick = () => {
    const token = user.token;
    console.log('Token:', token);
    if (token) {
      navigate('/customer_dashboard');
    } else {
      navigate('/login');
    }
  };
  
  if (loading) {
    return (
      <div className="payment-container">
        <div className="payment-card loading-card">
          <div className="loading-spinner"></div>
          <h2>Processing your payment</h2>
          <p>Please wait while we confirm your transaction...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="payment-container">
      <div className="payment-card success-card">
        {error ? (
          <>
            <div className="result-icon error-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </div>
            <h1>Payment Failed</h1>
            <p className="error-message">{error}</p>
          </>
        ) : (
          <>
            <div className="result-icon success-icon">
              <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
            </div>
            
            <h1>Payment Successful!</h1>
            
            <p className="result-message">Thank you for your payment. Your transaction has been completed successfully.</p>
            
            {orderId && <div className="payment-id">Order ID: <span>{orderId}</span></div>}
            
            {paymentDetails && (
              <div className="payment-details">
                <h2>Payment Details</h2>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Amount</span>
                    <span className="detail-value">{paymentDetails.amount} USD</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Payment Type</span>
                    <span className="detail-value">{paymentDetails.paymentType}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Date</span>
                    <span className="detail-value">{new Date(paymentDetails.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        
        <div className="action-buttons">
          <button onClick={handleDashboardClick} className="button primary">
            Go to Dashboard
          </button>
          
          {propertyId ? (
            <Link to={`/property/${propertyId}?fromPayment=true`} className="button secondary">
              View Property
            </Link>
          ) : (
            <Link to="/search_property" className="button secondary">
              Browse More Properties
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
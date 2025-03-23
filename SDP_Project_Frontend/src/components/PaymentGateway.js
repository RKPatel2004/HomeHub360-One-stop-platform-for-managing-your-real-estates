import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PaymentGateway.css';
import { useSelector } from 'react-redux';

const PaymentGateway = ({ propertyId, amount, paymentType, description, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ownerId, setOwnerId] = useState(null);
  const user = useSelector(state => state.User);


  
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const token = user.token;
        if (!token || !propertyId) return;
        
        const response = await axios.get(
          `http://localhost:5000/api/property/${propertyId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        if (response.data && response.data.ownerId) {
          setOwnerId(response.data.ownerId);
        }
      } catch (err) {
        console.error('Error fetching property owner details:', err);
      }
    };
    
    fetchPropertyDetails();
  }, [propertyId, user.token]);
  
  const initiatePayment = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = user.token;
      const userId = user.uid;
      
      if (!token) {
        setError('You must be logged in to make a payment');
        setLoading(false);
        return;
      }
      
      if (!userId) {
        setError('User information not found. Please log in again.');
        setLoading(false);
        return;
      }
      
      // Check if all required data is available
      if (!propertyId) {
        setError('Property information is missing');
        setLoading(false);
        return;
      }
      
      if (!amount || isNaN(amount)) {
        setError('Valid amount is required');
        setLoading(false);
        return;
      }
      
      if (!paymentType) {
        setError('Payment type is required');
        setLoading(false);
        return;
      }
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      
      // Calculate the frontend base URL for the return URLs
      // Using hash-based URLs
      const frontendBaseUrl = window.location.origin;
      const returnUrl = `${frontendBaseUrl}/#/payment-success`;
      const cancelUrl = `${frontendBaseUrl}/#/payment-cancel`;
      
      console.log('Return URLs:', {
        returnUrl,
        cancelUrl
      });
      
      const { data } = await axios.post(
        'http://localhost:5000/api/payments/create-paypal-order',
        {
          userId,
          propertyId,
          ownerId, // Include the owner ID in the request
          paymentType,
          amount,
          currency: 'USD',
          description,
          returnUrl,
          cancelUrl
        },
        config
      );
      
      if (data.success && data.order) {
        // Ensure token and userId are stored before PayPal redirect
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        
        // Find the approval URL from PayPal response
        const approvalLink = data.order.links.find(link => link.rel === 'approve');
        
        if (approvalLink && approvalLink.href) {
          // Redirect to PayPal approval page
          window.location.href = approvalLink.href;
        } else {
          setError('Could not find PayPal approval URL');
        }
      } else {
        setError('Failed to initiate payment process');
      }
    } catch (error) {
      console.error('Payment initiation error:', error);
      setError(
        error.response?.data?.details || 
        error.response?.data?.message || 
        'Failed to initiate payment. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="payment-gateway">
      <h2>Payment Details</h2>
      
      <div className="payment-summary">
        <p><strong>Amount:</strong> ${amount?.toLocaleString() || '0'}</p>
        <p><strong>Payment Type:</strong> {paymentType === 'BOOKING' ? 'Purchase' : paymentType}</p>
        {description && <p><strong>Description:</strong> {description}</p>}
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <button 
        onClick={initiatePayment}
        disabled={loading}
        className="paypal-button"
      >
        {loading ? 'Processing...' : 'Pay with PayPal'}
      </button>
      
      <div className="payment-note">
        <p>You will be redirected to PayPal to complete your payment securely.</p>
        <p>For testing, use your sandbox buyer account credentials.</p>
      </div>
    </div>
  );
};

export default PaymentGateway;
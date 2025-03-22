import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './Feedback.css';

const Feedback = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [property, setProperty] = useState(null);
  const [propertyLoading, setPropertyLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(state => state.User);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const propertyId = queryParams.get('propertyId');

    if (!propertyId) {
      setError('Property ID is missing. Please try again.');
      return;
    }

    // Fetch property details with authentication
    const fetchPropertyDetails = async () => {
      setPropertyLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/property/${propertyId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        );
        setProperty(response.data);
      } catch (err) {
        console.error('Error fetching property details:', err);
        setError(err.response?.data?.message || 'Failed to load property details. Please try again.');
      } finally {
        setPropertyLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [location.search, user.token]);

  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating.');
      return;
    }

    if (!feedbackText.trim()) {
      setError('Please provide feedback text.');
      return;
    }

    const queryParams = new URLSearchParams(location.search);
    const propertyId = queryParams.get('propertyId');

    if (!propertyId) {
      setError('Property ID is missing. Please try again.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/feedback',
        {
          propertyId,
          feedbackText,
          rating
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        setFeedbackText('');
        setRating(0);
        setTimeout(() => {
          navigate('/customer_dashboard');
        }, 3000);
      }
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setError(err.response?.data?.message || 'Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-container">
      <button 
        className="back-to-home-btn" 
        onClick={() => navigate('/')}
      >
        <i className="fas fa-arrow-left"></i> Back to Home
      </button>

      <h1>Property Feedback</h1>
      
      {success ? (
        <div className="success-message">
          <i className="fas fa-check-circle"></i>
          <p>Thank you for your feedback! Redirecting you back to your dashboard...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="rating-container">
            <h3>Rate your experience</h3>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= rating ? "star filled" : "star"}
                  onClick={() => handleRatingChange(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="rating-label">
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </p>
          </div>

          <div className="feedback-text-container">
            <label htmlFor="feedbackText">Your Feedback</label>
            <textarea
              id="feedbackText"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Please share your experience with this property..."
              rows="5"
              required
            />
          </div>

          {/* Property details section */}
          <div className="property-details-container">
            <h3>Property Details</h3>
            {propertyLoading ? (
              <p>Loading property details...</p>
            ) : error ? (
              <p className="error-text">{error}</p>
            ) : property ? (
              <div className="property-details">
                <div className="property-detail">
                  <span className="detail-label">Title:</span>
                  <span className="detail-value">{property.title || "N/A"}</span>
                </div>
                <div className="property-detail">
                  <span className="detail-label">Address:</span>
                  <span className="detail-value">{property.address || "N/A"}</span>
                </div>
                <div className="property-detail">
                  <span className="detail-label">Area:</span>
                  <span className="detail-value">{property.area ? `${property.area} sq ft` : "N/A"}</span>
                </div>
              </div>
            ) : (
              <p>No property details available</p>
            )}
          </div>

          {error && !propertyLoading && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              <p>{error}</p>
            </div>
          )}

          <button 
            type="submit" 
            className="submit-feedback-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i>
                <span>Submit Feedback</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default Feedback;

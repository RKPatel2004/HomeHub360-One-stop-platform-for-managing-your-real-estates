import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ImageGallery from './ImageGallery';
import PaymentGateway from './PaymentGateway';
import './ViewProperty.css';
import { useSelector } from 'react-redux';

const ViewProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    amount: 0,
    paymentType: '',
    description: ''
  });
  const user = useSelector(state => state.User);

  // Check if returning from payment
  const [isReturningFromPayment, setIsReturningFromPayment] = useState(false);

  useEffect(() => {
    // Check if we're returning from a payment
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('fromPayment')) {
      setIsReturningFromPayment(true);
    }
  }, [location]);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const token = user.token;
        if (!token) {
          setError('You must be logged in to view property details');
          setLoading(false);
          return;
        }

        const response = await axios.get(
          /*`http://localhost:5000/api/property/${id}`*/`https://homehub360.onrender.com/api/property/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setProperty(response.data);
        setLoading(false);

        // Track property view after successful fetch
        trackPropertyView(response.data);
      } catch (err) {
        console.error('Error fetching property details:', err);
        setError(
          err.response?.data?.message || 'Failed to load property details'
        );
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, isReturningFromPayment, user.token]);

  // New function to track property view
  const trackPropertyView = async (propertyData) => {
    try {
      const propertyType = getPropertyType(propertyData).toLowerCase();
      
      await axios.post(
        /*`http://localhost:5000/api/views/${propertyType}/${id}/view`*/`https://homehub360.onrender.com/api/views/${propertyType}/${id}/view`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
    } catch (err) {
      console.error('Error tracking property view:', err);
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleBuyProperty = () => {
    if (!property || !property.price) {
      alert('Property price is not available');
      return;
    }
    
    setPaymentDetails({
      amount: property.price,
      paymentType: 'BOOKING',
      description: `Purchase booking for ${property.title || 'property'}`
    });
    setShowPayment(true);
  };

  const handleRentProperty = () => {
    if (!property || !property.rentPrice) {
      alert('Property rent price is not available');
      return;
    }
    
    setPaymentDetails({
      amount: property.rentPrice,
      paymentType: 'RENT',
      description: `Rent payment for ${property.title || 'property'}`
    });
    setShowPayment(true);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
  };

  const getPropertyType = (property) => {
    // First check if the property has a propertyType field
    if (property.propertyType) return property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1);
    
    // Check for type field
    if (property.type) return property.type.charAt(0).toUpperCase() + property.type.slice(1);
    
    // Check for specific properties to determine the type
    if (property.hasOwnProperty('swimmingPool') || property.hasOwnProperty('gardenArea')) return 'Farmhouse';
    if (property.hasOwnProperty('bedrooms') && property.hasOwnProperty('bathrooms') && !property.hasOwnProperty('swimmingPool')) return 'Apartment';
    if (property.hasOwnProperty('zoningType')) return 'Land';
    if (property.hasOwnProperty('parkingSpaces') || (property.hasOwnProperty('floor') && property.floor !== undefined)) return 'Office';
    
    // Default case if we can't determine the type
    return 'Property';
  };

  const renderPropertyDetails = () => {
    if (!property) return null;
    
    const propertyType = getPropertyType(property);

    // Render specific property details based on property type
    switch (propertyType.toLowerCase()) {
      case 'apartment':
        return (
          <div className="specific-details">
            <h3>Apartment Details</h3>
            <div className="details-grid">
              {property.bedrooms !== undefined && (
                <div className="detail-item">
                  <span className="detail-label">Bedrooms:</span>
                  <span className="detail-value">{property.bedrooms}</span>
                </div>
              )}
              {property.bathrooms !== undefined && (
                <div className="detail-item">
                  <span className="detail-label">Bathrooms:</span>
                  <span className="detail-value">{property.bathrooms}</span>
                </div>
              )}
              {property.balconies !== undefined && (
                <div className="detail-item">
                  <span className="detail-label">Balconies:</span>
                  <span className="detail-value">{property.balconies}</span>
                </div>
              )}
              {property.furnishingStatus && (
                <div className="detail-item">
                  <span className="detail-label">Furnishing Status:</span>
                  <span className="detail-value">{property.furnishingStatus}</span>
                </div>
              )}
              {property.floor !== undefined && (
                <div className="detail-item">
                  <span className="detail-label">Floor:</span>
                  <span className="detail-value">{property.floor}</span>
                </div>
              )}
              {property.area && (
                <div className="detail-item">
                  <span className="detail-label">Area:</span>
                  <span className="detail-value">{property.area} sq ft</span>
                </div>
              )}
            </div>
          </div>
        );
      case 'farmhouse':
        return (
          <div className="specific-details">
            <h3>Farmhouse Details</h3>
            <div className="details-grid">
              {property.bedrooms !== undefined && (
                <div className="detail-item">
                  <span className="detail-label">Bedrooms:</span>
                  <span className="detail-value">{property.bedrooms}</span>
                </div>
              )}
              {property.bathrooms !== undefined && (
                <div className="detail-item">
                  <span className="detail-label">Bathrooms:</span>
                  <span className="detail-value">{property.bathrooms}</span>
                </div>
              )}
              {property.gardenArea !== undefined && (
                <div className="detail-item">
                  <span className="detail-label">Garden Area:</span>
                  <span className="detail-value">{property.gardenArea} sq ft</span>
                </div>
              )}
              {property.swimmingPool !== undefined && (
                <div className="detail-item">
                  <span className="detail-label">Swimming Pool:</span>
                  <span className="detail-value">{property.swimmingPool ? 'Yes' : 'No'}</span>
                </div>
              )}
              {property.furnishingStatus && (
                <div className="detail-item">
                  <span className="detail-label">Furnishing Status:</span>
                  <span className="detail-value">{property.furnishingStatus}</span>
                </div>
              )}
              {property.area && (
                <div className="detail-item">
                  <span className="detail-label">Area:</span>
                  <span className="detail-value">{property.area} sq ft</span>
                </div>
              )}
            </div>
          </div>
        );
      case 'land':
        return (
          <div className="specific-details">
            <h3>Land Details</h3>
            <div className="details-grid">
              {property.area && (
                <div className="detail-item">
                  <span className="detail-label">Area:</span>
                  <span className="detail-value">{property.area} sq ft</span>
                </div>
              )}
              {property.zoningType && (
                <div className="detail-item">
                  <span className="detail-label">Zoning Type:</span>
                  <span className="detail-value">{property.zoningType}</span>
                </div>
              )}
            </div>
          </div>
        );
      case 'office':
        return (
          <div className="specific-details">
            <h3>Office Details</h3>
            <div className="details-grid">
              {property.area && (
                <div className="detail-item">
                  <span className="detail-label">Area:</span>
                  <span className="detail-value">{property.area} sq ft</span>
                </div>
              )}
              {property.floor !== undefined && (
                <div className="detail-item">
                  <span className="detail-label">Floor:</span>
                  <span className="detail-value">{property.floor}</span>
                </div>
              )}
              {property.totalFloors !== undefined && (
                <div className="detail-item">
                  <span className="detail-label">Total Floors:</span>
                  <span className="detail-value">{property.totalFloors}</span>
                </div>
              )}
              {property.parkingSpaces !== undefined && (
                <div className="detail-item">
                  <span className="detail-label">Parking Spaces:</span>
                  <span className="detail-value">{property.parkingSpaces}</span>
                </div>
              )}
              {property.furnishingStatus && (
                <div className="detail-item">
                  <span className="detail-label">Furnishing Status:</span>
                  <span className="detail-value">{property.furnishingStatus}</span>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="specific-details">
            <h3>Property Details</h3>
            <p>No specific details available for this property type.</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="view-property-container">
        <div className="loading-message">Loading property details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="view-property-container">
        <div className="error-message">{error}</div>
        <button className="back-button" onClick={handleBack}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="view-property-container">
        <div className="error-message">Property not found</div>
        <button className="back-button" onClick={handleBack}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
      </div>
    );
  }

  return (
    <div className="view-property-container">
      {showPayment ? (
        <div className="payment-overlay">
          <div className="payment-modal">
            <button className="close-button" onClick={handleClosePayment}>×</button>
            <PaymentGateway 
              propertyId={property._id}
              amount={paymentDetails.amount}
              paymentType={paymentDetails.paymentType}
              description={paymentDetails.description}
              onClose={handleClosePayment}
            />
          </div>
        </div>
      ) : (
        <div className="property-view-content">
          <div className="back-button-container">
            <button className="back-button" onClick={handleBack}>
              <i className="fas fa-arrow-left"></i> Back
            </button>
          </div>
          
          <div className="property-header">
            <h1 className="property-title">{property.title || 'Untitled Property'}</h1>
            <div className="property-type-badge">{getPropertyType(property)}</div>
          </div>
          
          <div className="property-images">
            <ImageGallery images={property.images || []} />
          </div>
          
          <div className="property-general-info">
            <div className="info-section price-info">
              {property.isForSale && (
                <div className="info-item">
                  <h3>Price:</h3>
                  <p className="price">${property.price?.toLocaleString() || 'Not specified'}</p>
                </div>
              )}
              {property.isForRent && (
                <div className="info-item">
                  <h3>Rent:</h3>
                  <p className="rent">${property.rentPrice?.toLocaleString() || 'Not specified'} / month</p>
                </div>
              )}
            </div>
            
            <div className="info-section location-info">
              <h3>Location:</h3>
              <p>{property.address || 'Address not available'}</p>
              {property.city && <p>City: {property.city}</p>}
              {property.state && <p>State: {property.state}</p>}
              {property.pincode && <p>Pincode: {property.pincode}</p>}
            </div>
          </div>
          {renderPropertyDetails()}
          
          <div className="property-status">
            <h3>Status</h3>
            <p>{property.status || 'Not specified'}</p>
          </div>
          
          <div className="property-action-buttons">
            {property.isForSale && (
              <button className="buy-button action-button" onClick={handleBuyProperty}>
                Buy Property
              </button>
            )}
            {property.isForRent && (
              <button className="rent-button action-button" onClick={handleRentProperty}>
                Rent Property
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProperty;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './CustomerDashboard.css';
// import ImageGallery from './ImageGallery';
// import { useSelector } from 'react-redux';

// const CustomerDashboard = () => {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('all');
//   const navigate = useNavigate();
//   const user = useSelector(state => state.User);
  
//   useEffect(() => {
//     const fetchBookedProperties = async () => {
//       try {
//         const token = user.token;
        
//         if (!token) {
//           navigate('/login');
//           return;
//         }

//         const response = await axios.get('http://localhost:5000/api/booked-properties', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         if (response.data.success) {
//           setProperties(response.data.properties);
//         } else {
//           setError('Failed to fetch booked properties');
//         }
//       } catch (err) {
//         console.error('Error fetching booked properties:', err);
//         setError('An error occurred while fetching your properties');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookedProperties();
//   }, [navigate, user.token]);

//   const getFilteredProperties = () => {
//     if (activeTab === 'all') {
//       return properties;
//     }
//     return properties.filter(property => property.type === activeTab);
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long', 
//       day: 'numeric'
//     });
//   };

//   const getLatestPayment = (payments) => {
//     if (!payments || payments.length === 0) return null;
    
//     return payments.reduce((latest, current) => {
//       return new Date(current.paymentDate) > new Date(latest.paymentDate) ? current : latest;
//     }, payments[0]);
//   };

//   // Function to determine color based on days left
//   const getTimerColor = (daysLeft) => {
//     if (daysLeft > 14) return { color: 'green' };
//     if (daysLeft >= 8 && daysLeft <= 14) return { color: '#FFD700' }; // Gold/Yellow color
//     return { color: 'red' };
//   };

//   // const viewPropertyDetails = (propertyId, type) => {
//   //   navigate(`/property/${type}/${propertyId}`);
//   // };

//   const renderPropertyCard = (property) => {
//     const { type, property: propertyData, payments } = property;
//     const latestPayment = getLatestPayment(payments);
    
//     return (
//       <div className="property-card" key={propertyData._id}>
//         <div className="property-image">
//           <ImageGallery images={propertyData.images || []} />
//           <span className="property-type">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
//           <span className="property-status">{propertyData.status}</span>
//         </div>
        
//         <div className="property-details">
//           <h3>{propertyData.title}</h3>
//           <p className="property-address">
//             <i className="fas fa-map-marker-alt"></i> {propertyData.address}
//           </p>
          
//           <div className="property-specs">
//             <div className="spec">
//               <i className="fas fa-ruler-combined"></i>
//               <span>{propertyData.area} sq ft</span>
//             </div>
            
//             {type === 'apartment' || type === 'farmhouse' ? (
//               <>
//                 <div className="spec">
//                   <i className="fas fa-bed"></i>
//                   <span>{propertyData.bedrooms} Beds</span>
//                 </div>
//                 <div className="spec">
//                   <i className="fas fa-bath"></i>
//                   <span>{propertyData.bathrooms} Baths</span>
//                 </div>
//               </>
//             ) : null}
            
//             {type === 'land' && (
//               <div className="spec">
//                 <i className="fas fa-tag"></i>
//                 <span>{propertyData.zoningType}</span>
//               </div>
//             )}
            
//             {type === 'office' && (
//               <div className="spec">
//                 <i className="fas fa-building"></i>
//                 <span>Floor {propertyData.floor}</span>
//               </div>
//             )}
//           </div>
          
//           <div className="property-description" style={{ maxHeight: '100px', overflowY: 'auto', padding: '5px', marginBottom: '10px' }}>
//             <p><strong>Description:</strong> {propertyData.description || 'No description available'}</p>
//           </div>
          
//           {(type === 'apartment' || type === 'farmhouse' || type === 'office') && (
//             <div className="furnishing-status">
//               <p><strong>Furnishing:</strong> {propertyData.furnishingStatus || 'Not specified'}</p>
//             </div>
//           )}
          
//           <div className="payment-info">
//             <p>
//               <strong>Last payment:</strong> {latestPayment ? `${latestPayment.amount} USD (${latestPayment.paymentType})` : 'N/A'}
//             </p>
//             <p>
//               <strong>Date:</strong> {latestPayment ? formatDate(latestPayment.paymentDate) : 'N/A'}
//             </p>
//           </div>
          
//           <div className="property-price">
//             {latestPayment && latestPayment.paymentType === 'rent' && (
//               <h4>${latestPayment.amount} <span>/month</span></h4>
//             )}
//             {latestPayment && latestPayment.paymentType === 'buy' && (
//               <h4>${latestPayment.amount}</h4>
//             )}
//             {(!latestPayment && propertyData.isForRent) && (
//               <h4>${propertyData.rentPrice} <span>/month</span></h4>
//             )}
//             {(!latestPayment && propertyData.isForSale) && (
//               <h4>${propertyData.price}</h4>
//             )}
//             {/* Fallback display if none of the above conditions match */}
//             {latestPayment && latestPayment.paymentType !== 'rent' && latestPayment.paymentType !== 'buy' && (
//               <h4>${latestPayment.amount} <span>({latestPayment.paymentType})</span></h4>
//             )}
//           </div>
          
//           {/* Added rental timer with color coding and start date information */}
//           {propertyData.rentalTimer !== null && propertyData.rentalTimer !== undefined && (
//             <p style={getTimerColor(propertyData.rentalTimer)}><strong>{propertyData.rentalTimer} days left</strong></p>
//           )}
//           {propertyData.rentalStartDate && (
//             <p>Start Date: {formatDate(propertyData.rentalStartDate)}</p>
//           )}
          
//           <button 
//             className="give-feedback-btn"
//             onClick={() => navigate(`/feedback?propertyId=${propertyData._id}&type=${type}`)}
//           >
//             <i className="fas fa-comment"></i> Give Feedback
//           </button> 
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="customer-dashboard">
//       <button 
//         className="back-to-home-btn" 
//         onClick={() => navigate('/')}
//         style={{ position: 'absolute', top: '20px', left: '20px' }}
//       >
//         <i className="fas fa-arrow-left"></i> Back to Home
//       </button>
      
//       <div className="dashboard-header">
//         <h1>My Properties</h1>
//         <p>View all properties you have booked or purchased</p>
//       </div>
      
//       <div className="filter-tabs">
//         <button 
//           className={activeTab === 'all' ? 'active' : ''} 
//           onClick={() => setActiveTab('all')}
//         >
//           All Properties
//         </button>
//         <button 
//           className={activeTab === 'apartment' ? 'active' : ''} 
//           onClick={() => setActiveTab('apartment')}
//         >
//           Apartments
//         </button>
//         <button 
//           className={activeTab === 'farmhouse' ? 'active' : ''} 
//           onClick={() => setActiveTab('farmhouse')}
//         >
//           Farmhouses
//         </button>
//         <button 
//           className={activeTab === 'land' ? 'active' : ''} 
//           onClick={() => setActiveTab('land')}
//         >
//           Land
//         </button>
//         <button 
//           className={activeTab === 'office' ? 'active' : ''} 
//           onClick={() => setActiveTab('office')}
//         >
//           Offices
//         </button>
//       </div>
      
//       {loading ? (
//         <div className="loading-container">
//           <div className="loading-spinner"></div>
//           <p>Loading your properties...</p>
//         </div>
//       ) : error ? (
//         <div className="error-message">
//           <i className="fas fa-exclamation-circle"></i>
//           <p>{error}</p>
//         </div>
//       ) : properties.length === 0 ? (
//         <div className="no-properties">
//           <i className="fas fa-home"></i>
//           <h2>No properties found</h2>
//           <p>You have not booked or purchased any properties yet.</p>
//           <button 
//             className="browse-properties-btn"
//             onClick={() => navigate('/search_property')}
//           >
//             Browse Properties
//           </button>
//         </div>
//       ) : (
//         <div className="properties-grid">
//           {getFilteredProperties().map(property => renderPropertyCard(property))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomerDashboard;












import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CustomerDashboard.css';
import ImageGallery from './ImageGallery';
import { useSelector } from 'react-redux';

const CustomerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [remainingDays, setRemainingDays] = useState({});
  const [loadingRemainingDays, setLoadingRemainingDays] = useState({});
  const [showRemainingDays, setShowRemainingDays] = useState({});
  const navigate = useNavigate();
  const user = useSelector(state => state.User);
  
  useEffect(() => {
    const fetchBookedProperties = async () => {
      try {
        const token = user.token;
        
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/booked-properties', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          // Filter out properties with expired rental timer (days left <= 0)
          const validProperties = response.data.properties.filter(property => {
            // If rentalTimer exists and is <= 0, filter it out
            if (property.property.rentalTimer !== null && 
                property.property.rentalTimer !== undefined && 
                property.property.rentalTimer <= 0) {
              return false;
            }
            return true;
          });
          setProperties(validProperties);
          
          // For rental properties, immediately check remaining days to ensure accurate data
          // but don't display them until the user clicks the button
          validProperties.forEach(property => {
            if (isRentalWithRentPayment(property)) {
              checkRemainingDaysInitial(property.property._id);
            }
          });
        } else {
          setError('Failed to fetch booked properties');
        }
      } catch (err) {
        console.error('Error fetching booked properties:', err);
        setError('An error occurred while fetching your properties');
      } finally {
        setLoading(false);
      }
    };

    fetchBookedProperties();
  }, [navigate, user.token]);

  // Function to check remaining days on initial load without showing them
  const checkRemainingDaysInitial = async (propertyId) => {
    try {
      const token = user.token;
      
      const response = await axios.get(`http://localhost:5000/api/property-rent-timer/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        setRemainingDays(prev => ({ 
          ...prev, 
          [propertyId]: response.data.data 
        }));
      }
    } catch (err) {
      console.error('Error fetching remaining days:', err);
      setRemainingDays(prev => ({ 
        ...prev, 
        [propertyId]: { error: 'Failed to fetch remaining days' } 
      }));
    }
  };

  // Update properties whenever remainingDays state changes
  useEffect(() => {
    // Filter out properties with expired rent (0 or fewer days left)
    setProperties(prevProperties => 
      prevProperties.filter(property => {
        const propertyId = property.property._id;
        // If we have checked this property and it has 0 or fewer days, filter it out
        if (remainingDays[propertyId] && 
            remainingDays[propertyId].remainingDays !== undefined && 
            remainingDays[propertyId].remainingDays <= 0) {
          return false;
        }
        return true;
      })
    );
  }, [remainingDays]);

  const getFilteredProperties = () => {
    if (activeTab === 'all') {
      return properties;
    }
    return properties.filter(property => property.type === activeTab);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  const getLatestPayment = (payments) => {
    if (!payments || payments.length === 0) return null;
    
    return payments.reduce((latest, current) => {
      return new Date(current.paymentDate) > new Date(latest.paymentDate) ? current : latest;
    }, payments[0]);
  };

  // Function to determine color based on days left
  const getTimerColor = (daysLeft) => {
    if (daysLeft >= 15) return { color: 'green' };
    if (daysLeft >= 8 && daysLeft < 15) return { color: '#FFD700' }; // Gold/Yellow color
    return { color: 'red' };
  };

  // Helper function to check if property is a rental with rent payment
  const isRentalWithRentPayment = (property) => {
    const { payments } = property;
    const latestPayment = getLatestPayment(payments);
    
    // Check if latest payment is rent (case insensitive check)
    return latestPayment && 
           latestPayment.paymentType && 
           latestPayment.paymentType.toLowerCase() === 'rent';
  };

  // Function to check remaining days when button is clicked
  const checkRemainingDays = async (propertyId) => {
    try {
      // Toggle display state
      setShowRemainingDays(prev => ({
        ...prev,
        [propertyId]: !prev[propertyId]
      }));

      // If we're hiding the display, don't need to fetch again
      if (showRemainingDays[propertyId]) {
        return;
      }

      setLoadingRemainingDays(prev => ({ ...prev, [propertyId]: true }));
      const token = user.token;
      
      const response = await axios.get(`http://localhost:5000/api/property-rent-timer/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        setRemainingDays(prev => ({ 
          ...prev, 
          [propertyId]: response.data.data 
        }));
      }
    } catch (err) {
      console.error('Error fetching remaining days:', err);
      setRemainingDays(prev => ({ 
        ...prev, 
        [propertyId]: { error: 'Failed to fetch remaining days' } 
      }));
    } finally {
      setLoadingRemainingDays(prev => ({ ...prev, [propertyId]: false }));
    }
  };

  const renderPropertyCard = (property) => {
    const { type, property: propertyData, payments } = property;
    const latestPayment = getLatestPayment(payments);
    const isRental = isRentalWithRentPayment(property);
    
    // Check if this property has expired based on remainingDays data
    const propertyDaysData = remainingDays[propertyData._id];
    if (propertyDaysData && propertyDaysData.remainingDays !== undefined && propertyDaysData.remainingDays <= 0) {
      return null; // Don't render this card if rent is expired
    }
    
    return (
      <div className="property-card" key={propertyData._id}>
        <div className="property-image">
          <ImageGallery images={propertyData.images || []} />
          <span className="property-type">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          <span className="property-status">{propertyData.status}</span>
        </div>
        
        <div className="property-details">
          <h3>{propertyData.title}</h3>
          <p className="property-address">
            <i className="fas fa-map-marker-alt"></i> {propertyData.address}
          </p>
          
          <div className="property-specs">
            <div className="spec">
              <i className="fas fa-ruler-combined"></i>
              <span>{propertyData.area} sq ft</span>
            </div>
            
            {type === 'apartment' || type === 'farmhouse' ? (
              <>
                <div className="spec">
                  <i className="fas fa-bed"></i>
                  <span>{propertyData.bedrooms} Beds</span>
                </div>
                <div className="spec">
                  <i className="fas fa-bath"></i>
                  <span>{propertyData.bathrooms} Baths</span>
                </div>
              </>
            ) : null}
            
            {type === 'land' && (
              <div className="spec">
                <i className="fas fa-tag"></i>
                <span>{propertyData.zoningType}</span>
              </div>
            )}
            
            {type === 'office' && (
              <div className="spec">
                <i className="fas fa-building"></i>
                <span>Floor {propertyData.floor}</span>
              </div>
            )}
          </div>
          
          <div className="property-description" style={{ maxHeight: '100px', overflowY: 'auto', padding: '5px', marginBottom: '10px' }}>
            <p><strong>Description:</strong> {propertyData.description || 'No description available'}</p>
          </div>
          
          {(type === 'apartment' || type === 'farmhouse' || type === 'office') && (
            <div className="furnishing-status">
              <p><strong>Furnishing:</strong> {propertyData.furnishingStatus || 'Not specified'}</p>
            </div>
          )}
          
          <div className="payment-info">
            <p>
              <strong>Last payment:</strong> {latestPayment ? `${latestPayment.amount} USD (${latestPayment.paymentType})` : 'N/A'}
            </p>
            <p>
              <strong>Date:</strong> {latestPayment ? formatDate(latestPayment.paymentDate) : 'N/A'}
            </p>
          </div>
          
          <div className="property-price">
            {latestPayment && latestPayment.paymentType && latestPayment.paymentType.toLowerCase() === 'rent' && (
              <h4>${latestPayment.amount} <span>/month</span></h4>
            )}
            {latestPayment && latestPayment.paymentType && latestPayment.paymentType.toLowerCase() === 'buy' && (
              <h4>${latestPayment.amount}</h4>
            )}
            {(!latestPayment && propertyData.isForRent) && (
              <h4>${propertyData.rentPrice} <span>/month</span></h4>
            )}
            {(!latestPayment && propertyData.isForSale) && (
              <h4>${propertyData.price}</h4>
            )}
            {/* Fallback display if none of the above conditions match */}
            {latestPayment && latestPayment.paymentType && 
              latestPayment.paymentType.toLowerCase() !== 'rent' && 
              latestPayment.paymentType.toLowerCase() !== 'buy' && (
              <h4>${latestPayment.amount} <span>({latestPayment.paymentType})</span></h4>
            )}
          </div>
          
          {/* Removed rental timer display that was here */}
          
          {propertyData.rentalStartDate && (
            <p>Start Date: {formatDate(propertyData.rentalStartDate)}</p>
          )}
          
          {/* Only show Check Remaining Days button for properties with rent payments */}
          {isRental && (
            <div style={{ marginBottom: '10px' }}>
              <button 
                style={{ 
                  padding: '8px 15px', 
                  backgroundColor: '#4CAF50', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px', 
                  cursor: 'pointer',
                  marginRight: '5px'
                }}
                disabled={loadingRemainingDays[propertyData._id]}
                onClick={() => checkRemainingDays(propertyData._id)}
              >
                {loadingRemainingDays[propertyData._id] ? 'Loading...' : 
                 showRemainingDays[propertyData._id] ? 'Hide Remaining Days' : 'Check Remaining Days'}
              </button>
              
              {/* Only show remaining days if showRemainingDays for this property is true */}
              {showRemainingDays[propertyData._id] && remainingDays[propertyData._id] && 
               !remainingDays[propertyData._id].error && (
                <p style={getTimerColor(remainingDays[propertyData._id].remainingDays)}>
                  <strong>{remainingDays[propertyData._id].remainingDays} days left</strong>
                </p>
              )}
              
              {showRemainingDays[propertyData._id] && remainingDays[propertyData._id] && 
               remainingDays[propertyData._id].error && (
                <p style={{ color: 'red' }}>{remainingDays[propertyData._id].error}</p>
              )}
            </div>
          )}
          
          <button 
            className="give-feedback-btn"
            onClick={() => navigate(`/feedback?propertyId=${propertyData._id}&type=${type}`)}
          >
            <i className="fas fa-comment"></i> Give Feedback
          </button> 
        </div>
      </div>
    );
  };

  return (
    <div className="customer-dashboard">
      <button 
        className="back-to-home-btn" 
        onClick={() => navigate('/')}
        style={{ position: 'absolute', top: '20px', left: '20px' }}
      >
        <i className="fas fa-arrow-left"></i> Back to Home
      </button>
      
      <div className="dashboard-header">
        <h1>My Properties</h1>
        <p>View all properties you have booked or purchased</p>
      </div>
      
      <div className="filter-tabs">
        <button 
          className={activeTab === 'all' ? 'active' : ''} 
          onClick={() => setActiveTab('all')}
        >
          All Properties
        </button>
        <button 
          className={activeTab === 'apartment' ? 'active' : ''} 
          onClick={() => setActiveTab('apartment')}
        >
          Apartments
        </button>
        <button 
          className={activeTab === 'farmhouse' ? 'active' : ''} 
          onClick={() => setActiveTab('farmhouse')}
        >
          Farmhouses
        </button>
        <button 
          className={activeTab === 'land' ? 'active' : ''} 
          onClick={() => setActiveTab('land')}
        >
          Land
        </button>
        <button 
          className={activeTab === 'office' ? 'active' : ''} 
          onClick={() => setActiveTab('office')}
        >
          Offices
        </button>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your properties...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i>
          <p>{error}</p>
        </div>
      ) : properties.length === 0 ? (
        <div className="no-properties">
          <i className="fas fa-home"></i>
          <h2>No properties found</h2>
          <p>You have not booked or purchased any properties yet.</p>
          <button 
            className="browse-properties-btn"
            onClick={() => navigate('/search_property')}
          >
            Browse Properties
          </button>
        </div>
      ) : (
        <div className="properties-grid">
          {getFilteredProperties().map(property => renderPropertyCard(property))}
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
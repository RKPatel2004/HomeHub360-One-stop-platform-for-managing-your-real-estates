import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ImageGallery from './ImageGallery';
import './SearchProperty.css';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const SearchProperty = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [filteredAddresses, setFilteredAddresses] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);
  const user = useSelector(state => state.User);

  
  // Sidebar state
  const [showSidebar, setShowSidebar] = useState(false);
  const [propertyType, setPropertyType] = useState('');
  const [filterParams, setFilterParams] = useState({});
  const [forBuy, setForBuy] = useState('');
  const [forRent, setForRent] = useState('');

  // Fetch all unique addresses when component mounts
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = user.token;
        if (!token) {
          setError("You must be logged in to search properties");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/getProperty", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Extract unique addresses from all property types
        const allProperties = response.data.properties || [];
        const uniqueAddresses = [...new Set(allProperties.map(prop => prop.address))];
        setAddresses(uniqueAddresses);
      } catch (err) {
        console.error("Error fetching addresses:", err);
        setError("Failed to load address options");
      }
    };

    fetchAddresses();
  }, []);

  // Filter addresses based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredAddresses(addresses);
    } else {
      const filtered = addresses.filter(address => 
        address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAddresses(filtered);
    }
  }, [searchTerm, addresses]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  const handleAddressSelect = (address) => {
    setSearchTerm(address);
    setShowDropdown(false);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    setProperties([]);
    setShowSidebar(false);
    resetFilters();

    try {
      const token = user.token;
      if (!token) {
        setError("You must be logged in to search properties");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/searchPropertyByAddress/${encodeURIComponent(searchTerm)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProperties(response.data);
      setShowSidebar(true);
    } catch (err) {
      console.error("Error searching properties:", err);
      if (err.response && err.response.status === 404) {
        setError("No properties found with this address");
      } else {
        setError("Failed to search properties");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle view property button click
  const handleViewProperty = (propertyId) => {
    navigate(`/view-property/${propertyId}`);
  };

  // Filter parameters handling
  const handlePropertyTypeChange = (e) => {
    setPropertyType(e.target.value);
    setFilterParams({}); // Reset filters when property type changes
    setForBuy('');
    setForRent('');
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterParams({
      ...filterParams,
      [name]: value
    });
  };

  const handleBuyStatusChange = (e) => {
    setForBuy(e.target.value);
    // Clear price if "no" is selected
    if (e.target.value === 'no') {
      setFilterParams({
        ...filterParams,
        price: ''
      });
    }
  };

  const handleRentStatusChange = (e) => {
    setForRent(e.target.value);
    // Clear rentPrice if "no" is selected
    if (e.target.value === 'no') {
      setFilterParams({
        ...filterParams,
        rentPrice: ''
      });
    }
  };

  const resetFilters = () => {
    setPropertyType('');
    setFilterParams({});
    setForBuy('');
    setForRent('');
  };

  const applyFilters = async () => {
    if (!propertyType) {
      setError("Please select a property type");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = user.token;
      if (!token) {
        setError("You must be logged in to filter properties");
        setLoading(false);
        return;
      }

      // Create FormData object instead of a regular JavaScript object
      const formData = new FormData();
      
      // Add propertyType
      formData.append('propertyType', propertyType);
      
      // Add address if available
      if (searchTerm) {
        formData.append('address', searchTerm);
      }
      
      // Add other filter parameters
      Object.keys(filterParams).forEach(key => {
        if (filterParams[key] !== '') {
          formData.append(key, filterParams[key]);
        }
      });
      
      // Add isForSale based on forBuy selection
      if (forBuy === 'yes') {
        formData.append('isForSale', 'true');
      } else if (forBuy === 'no') {
        formData.append('isForSale', 'false');
      }
      
      // Add isForRent based on forRent selection
      if (forRent === 'yes') {
        formData.append('isForRent', 'true');
      } else if (forRent === 'no') {
        formData.append('isForRent', 'false');
      }
      
      // Choose the correct API endpoint based on property type
      let endpoint;
      switch (propertyType) {
        case 'apartment':
          endpoint = 'filterApartment';
          break;
        case 'farmhouse':
          endpoint = 'filterFarmhouse';
          break;
        case 'land':
          endpoint = 'filterLand';
          break;
        case 'office':
          endpoint = 'filterOffice';
          break;
        default:
          setError("Please select a property type");
          setLoading(false);
          return;
      }

      console.log("Sending form data to endpoint:", endpoint);
      
      // Log form data contents for debugging
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      
      // Send the request with FormData instead of JSON
      const response = await axios.post(
        `http://localhost:5000/api/${endpoint}`,
        formData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            // Don't set Content-Type header - axios will set it automatically with boundary for FormData
          },
        }
      );

      setProperties(response.data);
    } catch (err) {
      console.error("Error filtering properties:", err);
      if (err.response) {
        console.log("Server response:", err.response.data);
        if (err.response.status === 404) {
          setError("No properties found matching your filters");
          setProperties([]);
        } else {
          setError(err.response.data.message || "Failed to filter properties");
        }
      } else {
        setError("Failed to filter properties");
      }
    } finally {
      setLoading(false);
    }
  };

  // Render sidebar fields based on selected property type
  const renderPropertyTypeFields = () => {
    switch (propertyType) {
      case 'apartment':
        return (
          <>
            <div className="filter-field">
              <label htmlFor="bedrooms">Bedrooms:</label>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={filterParams.bedrooms || ''}
                onChange={handleFilterChange}
                min="1"
                className="filter-input"
              />
            </div>
            <div className="filter-field">
              <label htmlFor="furnishingStatus">Furnishing Status:</label>
              <select
                id="furnishingStatus"
                name="furnishingStatus"
                value={filterParams.furnishingStatus || ''}
                onChange={handleFilterChange}
                className="filter-input"
              >
                <option value="">Select</option>
                <option value="fully furnished">Fully Furnished</option>
                <option value="semi-furnished">Semi-Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>
            </div>
          </>
        );
      case 'farmhouse':
        return (
          <>
            <div className="filter-field">
              <label htmlFor="gardenArea">Garden Area (acres):</label>
              <input
                type="number"
                id="gardenArea"
                name="gardenArea"
                value={filterParams.gardenArea || ''}
                onChange={handleFilterChange}
                min="0"
                className="filter-input"
              />
            </div>
            <div className="filter-field">
              <label htmlFor="swimmingPool">Swimming Pool:</label>
              <select
                id="swimmingPool"
                name="swimmingPool"
                value={filterParams.swimmingPool || ''}
                onChange={handleFilterChange}
                className="filter-input"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="filter-field">
              <label htmlFor="furnishingStatus">Furnishing Status:</label>
              <select
                id="furnishingStatus"
                name="furnishingStatus"
                value={filterParams.furnishingStatus || ''}
                onChange={handleFilterChange}
                className="filter-input"
              >
                <option value="">Select</option>
                <option value="fully furnished">Fully Furnished</option>
                <option value="semi-furnished">Semi-Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>
            </div>
          </>
        );
      case 'land':
        return (
          <>
            <div className="filter-field">
              <label htmlFor="area">Area (sq ft):</label>
              <input
                type="number"
                id="area"
                name="area"
                value={filterParams.area || ''}
                onChange={handleFilterChange}
                min="0"
                className="filter-input"
              />
            </div>
            <div className="filter-field">
              <label htmlFor="zoningType">Zoning Type:</label>
              <select
                id="zoningType"
                name="zoningType"
                value={filterParams.zoningType || ''}
                onChange={handleFilterChange}
                className="filter-input"
              >
                <option value="">Select</option>
                <option value="rural">Rural</option>
                <option value="urban">Urban</option>
              </select>
            </div>
          </>
        );
      case 'office':
        return (
          <>
            <div className="filter-field">
              <label htmlFor="area">Area (sq ft):</label>
              <input
                type="number"
                id="area"
                name="area"
                value={filterParams.area || ''}
                onChange={handleFilterChange}
                min="0"
                className="filter-input"
              />
            </div>
            <div className="filter-field">
              <label htmlFor="floor">Floor:</label>
              <input
                type="number"
                id="floor"
                name="floor"
                value={filterParams.floor || ''}
                onChange={handleFilterChange}
                min="0"
                className="filter-input"
              />
            </div>
            <div className="filter-field">
              <label htmlFor="parkingSpaces">Parking Spaces:</label>
              <input
                type="number"
                id="parkingSpaces"
                name="parkingSpaces"
                value={filterParams.parkingSpaces || ''}
                onChange={handleFilterChange}
                min="0"
                className="filter-input"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="search-property-container">
      <Link to="/" className="back-to-home-btn">Back to Home</Link>
      
      <h2 className="search-header">Search Properties by Location</h2>
      
      <div className="search-bar-container" ref={dropdownRef}>
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Enter property location"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setShowDropdown(true)}
            onKeyPress={handleKeyPress}
          />
          
          {showDropdown && filteredAddresses.length > 0 && (
            <div className="address-dropdown">
              {filteredAddresses.map((address, index) => (
                <div 
                  key={index} 
                  className="address-item"
                  onClick={() => handleAddressSelect(address)}
                >
                  {address}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading && (
        <div className="loading-message">
          <p>Searching properties...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {properties.length >= 0 && showSidebar && !loading && (
        <div className="search-results-container">
          <div className="sidebar">
            <div className="filter-section">
              <h3>Filter Properties</h3>
              
              {/* Added address field that displays the search term */}
              <div className="filter-field">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={searchTerm}
                  className="filter-input"
                  disabled
                />
              </div>
              
              <div className="filter-field">
                <label htmlFor="propertyType">Property Type:</label>
                <select
                  id="propertyType"
                  value={propertyType}
                  onChange={handlePropertyTypeChange}
                  className="filter-input"
                >
                  <option value="">Select Property Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="farmhouse">Farmhouse</option>
                  <option value="land">Land</option>
                  <option value="office">Office</option>
                </select>
              </div>
              
              {propertyType && renderPropertyTypeFields()}
              
              {propertyType && (
                <>
                  <div className="filter-field">
                    <label htmlFor="forBuy">For Buy:</label>
                    <select
                      id="forBuy"
                      value={forBuy}
                      onChange={handleBuyStatusChange}
                      className="filter-input"
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  
                  {forBuy === 'yes' && (
                    <div className="filter-field">
                      <label htmlFor="price">Price (₹):</label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={filterParams.price || ''}
                        onChange={handleFilterChange}
                        min="0"
                        className="filter-input"
                      />
                    </div>
                  )}
                  
                  <div className="filter-field">
                    <label htmlFor="forRent">For Rent:</label>
                    <select
                      id="forRent"
                      value={forRent}
                      onChange={handleRentStatusChange}
                      className="filter-input"
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  
                  {forRent === 'yes' && (
                    <div className="filter-field">
                      <label htmlFor="rentPrice">Rent Price (₹):</label>
                      <input
                        type="number"
                        id="rentPrice"
                        name="rentPrice"
                        value={filterParams.rentPrice || ''}
                        onChange={handleFilterChange}
                        min="0"
                        className="filter-input"
                      />
                    </div>
                  )}
                </>
              )}
              
              <div className="filter-buttons">
                <button className="apply-button" onClick={applyFilters}>Apply Filters</button>
                <button className="clear-button" onClick={resetFilters}>Clear Filters</button>
              </div>
            </div>
          </div>
          
          <div className="properties-content">
            <h3 className="results-header">Found {properties.length} Properties</h3>
            
            {properties.length === 0 && !loading && (
              <div className="no-results">
                <p>No properties found matching your search criteria.</p>
              </div>
            )}
            
            {properties.length > 0 && (
              <div className="property-grid">
                {properties.map((property) => (
                  <div key={property._id} className="property-card">
                    <ImageGallery images={property.images || []} />
                    <div className="property-content">
                      <h3 className="property-title">{property.title || 'Untitled Property'}</h3>
                      <p className="property-description">{property.description || 'No description available'}</p>
                      <p className="property-detail">
                        <span className="detail-label">Price:</span>
                        {property.price ? `₹${property.price.toLocaleString()}` : "N/A"}
                      </p>
                      <p className="property-detail">
                        <span className="detail-label">Location:</span>
                        {property.address}
                      </p>
                      <p className="property-detail">
                        <span className="detail-label">Status:</span>
                        <span className={`status-badge ${property.status?.toLowerCase() || 'unknown'}`}>
                          {property.status || 'Unknown'}
                        </span>
                      </p>
                      <p className="property-detail">
                        <span className="detail-label">Type:</span>
                        {getPropertyType(property)}
                      </p>
                      <button className="view-property-button" onClick={() => handleViewProperty(property._id)}>View Property</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {properties.length === 0 && !loading && !error && searchTerm && !showSidebar && (
        <div className="no-results">
          <p>No properties found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

// Helper function to determine property type
function getPropertyType(property) {
  // First check if the property has a propertyType field
  if (property.propertyType) return property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1);
  
  // Check for type field
  if (property.type) return property.type.charAt(0).toUpperCase() + property.type.slice(1);
  
  // Check for specific properties to determine the type
  if (property.hasOwnProperty('gardenArea') || property.hasOwnProperty('farmSize') || property.hasOwnProperty('swimmingPool')) return 'Farmhouse';
  if (property.hasOwnProperty('bedrooms') || property.hasOwnProperty('bathrooms')) return 'Apartment';
  if (property.hasOwnProperty('area') && (property.hasOwnProperty('zoningType') || !property.hasOwnProperty('floor'))) return 'Land';
  if (property.hasOwnProperty('parkingSpaces') || (property.hasOwnProperty('area') && property.hasOwnProperty('floor'))) return 'Office';
  if (property.hasOwnProperty('floors')) return 'Building';
  
  // Check API endpoint used (if information is available in the property object)
  if (property._endpoint === 'filterApartment') return 'Apartment';
  if (property._endpoint === 'filterFarmhouse') return 'Farmhouse';
  if (property._endpoint === 'filterLand') return 'Land';
  if (property._endpoint === 'filterOffice') return 'Office';
  
  // Default case if we can't determine the type
  return 'Property';
}

export default SearchProperty;
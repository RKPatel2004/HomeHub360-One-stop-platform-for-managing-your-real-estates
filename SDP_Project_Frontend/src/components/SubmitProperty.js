import React, { useState, useRef } from 'react';
import { X } from 'lucide-react';
import './SubmitProperty.css';
import axios from 'axios';

const SubmitProperty = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    propertyType: '',
    title: '',
    description: '',
    address: '',
    area: '',
    status: 'available',
    bedrooms: '',
    bathrooms: '',
    balconies: '',
    furnishingStatus: 'unfurnished',
    isForSale: false,
    isForRent: false,
    rentPrice: '',
    price: '',
    floor: '',
    totalFloors: '',
    parkingSpaces: '',
    gardenArea: '',
    swimmingPool: false,
    zoningType: '',
    images: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateFirstPage = () => {
    // Get all input elements from the first page
    const firstPageInputs = formRef.current.querySelectorAll('[data-page="1"] input, [data-page="1"] select, [data-page="1"] textarea');
    
    // Check if all required fields are filled
    let isValid = true;
    firstPageInputs.forEach(input => {
      if (input.hasAttribute('required')) {
        if (input.type === 'checkbox') {
          // Special handling for checkboxes (if at least one of isForSale or isForRent should be checked)
          if (input.name === 'isForSale' || input.name === 'isForRent') {
            if (!formData.isForSale && !formData.isForRent) {
              isValid = false;
              input.setCustomValidity('Please select at least one option (For Sale or For Rent)');
            } else {
              input.setCustomValidity('');
            }
          }
        } else if (!input.value) {
          isValid = false;
          input.reportValidity();
        }
      }
      
      // Validate price fields if corresponding checkbox is checked
      if (formData.isForSale && input.name === 'price' && (!input.value || input.value <= 0)) {
        isValid = false;
        input.reportValidity();
      }
      if (formData.isForRent && input.name === 'rentPrice' && (!input.value || input.value <= 0)) {
        isValid = false;
        input.reportValidity();
      }
    });

    return isValid;
  };

  const handleNextClick = () => {
    if (validateFirstPage()) {
      setCurrentPage(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      propertyType: formData.propertyType,
      title: formData.title,
      description: formData.description,
      address: formData.address,
      area: formData.area,
      status: formData.status,
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      balconies: formData.balconies,
      furnishingStatus: formData.furnishingStatus,
      isForSale: formData.isForSale,
      isForRent: formData.isForRent,
      rentPrice: formData.rentPrice,
      price: formData.price,
      floor: formData.floor,
      totalFloors: formData.totalFloors,
      parkingSpaces: formData.parkingSpaces,
      gardenArea: formData.gardenArea,
      swimmingPool: formData.swimmingPool,
      zoningType: formData.zoningType,
      images: formData.images
    };

    try {
      const response = await axios.post('http://localhost:5000/api/submitProperty', dataToSubmit, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Property submitted successfully:', response.data);
      
      setSuccessMessage('Property Submitted Successfully');
      
      setTimeout(() => {
        window.location.href = '/Manage_Property';
      }, 1000);
      
    } catch (error) {
      console.error('Error submitting property:', error);
    }
  };

  return (
    <div className="submit-property">
      <div className="page-indicator">
        <div className={`indicator ${currentPage === 1 ? 'active' : ''}`}>1</div>
        <div className={`indicator ${currentPage === 2 ? 'active' : ''}`}>2</div>
      </div>

      {successMessage && (
        <div className="success-message" style={{ 
          padding: '10px', 
          backgroundColor: '#d4edda', 
          color: '#155724', 
          borderRadius: '4px', 
          marginBottom: '20px',
          textAlign: 'center', 
          fontSize: '25px'
        }}>
          {successMessage}
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="property-form">
        {currentPage === 1 && (
          <div className="form-page" data-page="1">
            <h2 className="form-title">Property Details</h2>

            <div className="form-section">
              <div className="form-group">
                <label>Property Type</label>
                <select 
                  name="propertyType" 
                  value={formData.propertyType} 
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="farmhouse">Farmhouse</option>
                  <option value="land">Land</option>
                  <option value="office">Office</option>
                </select>
              </div>

              <div className="form-group">
                <label>Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange}
                  required
                  minLength="5"
                  maxLength="100"
                  className="input-field"
                />
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange}
                  required
                  minLength="20"
                  maxLength="1000"
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input 
                  type="text" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange}
                  required
                  minLength="10"
                  maxLength="200"
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>Area (sq ft)</label>
                <input 
                  type="number" 
                  name="area" 
                  value={formData.area} 
                  onChange={handleChange}
                  required
                  min="1"
                  className="input-field"
                />
              </div>

              {formData.propertyType !== 'land' && (
                <>
                  <div className="form-group">
                    <label>Furnishing Status</label>
                    <select 
                      name="furnishingStatus" 
                      value={formData.furnishingStatus} 
                      onChange={handleChange}
                      required
                    >
                      <option value="unfurnished">Unfurnished</option>
                      <option value="semi-furnished">Semi-furnished</option>
                      <option value="fully furnished">Fully Furnished</option>
                    </select>
                  </div>

                  {formData.propertyType !== 'office' && (
                    <>
                      <div className="form-group">
                        <label>Bedrooms</label>
                        <input 
                          type="number" 
                          name="bedrooms" 
                          value={formData.bedrooms} 
                          onChange={handleChange} 
                          required
                          min="0"
                          className="input-field" 
                        />
                      </div>

                      <div className="form-group">
                        <label>Bathrooms</label>
                        <input 
                          type="number" 
                          name="bathrooms" 
                          value={formData.bathrooms} 
                          onChange={handleChange} 
                          required
                          min="0"
                          className="input-field" 
                        />
                      </div>

                      {formData.propertyType === 'apartment' && (
                        <div className="form-group">
                          <label>Balconies</label>
                          <input 
                            type="number" 
                            name="balconies" 
                            value={formData.balconies} 
                            onChange={handleChange} 
                            required
                            min="0"
                            className="input-field" 
                          />
                        </div>
                      )}
                    </>
                  )}
                </>
              )}

              {formData.propertyType === 'office' && (
                <>
                  <div className="form-group">
                    <label>Floor</label>
                    <input 
                      type="number" 
                      name="floor" 
                      value={formData.floor} 
                      onChange={handleChange} 
                      required
                      min="0"
                      className="input-field" 
                    />
                  </div>

                  <div className="form-group">
                    <label>Total Floors</label>
                    <input 
                      type="number" 
                      name="totalFloors" 
                      value={formData.totalFloors} 
                      onChange={handleChange} 
                      required
                      min="1"
                      className="input-field" 
                    />
                  </div>

                  <div className="form-group">
                    <label>Parking Spaces</label>
                    <input 
                      type="number" 
                      name="parkingSpaces" 
                      value={formData.parkingSpaces} 
                      onChange={handleChange} 
                      required
                      min="0"
                      className="input-field" 
                    />
                  </div>
                </>
              )}

              {formData.propertyType === 'farmhouse' && (
                <>
                  <div className="form-group">
                    <label>Garden Area</label>
                    <input 
                      type="number" 
                      name="gardenArea" 
                      value={formData.gardenArea} 
                      onChange={handleChange} 
                      required
                      min="0"
                      className="input-field" 
                    />
                  </div>

                  <div className="form-group">
                    <label>Swimming Pool</label>
                    <input 
                      type="checkbox" 
                      name="swimmingPool" 
                      checked={formData.swimmingPool} 
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              {formData.propertyType === 'land' && (
                <div className="form-group">
                  <label>Zoning Type</label>
                  <input 
                    type="text" 
                    name="zoningType" 
                    value={formData.zoningType} 
                    onChange={handleChange} 
                    required
                    className="input-field" 
                  />
                </div>
              )}

              <div className="form-group">
                <label>Status</label>
                <select 
                  name="status" 
                  value={formData.status} 
                  onChange={handleChange} 
                  required
                  className="input-field"
                >
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                  <option value="rented">Rented</option>
                </select>
              </div>

              <div className="form-group">
                <label>For Sale</label>
                <input 
                  type="checkbox" 
                  name="isForSale" 
                  checked={formData.isForSale} 
                  onChange={handleChange}
                />
              </div>

              {formData.isForSale && (
                <div className="form-group">
                  <label>Sale Price</label>
                  <input 
                    type="number" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleChange}
                    required
                    min="1"
                    className="input-field"
                  />
                </div>
              )}

              <div className="form-group">
                <label>For Rent</label>
                <input 
                  type="checkbox" 
                  name="isForRent" 
                  checked={formData.isForRent} 
                  onChange={handleChange}
                />
              </div>

              {formData.isForRent && (
                <div className="form-group">
                  <label>Rent Price</label>
                  <input 
                    type="number" 
                    name="rentPrice" 
                    value={formData.rentPrice} 
                    onChange={handleChange}
                    required
                    min="1"
                    className="input-field"
                  />
                </div>
              )}
            </div>
            <div className="form-navigation">
              <button type="button" className="next-btn" onClick={handleNextClick}>Next</button>
            </div>
          </div>
        )}

        {currentPage === 2 && (
          <div className="form-page flex">
            <h2 className="form-title">Images</h2>

            <div className="form-group">
              <input 
                type="file" 
                multiple
                onChange={handleImageUpload}
                required={formData.images.length === 0}
                accept="image/*"
                className="input-field"
              />
            </div>

            <div className="image-preview">
              {formData.images.map((image, index) => (
                <div key={index} className="image-thumbnail">
                  <img src={URL.createObjectURL(image)} alt={`image-${index}`} />
                  <button type="button" onClick={() => removeImage(index)}>
                    <X />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 space-x-4">
              <button type="button" className="prev-btn px-4 py-2 bg-gray-300 rounded" onClick={() => setCurrentPage(1)}>Back</button>
              <button type="submit" className="submit-btn px-4 py-2 bg-blue-500 text-white rounded">Submit Property</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SubmitProperty;

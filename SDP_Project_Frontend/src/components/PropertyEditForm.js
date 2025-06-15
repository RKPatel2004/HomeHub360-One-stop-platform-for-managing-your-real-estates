import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Upload,
  Check,
  ArrowLeft,
  ArrowRight,
  Save,
  Home,
  Image,
} from "lucide-react";
import axios from "axios";
import "./PropertyEditForm.css";

const PropertyEditForm = ({ property, onClose, onPropertyUpdated }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const formRef = useRef(null);
  const [objectURLs, setObjectURLs] = useState([]); 
  const [formData, setFormData] = useState({
    propertyType: "",
    title: "",
    description: "",
    address: "",
    area: "",
    status: "available",
    bedrooms: "",
    bathrooms: "",
    balconies: "",
    furnishingStatus: "unfurnished",
    isForSale: false,
    isForRent: false,
    rentPrice: "",
    price: "",
    floor: "",
    totalFloors: "",
    parkingSpaces: "",
    gardenArea: "",
    swimmingPool: false,
    zoningType: "",
    images: [],
    existingImages: [],
  });

  // Determine property type
  const determinePropertyType = (prop) => {
    if (prop.propertyType) return prop.propertyType;

    if (prop.zoningType) return "land";
    if (prop.floor !== undefined) return "office";
    if (prop.gardenArea !== undefined || prop.swimmingPool !== undefined)
      return "farmhouse";
    if (prop.balconies !== undefined) return "apartment";

    if (prop.bedrooms && prop.bathrooms) {
      return "apartment";
    }

    return "apartment";
  };

  // Load property data when component mounts
  useEffect(() => {
    if (property) {
      // Ensure imageURLs is always an array
      const imageURLs = Array.isArray(property.images) ? property.images : [];
      
      // Ensure each image URL is complete - add base URL if needed
      const completeImageURLs = imageURLs.map(url => {
        if (url && !url.startsWith('http')) {
          // If the URL is relative, prepend base URL
          return /*`http://localhost:5000${url.startsWith('/') ? '' : '/'}${url}`*/`https://homehub360.onrender.com${url.startsWith('/') ? '' : '/'}${url}`;
        }
        return url;
      });

      setFormData({
        propertyType: property.propertyType || determinePropertyType(property),
        title: property.title || "",
        description: property.description || "",
        address: property.address || "",
        area: property.area || "",
        status: property.status || "available",
        bedrooms: property.bedrooms || "",
        bathrooms: property.bathrooms || "",
        balconies: property.balconies || "",
        furnishingStatus: property.furnishingStatus || "unfurnished",
        isForSale: property.isForSale || false,
        isForRent: property.isForRent || false,
        rentPrice: property.rentPrice || "",
        price: property.price || "",
        floor: property.floor || "",
        totalFloors: property.totalFloors || "",
        parkingSpaces: property.parkingSpaces || "",
        gardenArea: property.gardenArea || "",
        swimmingPool: property.swimmingPool || false,
        zoningType: property.zoningType || "",
        existingImages: completeImageURLs,
        images: [],
      });
    }
  }, [property]);

  // Clean up object URLs when component unmounts or when they change
  useEffect(() => {
    return () => {
      objectURLs.forEach(url => URL.revokeObjectURL(url));
    };
  }, [objectURLs]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Create and store object URLs for new images
    const newURLs = files.map(file => URL.createObjectURL(file));
    setObjectURLs(prev => [...prev, ...newURLs]);

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeImage = (index) => {
    // Revoke the object URL when removing an image
    if (objectURLs[index]) {
      URL.revokeObjectURL(objectURLs[index]);
      setObjectURLs(prev => prev.filter((_, i) => i !== index));
    }
    
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const removeExistingImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((_, i) => i !== index),
    }));
  };

  const openImagePreview = (src) => {
    setPreviewImage(src);
    setImagePreviewOpen(true);
  };

  const closeImagePreview = () => {
    setImagePreviewOpen(false);
    setPreviewImage("");
  };

  const validateFirstPage = () => {
    // Get all input elements from the first page
    const firstPageInputs = formRef.current.querySelectorAll(
      '[data-page="1"] input, [data-page="1"] select, [data-page="1"] textarea'
    );

    // Check if all required fields are filled
    let isValid = true;
    firstPageInputs.forEach((input) => {
      if (input.hasAttribute("required")) {
        if (input.type === "checkbox") {
          // Special handling for checkboxes (if at least one of isForSale or isForRent should be checked)
          if (input.name === "isForSale" || input.name === "isForRent") {
            if (!formData.isForSale && !formData.isForRent) {
              isValid = false;
              input.setCustomValidity(
                "Please select at least one option (For Sale or For Rent)"
              );
            } else {
              input.setCustomValidity("");
            }
          }
        } else if (!input.value) {
          isValid = false;
          input.reportValidity();
        }
      }

      // Validate price fields if corresponding checkbox is checked
      if (
        formData.isForSale &&
        input.name === "price" &&
        (!input.value || input.value <= 0)
      ) {
        isValid = false;
        input.reportValidity();
      }
      if (
        formData.isForRent &&
        input.name === "rentPrice" &&
        (!input.value || input.value <= 0)
      ) {
        isValid = false;
        input.reportValidity();
      }
    });

    return isValid;
  };

  const handleNextClick = () => {
    if (validateFirstPage()) {
      setCurrentPage(2);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    // Create FormData object for sending to server
    const dataToSubmit = new FormData();

    // Add all form fields to FormData
    Object.keys(formData).forEach((key) => {
      // Skip the existingImages array as we'll handle it separately
      if (key !== "existingImages" && key !== "images") {
        dataToSubmit.append(key, formData[key]);
      }
    });

    // Add existing images paths
    if (formData.existingImages && formData.existingImages.length > 0) {
      // Extract just the path part of the URL if needed
      const imagePaths = formData.existingImages.map(url => {
        try {
          // Check if it's a full URL
          if (url.startsWith('http')) {
            const urlObj = new URL(url);
            return urlObj.pathname; // Extract just the path part
          }
          return url;
        } catch (e) {
          return url; // If parsing fails, use the original string
        }
      });
      
      dataToSubmit.append("existingImages", JSON.stringify(imagePaths));
    }

    // Add new image files
    if (formData.images && formData.images.length > 0) {
      formData.images.forEach((image) => {
        dataToSubmit.append("images", image);
      });
    }

    // Add property ID and type
    dataToSubmit.append("propertyId", property._id);

    try {
      const response = await axios.put(
        /*`http://localhost:5000/api/editProperty/${property._id}/${formData.propertyType}`*/`https://homehub360.onrender.com/api/editProperty/${property._id}/${formData.propertyType}`,
        dataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccessMessage("Property Updated Successfully");

      // Call the callback to update the UI
      if (typeof onPropertyUpdated === "function") {
        onPropertyUpdated(response.data.property);
      }

      setTimeout(() => {
        onClose();
      }, 1500);
      // Force page refresh to see updated images
      window.location.reload();
    } catch (error) {
      console.error("Error updating property:", error);

      let errorMsg = "Error updating property";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMsg = error.response.data.message;
      }

      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPropertyTypeIcon = () => {
    switch (formData.propertyType) {
      case "apartment":
        return <Home className="property-icon" />;
      case "farmhouse":
        return <Home className="property-icon" />;
      case "land":
        return <div className="property-icon">🏞️</div>;
      case "office":
        return <div className="property-icon">🏢</div>;
      default:
        return <Home className="property-icon" />;
    }
  };

  return (
    <div className="edit-form-overlay" onClick={onClose}>
      <div className="edit-form-content" onClick={(e) => e.stopPropagation()}>
        <div className="edit-form-header">
          <div className="edit-form-title-container">
            {getPropertyTypeIcon()}
            <h2>Edit Property</h2>
          </div>
          <button className="edit-form-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="page-progress-bar">
          <div className="progress-steps">
            <div
              className={`progress-step ${currentPage >= 1 ? "completed" : ""}`}
            >
              <div className="step-circle">
                {currentPage > 1 ? <Check size={16} /> : 1}
              </div>
              <span className="step-text">Details</span>
            </div>
            <div className="progress-line"></div>
            <div
              className={`progress-step ${currentPage >= 2 ? "completed" : ""}`}
            >
              <div className="step-circle">
                {currentPage > 2 ? <Check size={16} /> : 2}
              </div>
              <span className="step-text">Media</span>
            </div>
          </div>
        </div>

        {successMessage && (
          <div className="success-message">
            <Check size={20} />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="error-message">
            <X size={20} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="property-edit-form"
        >
          {currentPage === 1 && (
            <div className="form-page" data-page="1">
              <div className="form-section-header">
                <h3>Property Details</h3>
                <p>Fill in the basic information about your property</p>
              </div>

              <div className="form-card">
                <div className="form-group">
                  <label>Property Type</label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    required
                    className="select-field"
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
                    placeholder="Enter property title"
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
                    className="textarea-field"
                    placeholder="Describe the property"
                    rows="4"
                  />
                </div>

                <div className="form-group">
                  <label>City/Location</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    minLength="10"
                    maxLength="200"
                    className="input-field"
                    placeholder="Enter location"
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
                    placeholder="Enter area"
                  />
                </div>

                <div className="form-section-divider"></div>
                <h4 className="subsection-title">Property Specifics</h4>

                {formData.propertyType !== "land" && (
                  <>
                    <div className="form-group">
                      <label>Furnishing Status</label>
                      <select
                        name="furnishingStatus"
                        value={formData.furnishingStatus}
                        onChange={handleChange}
                        required
                        className="select-field"
                      >
                        <option value="unfurnished">Unfurnished</option>
                        <option value="semi-furnished">Semi-furnished</option>
                        <option value="fully furnished">Fully Furnished</option>
                      </select>
                    </div>

                    {formData.propertyType !== "office" && (
                      <div className="form-row">
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
                            placeholder="0"
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
                            placeholder="0"
                          />
                        </div>

                        {formData.propertyType === "apartment" && (
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
                              placeholder="0"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}

                {formData.propertyType === "office" && (
                  <div className="form-row">
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
                        placeholder="0"
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
                        placeholder="1"
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
                        placeholder="0"
                      />
                    </div>
                  </div>
                )}

                {formData.propertyType === "farmhouse" && (
                  <div className="form-row">
                    <div className="form-group">
                      <label>Garden Area (sq ft)</label>
                      <input
                        type="number"
                        name="gardenArea"
                        value={formData.gardenArea}
                        onChange={handleChange}
                        required
                        min="0"
                        className="input-field"
                        placeholder="0"
                      />
                    </div>

                    <div className="form-group switch-group">
                      <label className="switch-label">Swimming Pool</label>
                      <label className="switch">
                        <input
                          type="checkbox"
                          name="swimmingPool"
                          checked={formData.swimmingPool}
                          onChange={handleChange}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                )}

                {formData.propertyType === "land" && (
                  <div className="form-group">
                    <label>Zoning Type</label>
                    <input
                      type="text"
                      name="zoningType"
                      value={formData.zoningType}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="e.g. Residential, Commercial, Agricultural"
                    />
                  </div>
                )}

                <div className="form-section-divider"></div>
                <h4 className="subsection-title">Listing Details</h4>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="select-field"
                  >
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                    <option value="rented">Rented</option>
                  </select>
                </div>

                <div className="listing-options">
                  <div className="options-card">
                    <div className="listing-option">
                      <div className="form-group toggle-switch">
                        <label className="toggle-label">
                          <div className="toggle-text">For Sale</div>
                          <div className="toggle-control">
                            <input
                              type="checkbox"
                              name="isForSale"
                              checked={formData.isForSale}
                              onChange={handleChange}
                            />
                            <span className="toggle-slider"></span>
                          </div>
                        </label>
                      </div>

                      {formData.isForSale && (
                        <div className="form-group price-group">
                          <label>Sale Price</label>
                          <div className="price-input-container">
                            <span className="currency-symbol">$</span>
                            <input
                              type="number"
                              name="price"
                              value={formData.price}
                              onChange={handleChange}
                              required
                              min="1"
                              className="price-input"
                              placeholder="Enter sale price"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="listing-option">
                      <div className="form-group toggle-switch">
                        <label className="toggle-label">
                          <div className="toggle-text">For Rent</div>
                          <div className="toggle-control">
                            <input
                              type="checkbox"
                              name="isForRent"
                              checked={formData.isForRent}
                              onChange={handleChange}
                            />
                            <span className="toggle-slider"></span>
                          </div>
                        </label>
                      </div>

                      {formData.isForRent && (
                        <div className="form-group price-group">
                          <label>Monthly Rent</label>
                          <div className="price-input-container">
                            <span className="currency-symbol">$</span>
                            <input
                              type="number"
                              name="rentPrice"
                              value={formData.rentPrice}
                              onChange={handleChange}
                              required
                              min="1"
                              className="price-input"
                              placeholder="Enter monthly rent"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-navigation">
                <button
                  type="button"
                  className="next-btn"
                  onClick={handleNextClick}
                >
                  Next <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {currentPage === 2 && (
            <div className="form-page" data-page="2">
              <div className="form-section-header">
                <h3>Property Images</h3>
                <p>Add or update images of your property</p>
              </div>

              <div className="form-card">
                {/* Existing Images Section */}
                {formData.existingImages &&
                  formData.existingImages.length > 0 && (
                    <div className="images-section">
                      <h4 className="images-section-title">
                        <Image size={18} />
                        Current Images
                      </h4>
                      <div className="image-gallery">
                        {formData.existingImages.map((imageUrl, index) => (
                          <div key={`existing-${index}`} className="image-card">
                            <div
                              className="image-preview-container"
                              onClick={() => openImagePreview(imageUrl)}
                            >
                              {/* Add error handling for image loading */}
                              <img
                                src={imageUrl}
                                alt={`Property image ${index + 1}`}
                                className="property-image"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/placeholder-image.jpg"; // Fallback image
                                  console.error(`Failed to load image: ${imageUrl}`);
                                }}
                              />
                            </div>
                            <button
                              type="button"
                              className="remove-image-btn"
                              onClick={() => removeExistingImage(index)}
                              title="Remove image"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                <div className="upload-section">
                  <h4 className="images-section-title">
                    <Upload size={18} />
                    Add New Images
                  </h4>

                  <div className="file-drop-area">
                    <div className="file-input-container">
                      <input
                        type="file"
                        id="image-upload"
                        multiple
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="file-input"
                      />
                      <label htmlFor="image-upload" className="file-label">
                        <Upload size={24} />
                        <span>Choose files or drag & drop</span>
                        <span className="hint-text">
                          JPG, PNG or WEBP (max 5MB each)
                        </span>
                      </label>
                    </div>
                  </div>

                  {formData.images.length > 0 && (
                    <div className="new-images-preview">
                      <h4 className="images-section-title">New Images</h4>
                      <div className="image-gallery">
                        {formData.images.map((image, index) => (
                          <div key={`new-${index}`} className="image-card">
                            {image instanceof File ? (
                              <div
                                className="image-preview-container"
                                onClick={() =>
                                  openImagePreview(URL.createObjectURL(image))
                                }
                              >
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt={`New image ${index + 1}`}
                                  className="property-image"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/placeholder-image.jpg"; // Fallback image
                                  }}
                                />
                              </div>
                            ) : (
                              <span className="invalid-file">Invalid file</span>
                            )}
                            <button
                              type="button"
                              className="remove-image-btn"
                              onClick={() => removeImage(index)}
                              title="Remove image"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-navigation two-buttons">
                <button
                  type="button"
                  className="back-btn"
                  onClick={() => setCurrentPage(1)}
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>Updating...</>
                  ) : (
                    <>
                      <Save size={16} /> Update Property
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Image Preview Modal */}
      {imagePreviewOpen && (
        <div className="image-preview-modal" onClick={closeImagePreview}>
          <div className="preview-modal-content">
            <img
              src={previewImage}
              alt="Property preview"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-image.jpg"; // Fallback image
              }}
            />
            <button className="close-preview" onClick={closeImagePreview}>
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyEditForm;

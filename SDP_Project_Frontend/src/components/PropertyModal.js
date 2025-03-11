// import React, { useState } from 'react';
// import ImageGallery from './ImageGallery';
// import './PropertyModal.css';

// const PropertyModal = ({ property, onClose, onEdit, onDelete }) => {
//   const [activeTab, setActiveTab] = useState('details');

//   if (!property) return null;

//   const handleDelete = () => {
//     if (window.confirm('Are you sure you want to delete this property?')) {
//       onDelete(property._id);
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <div className="modal-header">
//           <div className="modal-title-section">
//             <h2>{property.title}</h2>
//             <span className={`property-status ${property.status.toLowerCase()}`}>
//               {property.status}
//             </span>
//           </div>
//           <div className="modal-actions">
//             <button className="action-button edit" onClick={() => onEdit(property)}>
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
//                 <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
//                 <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
//               </svg>
//               Edit
//             </button>
//             <button className="action-button delete" onClick={handleDelete}>
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
//                 <path d="M3 6h18" />
//                 <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
//               </svg>
//               Delete
//             </button>
//             <button className="modal-close" onClick={onClose}>
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="18" y1="6" x2="6" y2="18" />
//                 <line x1="6" y1="6" x2="18" y2="18" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         <div className="modal-body">
//           <div className="modal-gallery-section">
//             <ImageGallery images={property.images} />
//           </div>

//           <div className="modal-info-section">
//             <div className="tab-buttons">
//               <button
//                 className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('details')}
//               >
//                 Details
//               </button>
//               <button
//                 className={`tab-button ${activeTab === 'amenities' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('amenities')}
//               >
//                 Amenities
//               </button>
//             </div>

//             <div className="tab-content">
//               {activeTab === 'details' ? (
//                 <>
//                   <div className="price-section">
//                     <h3>Price</h3>
//                     <p className="price">₹{property.price ? property.price.toLocaleString() : "N/A"}</p>
//                   </div>

//                   <div className="details-grid">
//                     <div className="detail-item">
//                       <span className="detail-label">Location</span>
//                       <span className="detail-value">{property.address}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Property Type</span>
//                       <span className="detail-value">{property.type || 'Residential'}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Area</span>
//                       <span className="detail-value">{property.area || 'N/A'} sq ft</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Listed Date</span>
//                       <span className="detail-value">{formatDate(property.createdAt || new Date())}</span>
//                     </div>
//                   </div>

//                   <div className="description-section">
//                     <h3>Description</h3>
//                     <p>{property.description}</p>
//                   </div>
//                 </>
//               ) : (
//                 <div className="amenities-section">
//                   <div className="amenities-grid">
//                     {property.amenities?.map((amenity, index) => (
//                       <div key={index} className="amenity-item">
//                         <span className="amenity-name">{amenity}</span>
//                       </div>
//                     )) || (
//                       <p className="no-amenities">No amenities listed</p>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyModal;

// import React, { useState } from 'react';
// import ImageGallery from './ImageGallery';
// import './PropertyModal.css';

// const PropertyModal = ({ property, onClose, onEdit, onDelete }) => {
//   const [activeTab, setActiveTab] = useState('details');

//   if (!property) return null;

//   const handleDelete = () => {
//     if (window.confirm('Are you sure you want to delete this property?')) {
//       onDelete(property._id);
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <div className="modal-header">
//           <div className="modal-title-section">
//             <h2>{property.title}</h2>
//             <span className={`property-status ${property.status.toLowerCase()}`}>
//               {property.status}
//             </span>
//           </div>
//           <div className="modal-actions">
//             <button className="action-button edit" onClick={() => onEdit(property)}>
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
//                 <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
//                 <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
//               </svg>
//               Edit
//             </button>
//             <button className="action-button delete" onClick={handleDelete}>
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
//                 <path d="M3 6h18" />
//                 <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
//               </svg>
//               Delete
//             </button>
//             <button className="modal-close" onClick={onClose}>
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="18" y1="6" x2="6" y2="18" />
//                 <line x1="6" y1="6" x2="18" y2="18" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         <div className="modal-body">
//           <div className="modal-gallery-section">
//             <ImageGallery images={property.images} />
//           </div>

//           <div className="modal-info-section">
//             <div className="tab-buttons">
//               <button
//                 className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('details')}
//               >
//                 Details
//               </button>
//               <button
//                 className={`tab-button ${activeTab === 'amenities' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('amenities')}
//               >
//                 Amenities
//               </button>
//               <button
//                 className={`tab-button ${activeTab === 'specifications' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('specifications')}
//               >
//                 Specifications
//               </button>
//               <button
//                 className={`tab-button ${activeTab === 'pricing' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('pricing')}
//               >
//                 Pricing
//               </button>
//             </div>

//             <div className="tab-content">
//               {activeTab === 'details' && (
//                 <>
//                   <div className="property-main-info">
//                     <div className="detail-item">
//                       <span className="detail-label">Property Type</span>
//                       <span className="detail-value">{property.propertyType || 'Not specified'}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Location</span>
//                       <span className="detail-value">{property.address}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Area</span>
//                       <span className="detail-value">{property.area || 'N/A'} sq ft</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Listed Date</span>
//                       <span className="detail-value">{formatDate(property.createdAt || new Date())}</span>
//                     </div>
//                   </div>

//                   <div className="description-section">
//                     <h3>Description</h3>
//                     <p>{property.description}</p>
//                   </div>

//                   <div className="status-section">
//                     <div className="detail-item">
//                       <span className="detail-label">Status</span>
//                       <span className={`status-badge ${property.status?.toLowerCase()}`}>{property.status}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Listed For</span>
//                       <div className="listed-for-tags">
//                         {property.isForSale && <span className="tag sale">Sale</span>}
//                         {property.isForRent && <span className="tag rent">Rent</span>}
//                         {!property.isForSale && !property.isForRent && <span className="tag">Not specified</span>}
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}

//               {activeTab === 'specifications' && (
//                 <div className="specifications-section">
//                   <div className="specs-grid">
//                     {property.propertyType !== 'land' && (
//                       <>
//                         <div className="spec-item">
//                           <span className="spec-label">Furnishing Status</span>
//                           <span className="spec-value">{property.furnishingStatus || 'Not specified'}</span>
//                         </div>

//                         {property.propertyType !== 'office' && (
//                           <>
//                             <div className="spec-item">
//                               <span className="spec-label">Bedrooms</span>
//                               <span className="spec-value">{property.bedrooms || '0'}</span>
//                             </div>
//                             <div className="spec-item">
//                               <span className="spec-label">Bathrooms</span>
//                               <span className="spec-value">{property.bathrooms || '0'}</span>
//                             </div>
//                             {property.propertyType === 'apartment' && (
//                               <div className="spec-item">
//                                 <span className="spec-label">Balconies</span>
//                                 <span className="spec-value">{property.balconies || '0'}</span>
//                               </div>
//                             )}
//                           </>
//                         )}
//                       </>
//                     )}

//                     {property.propertyType === 'office' && (
//                       <>
//                         <div className="spec-item">
//                           <span className="spec-label">Floor</span>
//                           <span className="spec-value">{property.floor || '0'}</span>
//                         </div>
//                         <div className="spec-item">
//                           <span className="spec-label">Total Floors</span>
//                           <span className="spec-value">{property.totalFloors || '0'}</span>
//                         </div>
//                         <div className="spec-item">
//                           <span className="spec-label">Parking Spaces</span>
//                           <span className="spec-value">{property.parkingSpaces || '0'}</span>
//                         </div>
//                       </>
//                     )}

//                     {property.propertyType === 'farmhouse' && (
//                       <>
//                         <div className="spec-item">
//                           <span className="spec-label">Garden Area</span>
//                           <span className="spec-value">{property.gardenArea || '0'} sq ft</span>
//                         </div>
//                         <div className="spec-item">
//                           <span className="spec-label">Swimming Pool</span>
//                           <span className="spec-value">{property.swimmingPool ? 'Yes' : 'No'}</span>
//                         </div>
//                       </>
//                     )}

//                     {property.propertyType === 'land' && (
//                       <div className="spec-item">
//                         <span className="spec-label">Zoning Type</span>
//                         <span className="spec-value">{property.zoningType || 'Not specified'}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'amenities' && (
//                 <div className="amenities-section">
//                   <div className="amenities-grid">
//                     {property.amenities?.length > 0 ? (
//                       property.amenities.map((amenity, index) => (
//                         <div key={index} className="amenity-item">
//                           <span className="amenity-name">{amenity}</span>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="no-amenities">No amenities listed</p>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'pricing' && (
//                 <div className="pricing-section">
//                   {property.isForSale && (
//                     <div className="price-item">
//                       <h3>Sale Price</h3>
//                       <p className="price sale-price">₹{property.price ? property.price.toLocaleString() : "N/A"}</p>
//                     </div>
//                   )}

//                   {property.isForRent && (
//                     <div className="price-item">
//                       <h3>Rent Price</h3>
//                       <p className="price rent-price">₹{property.rentPrice ? property.rentPrice.toLocaleString() : "N/A"}/month</p>
//                     </div>
//                   )}

//                   {!property.isForSale && !property.isForRent && (
//                     <p className="no-pricing">No pricing information available</p>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyModal;

// import React, { useState } from 'react';
// import ImageGallery from './ImageGallery';
// import './PropertyModal.css';

// const PropertyModal = ({ property, onClose, onEdit, onDelete }) => {
//   const [activeTab, setActiveTab] = useState('details');

//   if (!property) return null;

//   const handleDelete = () => {
//     if (window.confirm('Are you sure you want to delete this property?')) {
//       onDelete(property._id);
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // Function to format
//   //
//   //  property type for display
//   const formatPropertyType = (type) => {
//     if (!type) return 'Not specified';

//     // Map property type values to proper display names
//     const typeMap = {
//       'apartment': 'Apartment',
//       'farmhouse': 'Farmhouse',
//       'land': 'Land',
//       'office': 'Office'
//     };

//     return typeMap[type] || type.charAt(0).toUpperCase() + type.slice(1);
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <div className="modal-header">
//           <div className="modal-title-section">
//             <h2>{property.title}</h2>
//             <span className={`property-status ${property.status?.toLowerCase()}`}>
//               {property.status}
//             </span>
//           </div>
//           <div className="modal-actions">
//             <button className="action-button edit" onClick={() => onEdit(property)}>
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
//                 <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
//                 <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
//               </svg>
//               Edit
//             </button>
//             <button className="action-button delete" onClick={handleDelete}>
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
//                 <path d="M3 6h18" />
//                 <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
//               </svg>
//               Delete
//             </button>
//             <button className="modal-close" onClick={onClose}>
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="18" y1="6" x2="6" y2="18" />
//                 <line x1="6" y1="6" x2="18" y2="18" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         <div className="modal-body">
//           <div className="modal-gallery-section">
//             <ImageGallery images={property.images} />
//           </div>

//           <div className="modal-info-section">
//             <div className="tab-buttons">
//               <button
//                 className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('details')}
//               >
//                 Details
//               </button>
//               <button
//                 className={`tab-button ${activeTab === 'specifications' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('specifications')}
//               >
//                 Specifications
//               </button>
//               <button
//                 className={`tab-button ${activeTab === 'amenities' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('amenities')}
//               >
//                 Amenities
//               </button>
//               <button
//                 className={`tab-button ${activeTab === 'pricing' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('pricing')}
//               >
//                 Pricing
//               </button>
//             </div>

//             <div className="tab-content">
//               {activeTab === 'details' && (
//                 <>
//                   <div className="property-main-info">
//                     <div className="detail-item property-type-item">
//                       <span className="detail-label">Property Type</span>
//                       <span className="detail-value">{formatPropertyType(property.propertyType)}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Location</span>
//                       <span className="detail-value">{property.address}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Area</span>
//                       <span className="detail-value">{property.area || 'N/A'} sq ft</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Listed Date</span>
//                       <span className="detail-value">{formatDate(property.createdAt || new Date())}</span>
//                     </div>
//                   </div>

//                   <div className="description-section">
//                     <h3>Description</h3>
//                     <p>{property.description}</p>
//                   </div>

//                   <div className="status-section">
//                     <div className="detail-item">
//                       <span className="detail-label">Status</span>
//                       <span className={`status-badge ${property.status?.toLowerCase()}`}>{property.status}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Listed For</span>
//                       <div className="listed-for-tags">
//                         {property.isForSale && <span className="tag sale">Sale</span>}
//                         {property.isForRent && <span className="tag rent">Rent</span>}
//                         {!property.isForSale && !property.isForRent && <span className="tag">Not specified</span>}
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}

//               {activeTab === 'specifications' && (
//                 <div className="specifications-section">
//                   <div className="specs-grid">
//                     {property.propertyType !== 'land' && (
//                       <>
//                         <div className="spec-item">
//                           <span className="spec-label">Furnishing Status</span>
//                           <span className="spec-value">
//                             {property.furnishingStatus ? property.furnishingStatus.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Not specified'}
//                           </span>
//                         </div>

//                         {property.propertyType !== 'office' && (
//                           <>
//                             <div className="spec-item">
//                               <span className="spec-label">Bedrooms</span>
//                               <span className="spec-value">{property.bedrooms || '0'}</span>
//                             </div>
//                             <div className="spec-item">
//                               <span className="spec-label">Bathrooms</span>
//                               <span className="spec-value">{property.bathrooms || '0'}</span>
//                             </div>
//                             {property.propertyType === 'apartment' && (
//                               <div className="spec-item">
//                                 <span className="spec-label">Balconies</span>
//                                 <span className="spec-value">{property.balconies || '0'}</span>
//                               </div>
//                             )}
//                           </>
//                         )}
//                       </>
//                     )}

//                     {property.propertyType === 'office' && (
//                       <>
//                         <div className="spec-item">
//                           <span className="spec-label">Floor</span>
//                           <span className="spec-value">{property.floor || '0'}</span>
//                         </div>
//                         <div className="spec-item">
//                           <span className="spec-label">Total Floors</span>
//                           <span className="spec-value">{property.totalFloors || '0'}</span>
//                         </div>
//                         <div className="spec-item">
//                           <span className="spec-label">Parking Spaces</span>
//                           <span className="spec-value">{property.parkingSpaces || '0'}</span>
//                         </div>
//                       </>
//                     )}

//                     {property.propertyType === 'farmhouse' && (
//                       <>
//                         <div className="spec-item">
//                           <span className="spec-label">Garden Area</span>
//                           <span className="spec-value">{property.gardenArea || '0'} sq ft</span>
//                         </div>
//                         <div className="spec-item">
//                           <span className="spec-label">Swimming Pool</span>
//                           <span className="spec-value">{property.swimmingPool ? 'Yes' : 'No'}</span>
//                         </div>
//                       </>
//                     )}

//                     {property.propertyType === 'land' && (
//                       <div className="spec-item">
//                         <span className="spec-label">Zoning Type</span>
//                         <span className="spec-value">{property.zoningType || 'Not specified'}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'amenities' && (
//                 <div className="amenities-section">
//                   {property.amenities && property.amenities.length > 0 ? (
//                     <div className="amenities-grid">
//                       {property.amenities.map((amenity, index) => (
//                         <div key={index} className="amenity-item">
//                           <span className="amenity-name">{amenity}</span>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="no-amenities">No amenities listed</p>
//                   )}
//                 </div>
//               )}

//               {activeTab === 'pricing' && (
//                 <div className="pricing-section">
//                   {property.isForSale && (
//                     <div className="price-item">
//                       <h3>Sale Price</h3>
//                       <p className="price sale-price">₹{property.price ? property.price.toLocaleString() : "N/A"}</p>
//                     </div>
//                   )}

//                   {property.isForRent && (
//                     <div className="price-item">
//                       <h3>Rent Price</h3>
//                       <p className="price rent-price">₹{property.rentPrice ? property.rentPrice.toLocaleString() : "N/A"}/month</p>
//                     </div>
//                   )}

//                   {!property.isForSale && !property.isForRent && (
//                     <p className="no-pricing">No pricing information available</p>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyModal;

// import React, { useState } from 'react';
// import ImageGallery from './ImageGallery';
// import './PropertyModal.css';

// const PropertyModal = ({ property, onClose, onEdit, onDelete }) => {
//   const [activeTab, setActiveTab] = useState('details');

//   if (!property) return null;

//   const handleDelete = () => {
//     if (window.confirm('Are you sure you want to delete this property?')) {
//       onDelete(property._id);
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // Function to determine property type based on available fields
//   const determinePropertyType = (prop) => {
//     if (prop.zoningType) return 'land';
//     if (prop.floor) return 'office';
//     if (prop.gardenArea !== undefined || prop.swimmingPool !== undefined) return 'farmhouse';
//     if (prop.balconies !== undefined) return 'apartment';

//     // Default detection based on other fields
//     if (prop.bedrooms && prop.bathrooms) {
//       return 'apartment'; // If it has bedroom/bathroom but not garden/pool, likely apartment
//     }

//     return null; // Unable to determine
//   };

//   // Function to format property type for display
//   const formatPropertyType = (type) => {
//     const determinedType = type || determinePropertyType(property);

//     if (!determinedType) return 'Not specified';

//     // Map property type values to proper display names
//     const typeMap = {
//       'apartment': 'Apartment',
//       'farmhouse': 'Farmhouse',
//       'land': 'Land',
//       'office': 'Office'
//     };

//     return typeMap[determinedType] || determinedType.charAt(0).toUpperCase() + determinedType.slice(1);
//   };

//   // Function to format furnishing status
//   const formatFurnishingStatus = (status) => {
//     if (!status) return 'Not specified';

//     return status.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
//   };

//   // Function to ensure a numeric value is displayed properly
//   const formatNumber = (value, defaultValue = '0') => {
//     if (value === undefined || value === null) return defaultValue;
//     return value.toString();
//   };

//   // Function to format currency
//   const formatCurrency = (value) => {
//     if (value === undefined || value === null) return 'N/A';
//     return `₹${value.toLocaleString()}`;
//   };

//   // Function to format area
//   const formatArea = (value) => {
//     if (value === undefined || value === null) return 'N/A';
//     return `${value.toLocaleString()} sq ft`;
//   };

//   // Determine property type for conditional rendering
//   const propertyType = determinePropertyType(property);

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <div className="modal-header">
//           <div className="modal-title-section">
//             <h2>{property.title}</h2>
//             <span className={`property-status ${property.status?.toLowerCase() || 'available'}`}>
//               {property.status || 'Available'}
//             </span>
//           </div>
//           <div className="modal-actions">
//             <button className="action-button edit" onClick={() => onEdit(property)}>
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
//                 <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
//                 <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
//               </svg>
//               Edit
//             </button>
//             <button className="action-button delete" onClick={handleDelete}>
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
//                 <path d="M3 6h18" />
//                 <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
//               </svg>
//               Delete
//             </button>
//             <button className="modal-close" onClick={onClose}>
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="18" y1="6" x2="6" y2="18" />
//                 <line x1="6" y1="6" x2="18" y2="18" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         <div className="modal-body">
//           <div className="modal-gallery-section">
//             <ImageGallery images={property.images || []} />
//           </div>

//           <div className="modal-info-section">
//             <div className="tab-buttons">
//               <button
//                 className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('details')}
//               >
//                 Details
//               </button>
//               <button
//                 className={`tab-button ${activeTab === 'specifications' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('specifications')}
//               >
//                 Specifications
//               </button>
//               <button
//                 className={`tab-button ${activeTab === 'amenities' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('amenities')}
//               >
//                 Amenities
//               </button>
//               <button
//                 className={`tab-button ${activeTab === 'pricing' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('pricing')}
//               >
//                 Pricing
//               </button>
//             </div>

//             <div className="tab-content">
//               {activeTab === 'details' && (
//                 <>
//                   <div className="property-main-info">
//                     <div className="detail-item property-type-item">
//                       <span className="detail-label">Property Type</span>
//                       <span className="detail-value">{formatPropertyType(property.propertyType)}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Location</span>
//                       <span className="detail-value">{property.address || 'Not specified'}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Area</span>
//                       <span className="detail-value">{formatArea(property.area)}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Listed Date</span>
//                       <span className="detail-value">{formatDate(property.createdAt || new Date())}</span>
//                     </div>
//                   </div>

//                   <div className="description-section">
//                     <h3>Address</h3>
//                     <p>{property.description || 'No description available'}</p>
//                   </div>

//                   <div className="status-section">
//                     <div className="detail-item">
//                       <span className="detail-label">Status</span>
//                       <span className={`status-badge ${property.status?.toLowerCase() || 'available'}`}>
//                         {property.status || 'Available'}
//                       </span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Listed For</span>
//                       <div className="listed-for-tags">
//                         {property.isForSale && <span className="tag sale">Sale</span>}
//                         {property.isForRent && <span className="tag rent">Rent</span>}
//                         {!property.isForSale && !property.isForRent && <span className="tag">Not specified</span>}
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}

//               {activeTab === 'specifications' && (
//                 <div className="specifications-section">
//                   <div className="specs-grid">
//                     {propertyType !== 'land' && (
//                       <>
//                         <div className="spec-item">
//                           <span className="spec-label">Furnishing Status</span>
//                           <span className="spec-value">
//                             {formatFurnishingStatus(property.furnishingStatus || 'unfurnished')}
//                           </span>
//                         </div>

//                         {propertyType !== 'office' && (
//                           <>
//                             <div className="spec-item">
//                               <span className="spec-label">Bedrooms</span>
//                               <span className="spec-value">{formatNumber(property.bedrooms)}</span>
//                             </div>
//                             <div className="spec-item">
//                               <span className="spec-label">Bathrooms</span>
//                               <span className="spec-value">{formatNumber(property.bathrooms)}</span>
//                             </div>
//                             {propertyType === 'apartment' && (
//                               <div className="spec-item">
//                                 <span className="spec-label">Balconies</span>
//                                 <span className="spec-value">{formatNumber(property.balconies)}</span>
//                               </div>
//                             )}
//                           </>
//                         )}
//                       </>
//                     )}

//                     {propertyType === 'office' && (
//                       <>
//                         <div className="spec-item">
//                           <span className="spec-label">Floor</span>
//                           <span className="spec-value">{formatNumber(property.floor)}</span>
//                         </div>
//                         <div className="spec-item">
//                           <span className="spec-label">Total Floors</span>
//                           <span className="spec-value">{formatNumber(property.totalFloors)}</span>
//                         </div>
//                         <div className="spec-item">
//                           <span className="spec-label">Parking Spaces</span>
//                           <span className="spec-value">{formatNumber(property.parkingSpaces)}</span>
//                         </div>
//                       </>
//                     )}

//                     {propertyType === 'farmhouse' && (
//                       <>
//                         <div className="spec-item">
//                           <span className="spec-label">Garden Area</span>
//                           <span className="spec-value">{property.gardenArea ? `${property.gardenArea} sq ft` : '0 sq ft'}</span>
//                         </div>
//                         <div className="spec-item">
//                           <span className="spec-label">Swimming Pool</span>
//                           <span className="spec-value">{property.swimmingPool ? 'Yes' : 'No'}</span>
//                         </div>
//                       </>
//                     )}

//                     {propertyType === 'land' && (
//                       <div className="spec-item">
//                         <span className="spec-label">Zoning Type</span>
//                         <span className="spec-value">{property.zoningType || 'Not specified'}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'amenities' && (
//                 <div className="amenities-section">
//                   {property.amenities && property.amenities.length > 0 ? (
//                     <div className="amenities-grid">
//                       {property.amenities.map((amenity, index) => (
//                         <div key={index} className="amenity-item">
//                           <span className="amenity-name">{amenity}</span>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="no-amenities">No amenities listed</p>
//                   )}
//                 </div>
//               )}

//               {activeTab === 'pricing' && (
//                 <div className="pricing-section">
//                   {property.isForSale && (
//                     <div className="price-item">
//                       <h3>Sale Price</h3>
//                       <p className="price sale-price">{formatCurrency(property.price)}</p>
//                     </div>
//                   )}

//                   {property.isForRent && (
//                     <div className="price-item">
//                       <h3>Rent Price</h3>
//                       <p className="price rent-price">{formatCurrency(property.rentPrice)}/month</p>
//                     </div>
//                   )}

//                   {!property.isForSale && !property.isForRent && (
//                     <p className="no-pricing">No pricing information available</p>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyModal;

// after delete func
// import React, { useState } from 'react';
// import ImageGallery from './ImageGallery';
// import './PropertyModal.css';
// import axios from 'axios';

// const PropertyModal = ({ property, onClose, onEdit, onDelete }) => {
//   const [activeTab, setActiveTab] = useState('details');
//   const [isDeleting, setIsDeleting] = useState(false);

//   if (!property) return null;

//   // Function to determine property type based on available fields
//   const determinePropertyType = (prop) => {
//     if (prop.zoningType) return 'land';
//     if (prop.floor) return 'office';
//     if (prop.gardenArea !== undefined || prop.swimmingPool !== undefined) return 'farmhouse';
//     if (prop.balconies !== undefined) return 'apartment';

//     // Default detection based on other fields
//     if (prop.bedrooms && prop.bathrooms) {
//       return 'apartment'; // If it has bedroom/bathroom but not garden/pool, likely apartment
//     }

//     return 'apartment'; // Default to apartment if unable to determine
//   };

//   const handleDelete = async () => {
//     if (window.confirm('Are you sure you want to delete this property?')) {
//       try {
//         setIsDeleting(true);

//         // Determine property type
//         const propertyType = property.propertyType || determinePropertyType(property);

//         // Get token from localStorage or wherever you store it
//         const token = localStorage.getItem('token');

//         if (!token) {
//           throw new Error('Authentication token not found');
//         }

//         // Call the backend API to delete the property
//         await axios.delete(`http://localhost:5000/api/deleteProperty/${property._id}/${propertyType}`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         // Call the onDelete callback to update the UI
//         onDelete(property._id);

//         // Close the modal
//         onClose();
//       } catch (error) {
//         console.error('Error deleting property:', error);
//         alert(error.response?.data?.message || 'Failed to delete property. Please try again.');
//       } finally {
//         setIsDeleting(false);
//       }
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // Function to format property type for display
//   const formatPropertyType = (type) => {
//     const determinedType = type || determinePropertyType(property);

//     if (!determinedType) return 'Not specified';

//     // Map property type values to proper display names
//     const typeMap = {
//       'apartment': 'Apartment',
//       'farmhouse': 'Farmhouse',
//       'land': 'Land',
//       'office': 'Office'
//     };

//     return typeMap[determinedType] || determinedType.charAt(0).toUpperCase() + determinedType.slice(1);
//   };

//   // Function to format furnishing status
//   const formatFurnishingStatus = (status) => {
//     if (!status) return 'Not specified';

//     return status.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
//   };

//   // Function to ensure a numeric value is displayed properly
//   const formatNumber = (value, defaultValue = '0') => {
//     if (value === undefined || value === null) return defaultValue;
//     return value.toString();
//   };

//   // Function to format currency
//   const formatCurrency = (value) => {
//     if (value === undefined || value === null) return 'N/A';
//     return `₹${value.toLocaleString()}`;
//   };

//   // Function to format area
//   const formatArea = (value) => {
//     if (value === undefined || value === null) return 'N/A';
//     return `${value.toLocaleString()} sq ft`;
//   };

//   // Determine property type for conditional rendering
//   const propertyType = property.propertyType || determinePropertyType(property);

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <div className="modal-header">
//           <div className="modal-title-section">
//             <h2>{property.title}</h2>
//             <span className={`property-status ${property.status?.toLowerCase() || 'available'}`}>
//               {property.status || 'Available'}
//             </span>
//           </div>
//           <div className="modal-actions">
//             <button className="action-button edit" onClick={() => onEdit(property)}>
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
//                 <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
//                 <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
//               </svg>
//               Edit
//             </button>
//             <button className="action-button delete" onClick={handleDelete} disabled={isDeleting}>
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
//                 <path d="M3 6h18" />
//                 <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
//               </svg>
//               {isDeleting ? 'Deleting...' : 'Delete'}
//             </button>
//             <button className="modal-close" onClick={onClose}>
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="18" y1="6" x2="6" y2="18" />
//                 <line x1="6" y1="6" x2="18" y2="18" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         <div className="modal-body">
//           <div className="modal-gallery-section">
//             <ImageGallery images={property.images || []} />
//           </div>

//           <div className="modal-info-section">
//             <div className="tab-buttons">
//               <button
//                 className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('details')}
//               >
//                 Details
//               </button>
//               <button
//                 className={`tab-button ${activeTab === 'specifications' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('specifications')}
//               >
//                 Specifications
//               </button>
//               <button
//                 className={`tab-button ${activeTab === 'amenities' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('amenities')}
//               >
//                 Amenities
//               </button>
//               <button
//                 className={`tab-button ${activeTab === 'pricing' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('pricing')}
//               >
//                 Pricing
//               </button>
//             </div>

//             <div className="tab-content">
//               {activeTab === 'details' && (
//                 <>
//                   <div className="property-main-info">
//                     <div className="detail-item property-type-item">
//                       <span className="detail-label">Property Type</span>
//                       <span className="detail-value">{formatPropertyType(property.propertyType)}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Location</span>
//                       <span className="detail-value">{property.address || 'Not specified'}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Area</span>
//                       <span className="detail-value">{formatArea(property.area)}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Listed Date</span>
//                       <span className="detail-value">{formatDate(property.createdAt || new Date())}</span>
//                     </div>
//                   </div>

//                   <div className="description-section">
//                     <h3>Address</h3>
//                     <p>{property.description || 'No description available'}</p>
//                   </div>

//                   <div className="status-section">
//                     <div className="detail-item">
//                       <span className="detail-label">Status</span>
//                       <span className={`status-badge ${property.status?.toLowerCase() || 'available'}`}>
//                         {property.status || 'Available'}
//                       </span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Listed For</span>
//                       <div className="listed-for-tags">
//                         {property.isForSale && <span className="tag sale">Sale</span>}
//                         {property.isForRent && <span className="tag rent">Rent</span>}
//                         {!property.isForSale && !property.isForRent && <span className="tag">Not specified</span>}
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}

//               {activeTab === 'specifications' && (
//                 <div className="specifications-section">
//                   <div className="specs-grid">
//                     {propertyType !== 'land' && (
//                       <>
//                         <div className="spec-item">
//                           <span className="spec-label">Furnishing Status</span>
//                           <span className="spec-value">
//                             {formatFurnishingStatus(property.furnishingStatus || 'unfurnished')}
//                           </span>
//                         </div>

//                         {propertyType !== 'office' && (
//                           <>
//                             <div className="spec-item">
//                               <span className="spec-label">Bedrooms</span>
//                               <span className="spec-value">{formatNumber(property.bedrooms)}</span>
//                             </div>
//                             <div className="spec-item">
//                               <span className="spec-label">Bathrooms</span>
//                               <span className="spec-value">{formatNumber(property.bathrooms)}</span>
//                             </div>
//                             {propertyType === 'apartment' && (
//                               <div className="spec-item">
//                                 <span className="spec-label">Balconies</span>
//                                 <span className="spec-value">{formatNumber(property.balconies)}</span>
//                               </div>
//                             )}
//                           </>
//                         )}
//                       </>
//                     )}

//                     {propertyType === 'office' && (
//                       <>
//                         <div className="spec-item">
//                           <span className="spec-label">Floor</span>
//                           <span className="spec-value">{formatNumber(property.floor)}</span>
//                         </div>
//                         <div className="spec-item">
//                           <span className="spec-label">Total Floors</span>
//                           <span className="spec-value">{formatNumber(property.totalFloors)}</span>
//                         </div>
//                         <div className="spec-item">
//                           <span className="spec-label">Parking Spaces</span>
//                           <span className="spec-value">{formatNumber(property.parkingSpaces)}</span>
//                         </div>
//                       </>
//                     )}

//                     {propertyType === 'farmhouse' && (
//                       <>
//                         <div className="spec-item">
//                           <span className="spec-label">Garden Area</span>
//                           <span className="spec-value">{property.gardenArea ? `${property.gardenArea} sq ft` : '0 sq ft'}</span>
//                         </div>
//                         <div className="spec-item">
//                           <span className="spec-label">Swimming Pool</span>
//                           <span className="spec-value">{property.swimmingPool ? 'Yes' : 'No'}</span>
//                         </div>
//                       </>
//                     )}

//                     {propertyType === 'land' && (
//                       <div className="spec-item">
//                         <span className="spec-label">Zoning Type</span>
//                         <span className="spec-value">{property.zoningType || 'Not specified'}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'amenities' && (
//                 <div className="amenities-section">
//                   {property.amenities && property.amenities.length > 0 ? (
//                     <div className="amenities-grid">
//                       {property.amenities.map((amenity, index) => (
//                         <div key={index} className="amenity-item">
//                           <span className="amenity-name">{amenity}</span>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="no-amenities">No amenities listed</p>
//                   )}
//                 </div>
//               )}

//               {activeTab === 'pricing' && (
//                 <div className="pricing-section">
//                   {property.isForSale && (
//                     <div className="price-item">
//                       <h3>Sale Price</h3>
//                       <p className="price sale-price">{formatCurrency(property.price)}</p>
//                     </div>
//                   )}

//                   {property.isForRent && (
//                     <div className="price-item">
//                       <h3>Rent Price</h3>
//                       <p className="price rent-price">{formatCurrency(property.rentPrice)}/month</p>
//                     </div>
//                   )}

//                   {!property.isForSale && !property.isForRent && (
//                     <p className="no-pricing">No pricing information available</p>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyModal;

// import React, { useState } from 'react';
// import ImageGallery from './ImageGallery';
// import './PropertyModal.css';
// import axios from 'axios'; // Make sure axios is installed

// const PropertyModal = ({ property, onClose, onEdit, onDelete }) => {
//   const [activeTab, setActiveTab] = useState('details');
//   const [isDeleting, setIsDeleting] = useState(false);

//   if (!property) return null;

//   const handleDelete = async () => {
//     if (window.confirm('Are you sure you want to delete this property?')) {
//       try {
//         setIsDeleting(true);

//         // Use property.propertyType directly if available, otherwise determine it
//         const propertyType = property.propertyType || determinePropertyType(property);
//         if (!propertyType) {
//           throw new Error('Unable to determine property type');
//         }

//         // Get token from localStorage
//         const token = localStorage.getItem('token');
//         if (!token) {
//           throw new Error('Authentication required');
//         }

//         // Define API base URL
//         const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

//         // Make sure propertyType is included in the request URL
//         const response = await axios.delete(`${API_BASE_URL}/api/properties/${property._id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           },
//           data: { propertyType } // Send propertyType in the request body
//         });

//         console.log('Delete response:', response);

//         // Call the onDelete callback to update UI
//         if (response.status === 200) {
//           onDelete(property._id);
//           onClose();
//         } else {
//           throw new Error(response.data.message || 'Failed to delete property');
//         }
//       } catch (error) {
//         console.error('Error deleting property:', error);

//         // More detailed error logging
//         if (error.response) {
//           console.error('Response data:', error.response.data);
//           console.error('Response status:', error.response.status);
//           console.error('Response headers:', error.response.headers);

//           alert(`Failed to delete property: ${error.response.data.message || error.response.statusText}`);
//         } else if (error.request) {
//           console.error('Request made but no response received:', error.request);
//           alert('Failed to connect to the server. Please check your internet connection and try again.');
//         } else {
//           console.error('Error setting up request:', error.message);
//           alert(`Failed to delete property: ${error.message}`);
//         }
//       } finally {
//         setIsDeleting(false);
//       }
//     }
//   };

//   // Function to determine property type based on available fields
//   const determinePropertyType = (prop) => {
//     if (prop.zoningType) return 'land';
//     if (prop.floor !== undefined) return 'office';
//     if (prop.gardenArea !== undefined || prop.swimmingPool !== undefined) return 'farmhouse';
//     if (prop.balconies !== undefined) return 'apartment';

//     // Default detection based on other fields
//     if (prop.bedrooms !== undefined && prop.bathrooms !== undefined) {
//       return 'apartment';
//     }

//     return 'apartment'; // Default fallback
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // Function to format property type for display
//   const formatPropertyType = (type) => {
//     const determinedType = type || determinePropertyType(property);

//     if (!determinedType) return 'Not specified';

//     // Map property type values to proper display names
//     const typeMap = {
//       'apartment': 'Apartment',
//       'farmhouse': 'Farmhouse',
//       'land': 'Land',
//       'office': 'Office'
//     };

//     return typeMap[determinedType] || determinedType.charAt(0).toUpperCase() + determinedType.slice(1);
//   };

//   // Function to format furnishing status
//   const formatFurnishingStatus = (status) => {
//     if (!status) return 'Not specified';

//     return status.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
//   };

//   // Function to ensure a numeric value is displayed properly
//   const formatNumber = (value, defaultValue = '0') => {
//     if (value === undefined || value === null) return defaultValue;
//     return value.toString();
//   };

//   // Function to format currency
//   const formatCurrency = (value) => {
//     if (value === undefined || value === null) return 'N/A';
//     return `₹${value.toLocaleString()}`;
//   };

//   // Function to format area
//   const formatArea = (value) => {
//     if (value === undefined || value === null) return 'N/A';
//     return `${value.toLocaleString()} sq ft`;
//   };

//   // Determine property type for conditional rendering
//   const propertyType = property.propertyType || determinePropertyType(property);

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <div className="modal-header">
//           <div className="modal-title-section">
//             <h2>{property.title}</h2>
//             <span className={`property-status ${property.status?.toLowerCase() || 'available'}`}>
//               {property.status || 'Available'}
//             </span>
//           </div>
//           <div className="modal-actions">
//             <button className="action-button edit" onClick={() => onEdit(property)}>
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
//                 <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
//                 <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
//               </svg>
//               Edit
//             </button>
//             <button
//               className={`action-button delete ${isDeleting ? 'disabled' : ''}`}
//               onClick={handleDelete}
//               disabled={isDeleting}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
//                 <path d="M3 6h18" />
//                 <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
//               </svg>
//               {isDeleting ? 'Deleting...' : 'Delete'}
//             </button>
//             <button className="modal-close" onClick={onClose}>
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="18" y1="6" x2="6" y2="18" />
//                 <line x1="6" y1="6" x2="18" y2="18" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         <div className="modal-body">
//           <div className="modal-gallery-section">
//             <ImageGallery images={property.images || []} />
//           </div>

//           <div className="modal-info-section">
//             <div className="tab-buttons">
//               <button
//                 className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('details')}
//               >
//                 Details
//               </button>
//               <button
//                 className={`tab-button ${activeTab === 'specifications' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('specifications')}
//               >
//                 Specifications
//               </button>
//               <button
//                 className={`tab-button ${activeTab === 'amenities' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('amenities')}
//               >
//                 Amenities
//               </button>
//               <button
//                 className={`tab-button ${activeTab === 'pricing' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('pricing')}
//               >
//                 Pricing
//               </button>
//             </div>

//             <div className="tab-content">
//               {activeTab === 'details' && (
//                 <>
//                   <div className="property-main-info">
//                     <div className="detail-item property-type-item">
//                       <span className="detail-label">Property Type</span>
//                       <span className="detail-value">{formatPropertyType(property.propertyType)}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Location</span>
//                       <span className="detail-value">{property.address || 'Not specified'}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Area</span>
//                       <span className="detail-value">{formatArea(property.area)}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Listed Date</span>
//                       <span className="detail-value">{formatDate(property.createdAt || new Date())}</span>
//                     </div>
//                   </div>

//                   <div className="description-section">
//                     <h3>Address</h3>
//                     <p>{property.description || 'No description available'}</p>
//                   </div>

//                   <div className="status-section">
//                     <div className="detail-item">
//                       <span className="detail-label">Status</span>
//                       <span className={`status-badge ${property.status?.toLowerCase() || 'available'}`}>
//                         {property.status || 'Available'}
//                       </span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Listed For</span>
//                       <div className="listed-for-tags">
//                         {property.isForSale && <span className="tag sale">Sale</span>}
//                         {property.isForRent && <span className="tag rent">Rent</span>}
//                         {!property.isForSale && !property.isForRent && <span className="tag">Not specified</span>}
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}

//               {activeTab === 'specifications' && (
//                 <div className="specifications-section">
//                   <div className="specs-grid">
//                     {propertyType !== 'land' && (
//                       <>
//                         <div className="spec-item">
//                           <span className="spec-label">Furnishing Status</span>
//                           <span className="spec-value">
//                             {formatFurnishingStatus(property.furnishingStatus || 'unfurnished')}
//                           </span>
//                         </div>

//                         {propertyType !== 'office' && (
//                           <>
//                             <div className="spec-item">
//                               <span className="spec-label">Bedrooms</span>
//                               <span className="spec-value">{formatNumber(property.bedrooms)}</span>
//                             </div>
//                             <div className="spec-item">
//                               <span className="spec-label">Bathrooms</span>
//                               <span className="spec-value">{formatNumber(property.bathrooms)}</span>
//                             </div>
//                             {propertyType === 'apartment' && (
//                               <div className="spec-item">
//                                 <span className="spec-label">Balconies</span>
//                                 <span className="spec-value">{formatNumber(property.balconies)}</span>
//                               </div>
//                             )}
//                           </>
//                         )}
//                       </>
//                     )}

//                     {propertyType === 'office' && (
//                       <>
//                         <div className="spec-item">
//                           <span className="spec-label">Floor</span>
//                           <span className="spec-value">{formatNumber(property.floor)}</span>
//                         </div>
//                         <div className="spec-item">
//                           <span className="spec-label">Total Floors</span>
//                           <span className="spec-value">{formatNumber(property.totalFloors)}</span>
//                         </div>
//                         <div className="spec-item">
//                           <span className="spec-label">Parking Spaces</span>
//                           <span className="spec-value">{formatNumber(property.parkingSpaces)}</span>
//                         </div>
//                       </>
//                     )}

//                     {propertyType === 'farmhouse' && (
//                       <>
//                         <div className="spec-item">
//                           <span className="spec-label">Garden Area</span>
//                           <span className="spec-value">{property.gardenArea ? `${property.gardenArea} sq ft` : '0 sq ft'}</span>
//                         </div>
//                         <div className="spec-item">
//                           <span className="spec-label">Swimming Pool</span>
//                           <span className="spec-value">{property.swimmingPool ? 'Yes' : 'No'}</span>
//                         </div>
//                       </>
//                     )}

//                     {propertyType === 'land' && (
//                       <div className="spec-item">
//                         <span className="spec-label">Zoning Type</span>
//                         <span className="spec-value">{property.zoningType || 'Not specified'}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'amenities' && (
//                 <div className="amenities-section">
//                   {property.amenities && property.amenities.length > 0 ? (
//                     <div className="amenities-grid">
//                       {property.amenities.map((amenity, index) => (
//                         <div key={index} className="amenity-item">
//                           <span className="amenity-name">{amenity}</span>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="no-amenities">No amenities listed</p>
//                   )}
//                 </div>
//               )}

//               {activeTab === 'pricing' && (
//                 <div className="pricing-section">
//                   {property.isForSale && (
//                     <div className="price-item">
//                       <h3>Sale Price</h3>
//                       <p className="price sale-price">{formatCurrency(property.price)}</p>
//                     </div>
//                   )}

//                   {property.isForRent && (
//                     <div className="price-item">
//                       <h3>Rent Price</h3>
//                       <p className="price rent-price">{formatCurrency(property.rentPrice)}/month</p>
//                     </div>
//                   )}

//                   {!property.isForSale && !property.isForRent && (
//                     <p className="no-pricing">No pricing information available</p>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyModal;

import React, { useState } from "react";
import ImageGallery from "./ImageGallery";
import "./PropertyModal.css";
import axios from "axios";
import PropertyEditForm from "./PropertyEditForm";

const PropertyModal = ({
  property,
  onClose,
  onEdit,
  onDelete,
  onPropertyUpdated,
}) => {
  const [activeTab, setActiveTab] = useState("details");
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  if (!property) return null;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        setIsDeleting(true);
        setDeleteError(null);

        // Determine property type
        const propertyType = determinePropertyType(property);

        if (!propertyType) {
          setDeleteError("Cannot delete: Unable to determine property type");
          setIsDeleting(false);
          return;
        }

        // Get token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          setDeleteError("You must be logged in to delete a property");
          setIsDeleting(false);
          return;
        }

        // Make API call to delete property
        const response = await axios.delete(
          `http://localhost:5000/api/deleteProperty/${property._id}/${propertyType}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Check if the response indicates success
        if (response.status >= 200 && response.status < 300) {
          // Immediately call onDelete to update the UI
          if (typeof onDelete === "function") {
            onDelete(property._id);
          }

          // Close the modal after successful deletion
          onClose();
        } else {
          // Handle unexpected success status codes
          setDeleteError("Unexpected response when deleting property");
        }
      } catch (error) {
        console.error("Error deleting property:", error);

        // Check if it's a 404 (not found) which could mean it was already deleted
        if (error.response && error.response.status === 404) {
          // The property might have been deleted already
          if (typeof onDelete === "function") {
            onDelete(property._id);
          }
          onClose();
          return;
        }

        // Handle other errors
        let errorMessage = "Failed to delete property";

        if (error.response) {
          if (error.response.status === 403) {
            errorMessage = "You can only delete your own properties.";
          } else if (error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage =
            "Network error occurred. Please check your connection.";
        }

        setDeleteError(errorMessage);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Function to determine property type based on available fields
  const determinePropertyType = (prop) => {
    if (prop.propertyType) return prop.propertyType; // Use explicit type if available

    if (prop.zoningType) return "land";
    if (prop.floor !== undefined) return "office";
    if (prop.gardenArea !== undefined || prop.swimmingPool !== undefined)
      return "farmhouse";
    if (prop.balconies !== undefined) return "apartment";

    // Default detection based on other fields
    if (prop.bedrooms && prop.bathrooms) {
      return "apartment"; // If it has bedroom/bathroom but not garden/pool, likely apartment
    }

    return "apartment"; // Default to apartment if we can't determine
  };

  // Function to format property type for display
  const formatPropertyType = (type) => {
    const determinedType = type || determinePropertyType(property);

    if (!determinedType) return "Not specified";

    // Map property type values to proper display names
    const typeMap = {
      apartment: "Apartment",
      farmhouse: "Farmhouse",
      land: "Land",
      office: "Office",
    };

    return (
      typeMap[determinedType] ||
      determinedType.charAt(0).toUpperCase() + determinedType.slice(1)
    );
  };

  // Function to format furnishing status
  const formatFurnishingStatus = (status) => {
    if (!status) return "Not specified";

    return status.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Function to ensure a numeric value is displayed properly
  const formatNumber = (value, defaultValue = "0") => {
    if (value === undefined || value === null) return defaultValue;
    return value.toString();
  };

  // Function to format currency
  const formatCurrency = (value) => {
    if (value === undefined || value === null) return "N/A";
    return `₹${value.toLocaleString()}`;
  };

  // Function to format area
  const formatArea = (value) => {
    if (value === undefined || value === null) return "N/A";
    return `${value.toLocaleString()} sq ft`;
  };

  // Determine property type for conditional rendering
  const propertyType = determinePropertyType(property);

  // Handler for edit button
  const handleEditClick = () => {
    setShowEditForm(true);
  };

  // Handler for property updates
  const handlePropertyUpdated = (updatedProperty) => {
    if (typeof onPropertyUpdated === "function") {
      onPropertyUpdated(updatedProperty);
    }
  };

  // If edit form is showing, render that instead of the modal content
  if (showEditForm) {
    return (
      <PropertyEditForm
        property={property}
        onClose={() => setShowEditForm(false)}
        onPropertyUpdated={handlePropertyUpdated}
      />
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-section">
            <h2>{property.title}</h2>
            <span
              className={`property-status ${property.status?.toLowerCase() || "available"}`}
            >
              {property.status || "Available"}
            </span>
          </div>
          <div className="modal-actions">
            <button className="action-button edit" onClick={handleEditClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit
            </button>
            <button
              className="action-button delete"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
            <button className="modal-close" onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {deleteError && (
          <div className="error-banner">
            <p>{deleteError}</p>
          </div>
        )}

        <div className="modal-body">
          <div className="modal-gallery-section">
            <ImageGallery images={property.images || []} />
          </div>

          <div className="modal-info-section">
            <div className="tab-buttons">
              <button
                className={`tab-button ${activeTab === "details" ? "active" : ""}`}
                onClick={() => setActiveTab("details")}
              >
                Details
              </button>
              <button
                className={`tab-button ${activeTab === "specifications" ? "active" : ""}`}
                onClick={() => setActiveTab("specifications")}
              >
                Specifications
              </button>
              <button
                className={`tab-button ${activeTab === "amenities" ? "active" : ""}`}
                onClick={() => setActiveTab("amenities")}
              >
                Amenities
              </button>
              <button
                className={`tab-button ${activeTab === "pricing" ? "active" : ""}`}
                onClick={() => setActiveTab("pricing")}
              >
                Pricing
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "details" && (
                <>
                  <div className="property-main-info">
                    <div className="detail-item property-type-item">
                      <span className="detail-label">Property Type</span>
                      <span className="detail-value">
                        {formatPropertyType(property.propertyType)}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Location</span>
                      <span className="detail-value">
                        {property.address || "Not specified"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Area</span>
                      <span className="detail-value">
                        {formatArea(property.area)}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Listed Date</span>
                      <span className="detail-value">
                        {formatDate(property.createdAt || new Date())}
                      </span>
                    </div>
                  </div>

                  <div className="description-section">
                    <h3>Address</h3>
                    <p>{property.description || "No description available"}</p>
                  </div>

                  <div className="status-section">
                    <div className="detail-item">
                      <span className="detail-label">Status</span>
                      <span
                        className={`status-badge ${property.status?.toLowerCase() || "available"}`}
                      >
                        {property.status || "Available"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Listed For</span>
                      <div className="listed-for-tags">
                        {property.isForSale && (
                          <span className="tag sale">Sale</span>
                        )}
                        {property.isForRent && (
                          <span className="tag rent">Rent</span>
                        )}
                        {!property.isForSale && !property.isForRent && (
                          <span className="tag">Not specified</span>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "specifications" && (
                <div className="specifications-section">
                  <div className="specs-grid">
                    {propertyType !== "land" && (
                      <>
                        <div className="spec-item">
                          <span className="spec-label">Furnishing Status</span>
                          <span className="spec-value">
                            {formatFurnishingStatus(
                              property.furnishingStatus || "unfurnished"
                            )}
                          </span>
                        </div>

                        {propertyType !== "office" && (
                          <>
                            <div className="spec-item">
                              <span className="spec-label">Bedrooms</span>
                              <span className="spec-value">
                                {formatNumber(property.bedrooms)}
                              </span>
                            </div>
                            <div className="spec-item">
                              <span className="spec-label">Bathrooms</span>
                              <span className="spec-value">
                                {formatNumber(property.bathrooms)}
                              </span>
                            </div>
                            {propertyType === "apartment" && (
                              <div className="spec-item">
                                <span className="spec-label">Balconies</span>
                                <span className="spec-value">
                                  {formatNumber(property.balconies)}
                                </span>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}

                    {propertyType === "office" && (
                      <>
                        <div className="spec-item">
                          <span className="spec-label">Floor</span>
                          <span className="spec-value">
                            {formatNumber(property.floor)}
                          </span>
                        </div>
                        <div className="spec-item">
                          <span className="spec-label">Total Floors</span>
                          <span className="spec-value">
                            {formatNumber(property.totalFloors)}
                          </span>
                        </div>
                        <div className="spec-item">
                          <span className="spec-label">Parking Spaces</span>
                          <span className="spec-value">
                            {formatNumber(property.parkingSpaces)}
                          </span>
                        </div>
                      </>
                    )}

                    {propertyType === "farmhouse" && (
                      <>
                        <div className="spec-item">
                          <span className="spec-label">Garden Area</span>
                          <span className="spec-value">
                            {property.gardenArea
                              ? `${property.gardenArea} sq ft`
                              : "0 sq ft"}
                          </span>
                        </div>
                        <div className="spec-item">
                          <span className="spec-label">Swimming Pool</span>
                          <span className="spec-value">
                            {property.swimmingPool ? "Yes" : "No"}
                          </span>
                        </div>
                      </>
                    )}

                    {propertyType === "land" && (
                      <div className="spec-item">
                        <span className="spec-label">Zoning Type</span>
                        <span className="spec-value">
                          {property.zoningType || "Not specified"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "amenities" && (
                <div className="amenities-section">
                  {property.amenities && property.amenities.length > 0 ? (
                    <div className="amenities-grid">
                      {property.amenities.map((amenity, index) => (
                        <div key={index} className="amenity-item">
                          <span className="amenity-name">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-amenities">No amenities listed</p>
                  )}
                </div>
              )}

              {activeTab === "pricing" && (
                <div className="pricing-section">
                  {property.isForSale && (
                    <div className="price-item">
                      <h3>Sale Price</h3>
                      <p className="price sale-price">
                        {formatCurrency(property.price)}
                      </p>
                    </div>
                  )}

                  {property.isForRent && (
                    <div className="price-item">
                      <h3>Rent Price</h3>
                      <p className="price rent-price">
                        {formatCurrency(property.rentPrice)}/month
                      </p>
                    </div>
                  )}

                  {!property.isForSale && !property.isForRent && (
                    <p className="no-pricing">
                      No pricing information available
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;

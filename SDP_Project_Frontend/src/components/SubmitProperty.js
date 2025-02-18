// import React, { useState } from 'react';
// import { X } from 'lucide-react';

// const SubmitProperty = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [formData, setFormData] = useState({
//     propertyType: '',
//     title: '',
//     description: '',
//     address: '',
//     area: '',
//     status: 'available',
//     bedrooms: '',
//     bathrooms: '',
//     balconies: '',
//     furnishingStatus: 'unfurnished',
//     isForSale: false,
//     isForRent: false,
//     rentPrice: '',
//     price: '',
//     floor: '',
//     totalFloors: '',
//     parkingSpaces: '',
//     gardenArea: '',
//     swimmingPool: false,
//     zoningType: '',
//     images: []
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData(prev => ({
//       ...prev,
//       images: [...prev.images, ...files]
//     }));
//   };

//   const removeImage = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index)
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission here
//     console.log(formData);
//   };

//   return (
//     <div className="submit-property">
//       <div className="page-indicator">
//         <div className={`indicator ${currentPage === 1 ? 'active' : ''}`}>
//             1
//         </div>
//         <div className={`indicator ${currentPage === 2 ? 'active' : ''}`}>2</div>
//       </div>

//       <form onSubmit={handleSubmit} className="property-form">
//         {currentPage === 1 && (
//           <div className="form-page">
//             <h2>Property Details</h2>
            
//             <div className="form-section">
//               <div className="form-group">
//                 <label>Property Type</label>
//                 <select name="propertyType" value={formData.propertyType} onChange={handleChange}>
//                   <option value="">Select Type</option>
//                   <option value="apartment">Apartment</option>
//                   <option value="farmhouse">Farmhouse</option>
//                   <option value="land">Land</option>
//                   <option value="office">Office</option>
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>Title</label>
//                 <input 
//                   type="text" 
//                   name="title" 
//                   value={formData.title} 
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="form-group full-width">
//                 <label>Description</label>
//                 <textarea 
//                   name="description" 
//                   value={formData.description} 
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Address</label>
//                 <input 
//                   type="text" 
//                   name="address" 
//                   value={formData.address} 
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Area (sq ft)</label>
//                 <input 
//                   type="number" 
//                   name="area" 
//                   value={formData.area} 
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {formData.propertyType !== 'land' && (
//                 <>
//                   <div className="form-group">
//                     <label>Furnishing Status</label>
//                     <select name="furnishingStatus" value={formData.furnishingStatus} onChange={handleChange}>
//                       <option value="unfurnished">Unfurnished</option>
//                       <option value="semi-furnished">Semi-furnished</option>
//                       <option value="fully furnished">Fully Furnished</option>
//                     </select>
//                   </div>

//                   {formData.propertyType !== 'office' && (
//                     <>
//                       <div className="form-group">
//                         <label>Bedrooms</label>
//                         <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} />
//                       </div>

//                       <div className="form-group">
//                         <label>Bathrooms</label>
//                         <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} />
//                       </div>

//                       {formData.propertyType === 'apartment' && (
//                         <div className="form-group">
//                           <label>Balconies</label>
//                           <input type="number" name="balconies" value={formData.balconies} onChange={handleChange} />
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </>
//               )}

//               {formData.propertyType === 'office' && (
//                 <>
//                   <div className="form-group">
//                     <label>Floor</label>
//                     <input type="number" name="floor" value={formData.floor} onChange={handleChange} />
//                   </div>

//                   <div className="form-group">
//                     <label>Total Floors</label>
//                     <input type="number" name="totalFloors" value={formData.totalFloors} onChange={handleChange} />
//                   </div>

//                   <div className="form-group">
//                     <label>Parking Spaces</label>
//                     <input type="number" name="parkingSpaces" value={formData.parkingSpaces} onChange={handleChange} />
//                   </div>
//                 </>
//               )}

//               {formData.propertyType === 'farmhouse' && (
//                 <>
//                   <div className="form-group">
//                     <label>Garden Area</label>
//                     <input type="number" name="gardenArea" value={formData.gardenArea} onChange={handleChange} />
//                   </div>

//                   <div className="form-group">
//                     <label>Swimming Pool</label>
//                     <input 
//                       type="checkbox" 
//                       name="swimmingPool" 
//                       checked={formData.swimmingPool} 
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </>
//               )}

//               {formData.propertyType === 'land' && (
//                 <div className="form-group">
//                   <label>Zoning Type</label>
//                   <input type="text" name="zoningType" value={formData.zoningType} onChange={handleChange} />
//                 </div>
//               )}

//               <div className="form-group">
//                 <label>Status</label>
//                 <select name="status" value={formData.status} onChange={handleChange}>
//                   <option value="available">Available</option>
//                   <option value="sold">Sold</option>
//                   <option value="rented">Rented</option>
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>For Sale</label>
//                 <input 
//                   type="checkbox" 
//                   name="isForSale" 
//                   checked={formData.isForSale} 
//                   onChange={handleChange}
//                 />
//               </div>

//               {formData.isForSale && (
//                 <div className="form-group">
//                   <label>Sale Price</label>
//                   <input 
//                     type="number" 
//                     name="price" 
//                     value={formData.price} 
//                     onChange={handleChange}
//                   />
//                 </div>
//               )}

//               <div className="form-group">
//                 <label>For Rent</label>
//                 <input 
//                   type="checkbox" 
//                   name="isForRent" 
//                   checked={formData.isForRent} 
//                   onChange={handleChange}
//                 />
//               </div>

//               {formData.isForRent && (
//                 <div className="form-group">
//                   <label>Rent Price</label>
//                   <input 
//                     type="number" 
//                     name="rentPrice" 
//                     value={formData.rentPrice} 
//                     onChange={handleChange}
//                   />
//                 </div>
//               )}
//             </div>

//             <div className="button-group">
//               <button 
//                 type="button" 
//                 className="next-btn" 
//                 onClick={() => setCurrentPage(2)}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}

//         {currentPage === 2 && (
//           <div className="form-page">
//             <h2>Property Images</h2>
            
//             <div className="image-upload-section">
//               <div className="upload-container">
//                 <input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="file-input"
//                 />
//                 <div className="upload-box">
//                   <p>Click or drag images here to upload</p>
//                 </div>
//               </div>

//               <div className="image-preview-container">
//                 {formData.images.map((image, index) => (
//                   <div key={index} className="image-preview">
//                     <img src={URL.createObjectURL(image)} alt={`Preview ${index + 1}`} />
//                     <button 
//                       type="button" 
//                       className="remove-image" 
//                       onClick={() => removeImage(index)}
//                     >
//                       <X size={16} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="button-group">
//               <button 
//                 type="button" 
//                 className="prev-btn" 
//                 onClick={() => setCurrentPage(1)}
//               >
//                 Previous
//               </button>
//               <button type="submit" className="submit-btn">
//                 Submit Property
//               </button>
//             </div>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default SubmitProperty;



// import React, { useState } from 'react';
// import { X } from 'lucide-react';
// import './SubmitProperty.css'; // Make sure you import the updated CSS file

// const SubmitProperty = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [formData, setFormData] = useState({
//     propertyType: '',
//     title: '',
//     description: '',
//     address: '',
//     area: '',
//     status: 'available',
//     bedrooms: '',
//     bathrooms: '',
//     isForSale: false,
//     isForRent: false,
//     rentPrice: '',
//     price: '',
//     images: []
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData(prev => ({
//       ...prev,
//       images: [...prev.images, ...files]
//     }));
//   };

//   const removeImage = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index)
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//   };

//   return (
//     <div className="submit-property">
//       {/* Page Indicator */}
//       <div className="page-indicator">
//         <div className={`indicator ${currentPage === 1 ? 'active' : ''}`} onClick={() => setCurrentPage(1)}>1</div>
//         <div className={`indicator ${currentPage === 2 ? 'active' : ''}`} onClick={() => setCurrentPage(2)}>2</div>
//       </div>

//       {/* Form Start */}
//       <form onSubmit={handleSubmit}>
//         {/* Page 1 - Property Details */}
//         {currentPage === 1 && (
//           <div className="form-page">
//             <h2>Property Details</h2>

//             <div className="form-section">
//               <div className="form-group">
//                 <label>Property Type</label>
//                 <select name="propertyType" value={formData.propertyType} onChange={handleChange}>
//                   <option value="">Select Type</option>
//                   <option value="apartment">Apartment</option>
//                   <option value="farmhouse">Farmhouse</option>
//                   <option value="land">Land</option>
//                   <option value="office">Office</option>
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>Title</label>
//                 <input type="text" name="title" value={formData.title} onChange={handleChange} required />
//               </div>

//               <div className="form-group full-width">
//                 <label>Description</label>
//                 <textarea name="description" value={formData.description} onChange={handleChange} required />
//               </div>

//               <div className="form-group">
//                 <label>Address</label>
//                 <input type="text" name="address" value={formData.address} onChange={handleChange} required />
//               </div>

//               <div className="form-group">
//                 <label>Area (sq ft)</label>
//                 <input type="number" name="area" value={formData.area} onChange={handleChange} required />
//               </div>

//               {/* Sale & Rent Section */}
//               <div className="form-group">
//                 <label>For Sale</label>
//                 <input type="checkbox" name="isForSale" checked={formData.isForSale} onChange={handleChange} />
//               </div>
//               {formData.isForSale && (
//                 <div className="form-group">
//                   <label>Sale Price</label>
//                   <input type="number" name="price" value={formData.price} onChange={handleChange} />
//                 </div>
//               )}

//               <div className="form-group">
//                 <label>For Rent</label>
//                 <input type="checkbox" name="isForRent" checked={formData.isForRent} onChange={handleChange} />
//               </div>
//               {formData.isForRent && (
//                 <div className="form-group">
//                   <label>Rent Price</label>
//                   <input type="number" name="rentPrice" value={formData.rentPrice} onChange={handleChange} />
//                 </div>
//               )}
//             </div>

//             <div className="button-group">
//               <button type="button" className="btn-next" onClick={() => setCurrentPage(2)}>Next</button>
//             </div>
//           </div>
//         )}

//         {/* Page 2 - Upload Images */}
//         {currentPage === 2 && (
//           <div className="form-page">
//             <h2>Property Images</h2>

//             <div className="image-upload-section">
//               <div className="upload-container">
//                 <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="file-input" />
//                 <div className="upload-box">
//                   <p>Click or drag images here to upload</p>
//                 </div>
//               </div>

//               <div className="image-preview-container">
//                 {formData.images.map((image, index) => (
//                   <div key={index} className="image-preview">
//                     <img src={URL.createObjectURL(image)} alt={`Preview ${index + 1}`} />
//                     <button type="button" className="remove-image" onClick={() => removeImage(index)}>
//                       <X size={16} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="button-group">
//               <button type="button" className="btn-prev" onClick={() => setCurrentPage(1)}>Previous</button>
//               <button type="submit" className="submit-btn">Submit Property</button>
//             </div>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default SubmitProperty;



// import React, { useState } from 'react';
// import { X } from 'lucide-react';
// import './SubmitProperty.css'; // Import custom styles

// const SubmitProperty = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [formData, setFormData] = useState({
//     propertyType: '',
//     title: '',
//     description: '',
//     address: '',
//     area: '',
//     status: 'available',
//     bedrooms: '',
//     bathrooms: '',
//     balconies: '',
//     furnishingStatus: 'unfurnished',
//     isForSale: false,
//     isForRent: false,
//     rentPrice: '',
//     price: '',
//     floor: '',
//     totalFloors: '',
//     parkingSpaces: '',
//     gardenArea: '',
//     swimmingPool: false,
//     zoningType: '',
//     images: []
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData(prev => ({
//       ...prev,
//       images: [...prev.images, ...files]
//     }));
//   };

//   const removeImage = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index)
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//   };

//   return (
//     <div className="submit-property">
//       <div className="page-indicator">
//         <div className={`indicator ${currentPage === 1 ? 'active' : ''}`}>
//           1
//         </div>
//         <div className={`indicator ${currentPage === 2 ? 'active' : ''}`}>2</div>
//       </div>

//       <form onSubmit={handleSubmit} className="property-form">
//         {currentPage === 1 && (
//           <div className="form-page">
//             <h2 className="form-title">Property Details</h2>

//             <div className="form-section">
//               <div className="form-group">
//                 <label>Property Type</label>
//                 <select name="propertyType" value={formData.propertyType} onChange={handleChange}>
//                   <option value="">Select Type</option>
//                   <option value="apartment">Apartment</option>
//                   <option value="farmhouse">Farmhouse</option>
//                   <option value="land">Land</option>
//                   <option value="office">Office</option>
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>Title</label>
//                 <input 
//                   type="text" 
//                   name="title" 
//                   value={formData.title} 
//                   onChange={handleChange}
//                   required
//                   className="input-field"
//                 />
//               </div>

//               <div className="form-group full-width">
//                 <label>Description</label>
//                 <textarea 
//                   name="description" 
//                   value={formData.description} 
//                   onChange={handleChange}
//                   required
//                   className="input-field"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Address</label>
//                 <input 
//                   type="text" 
//                   name="address" 
//                   value={formData.address} 
//                   onChange={handleChange}
//                   required
//                   className="input-field"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Area (sq ft)</label>
//                 <input 
//                   type="number" 
//                   name="area" 
//                   value={formData.area} 
//                   onChange={handleChange}
//                   required
//                   className="input-field"
//                 />
//               </div>

//               {formData.propertyType !== 'land' && (
//                 <>
//                   <div className="form-group">
//                     <label>Furnishing Status</label>
//                     <select name="furnishingStatus" value={formData.furnishingStatus} onChange={handleChange}>
//                       <option value="unfurnished">Unfurnished</option>
//                       <option value="semi-furnished">Semi-furnished</option>
//                       <option value="fully furnished">Fully Furnished</option>
//                     </select>
//                   </div>

//                   {formData.propertyType !== 'office' && (
//                     <>
//                       <div className="form-group">
//                         <label>Bedrooms</label>
//                         <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="input-field" />
//                       </div>

//                       <div className="form-group">
//                         <label>Bathrooms</label>
//                         <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="input-field" />
//                       </div>

//                       {formData.propertyType === 'apartment' && (
//                         <div className="form-group">
//                           <label>Balconies</label>
//                           <input type="number" name="balconies" value={formData.balconies} onChange={handleChange} className="input-field" />
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </>
//               )}

//               {formData.propertyType === 'office' && (
//                 <>
//                   <div className="form-group">
//                     <label>Floor</label>
//                     <input type="number" name="floor" value={formData.floor} onChange={handleChange} className="input-field" />
//                   </div>

//                   <div className="form-group">
//                     <label>Total Floors</label>
//                     <input type="number" name="totalFloors" value={formData.totalFloors} onChange={handleChange} className="input-field" />
//                   </div>

//                   <div className="form-group">
//                     <label>Parking Spaces</label>
//                     <input type="number" name="parkingSpaces" value={formData.parkingSpaces} onChange={handleChange} className="input-field" />
//                   </div>
//                 </>
//               )}

//               {formData.propertyType === 'farmhouse' && (
//                 <>
//                   <div className="form-group">
//                     <label>Garden Area</label>
//                     <input type="number" name="gardenArea" value={formData.gardenArea} onChange={handleChange} className="input-field" />
//                   </div>

//                   <div className="form-group">
//                     <label>Swimming Pool</label>
//                     <input 
//                       type="checkbox" 
//                       name="swimmingPool" 
//                       checked={formData.swimmingPool} 
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </>
//               )}

//               {formData.propertyType === 'land' && (
//                 <div className="form-group">
//                   <label>Zoning Type</label>
//                   <input type="text" name="zoningType" value={formData.zoningType} onChange={handleChange} className="input-field" />
//                 </div>
//               )}

//               <div className="form-group">
//                 <label>Status</label>
//                 <select name="status" value={formData.status} onChange={handleChange} className="input-field">
//                   <option value="available">Available</option>
//                   <option value="sold">Sold</option>
//                   <option value="rented">Rented</option>
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>For Sale</label>
//                 <input 
//                   type="checkbox" 
//                   name="isForSale" 
//                   checked={formData.isForSale} 
//                   onChange={handleChange}
//                 />
//               </div>

//               {formData.isForSale && (
//                 <div className="form-group">
//                   <label>Sale Price</label>
//                   <input 
//                     type="number" 
//                     name="price" 
//                     value={formData.price} 
//                     onChange={handleChange}
//                     className="input-field"
//                   />
//                 </div>
//               )}

//               <div className="form-group">
//                 <label>For Rent</label>
//                 <input 
//                   type="checkbox" 
//                   name="isForRent" 
//                   checked={formData.isForRent} 
//                   onChange={handleChange}
//                 />
//               </div>

//               {formData.isForRent && (
//                 <div className="form-group">
//                   <label>Rent Price</label>
//                   <input 
//                     type="number" 
//                     name="rentPrice" 
//                     value={formData.rentPrice} 
//                     onChange={handleChange}
//                     className="input-field"
//                   />
//                 </div>
//               )}
//             </div>

//             <div className="button-group">
//               <button 
//                 type="button" 
//                 className="next-btn" 
//                 onClick={() => setCurrentPage(2)}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}

//         {currentPage === 2 && (
//           <div className="form-page">
//             <h2 className="form-title">Property Images</h2>
            
//             <div className="image-upload-section">
//               <div className="upload-container">
//                 <input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="file-input"
//                 />
//                 <div className="upload-box">
//                   <p>Click or drag images here to upload</p>
//                 </div>
//               </div>

//               <div className="image-preview-container">
//                 {formData.images.map((image, index) => (
//                   <div key={index} className="image-preview">
//                     <img src={URL.createObjectURL(image)} alt={`Preview ${index + 1}`} />
//                     <button 
//                       type="button" 
//                       className="remove-image" 
//                       onClick={() => removeImage(index)}
//                     >
//                       <X size={16} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="button-group">
//               <button 
//                 type="button" 
//                 className="prev-btn" 
//                 onClick={() => setCurrentPage(1)}
//               >
//                 Previous
//               </button>
//               <button type="submit" className="submit-btn">
//                 Submit Property
//               </button>
//             </div>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default SubmitProperty;




import React, { useState } from 'react';
import { X } from 'lucide-react';
import './SubmitProperty.css'; // Import custom styles
import axios from 'axios';

const SubmitProperty = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data to send in the request
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
      images: formData.images // Ideally, the images would be sent as form data (Multipart form), but here we will send them as base64 strings or just the file names.
    };

    try {
      // Make the POST request to the backend to submit the property
      const response = await axios.post('http://localhost:5000/api/submitProperty', dataToSubmit, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token if authentication is required
        }
      });
      console.log('Property submitted successfully:', response.data);
      
      // Set success message
      setSuccessMessage('Property Submitted Successfully');
      
      // Redirect to Dashboard after 1 second
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
        <div className={`indicator ${currentPage === 1 ? 'active' : ''}`}>
          1
        </div>
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
          //fontWeight: 'bold',
          fontSize: '25px'
        }}>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="property-form">
        {currentPage === 1 && (
          <div className="form-page">
            <h2 className="form-title">Property Details</h2>

            <div className="form-section">
              <div className="form-group">
                <label>Property Type</label>
                <select name="propertyType" value={formData.propertyType} onChange={handleChange}>
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
                  className="input-field"
                />
              </div>

              {formData.propertyType !== 'land' && (
                <>
                  <div className="form-group">
                    <label>Furnishing Status</label>
                    <select name="furnishingStatus" value={formData.furnishingStatus} onChange={handleChange}>
                      <option value="unfurnished">Unfurnished</option>
                      <option value="semi-furnished">Semi-furnished</option>
                      <option value="fully furnished">Fully Furnished</option>
                    </select>
                  </div>

                  {formData.propertyType !== 'office' && (
                    <>
                      <div className="form-group">
                        <label>Bedrooms</label>
                        <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="input-field" />
                      </div>

                      <div className="form-group">
                        <label>Bathrooms</label>
                        <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="input-field" />
                      </div>

                      {formData.propertyType === 'apartment' && (
                        <div className="form-group">
                          <label>Balconies</label>
                          <input type="number" name="balconies" value={formData.balconies} onChange={handleChange} className="input-field" />
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
                    <input type="number" name="floor" value={formData.floor} onChange={handleChange} className="input-field" />
                  </div>

                  <div className="form-group">
                    <label>Total Floors</label>
                    <input type="number" name="totalFloors" value={formData.totalFloors} onChange={handleChange} className="input-field" />
                  </div>

                  <div className="form-group">
                    <label>Parking Spaces</label>
                    <input type="number" name="parkingSpaces" value={formData.parkingSpaces} onChange={handleChange} className="input-field" />
                  </div>
                </>
              )}

              {formData.propertyType === 'farmhouse' && (
                <>
                  <div className="form-group">
                    <label>Garden Area</label>
                    <input type="number" name="gardenArea" value={formData.gardenArea} onChange={handleChange} className="input-field" />
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
                  <input type="text" name="zoningType" value={formData.zoningType} onChange={handleChange} className="input-field" />
                </div>
              )}

              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="input-field">
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
                    className="input-field"
                  />
                </div>
              )}
            </div>
            <div className="form-navigation">
              <button type="button" className="next-btn" onClick={() => setCurrentPage(2)}>Next</button>
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


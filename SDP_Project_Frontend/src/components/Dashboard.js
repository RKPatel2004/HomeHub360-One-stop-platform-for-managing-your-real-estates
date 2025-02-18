import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageGallery from './ImageGallery';
import './Dashboard.css';

const Dashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/my-properties", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProperties(response.data.properties);
      } catch (err) {
        setError("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return (
    <div className="loading-error">
      <p>Loading properties...</p>
    </div>
  );

  if (error) return (
    <div className="loading-error error">
      <p>{error}</p>
    </div>
  );

  return (
    <div className="container">
      <h2 className="header">My Properties</h2>
      {properties.length > 0 ? (
        <div className="property-grid">
          {properties.map((property) => (
            <div
              key={property._id}
              className="property-card"
            >
              <ImageGallery images={property.images} />
              <div className="property-content">
                <h3 className="property-title">{property.title}</h3>
                <p className="property-description">{property.description}</p>
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
                  <span className={`status-badge ${property.status.toLowerCase()}`}>
                    {property.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-properties">No properties found.</p>
      )}
    </div>
  );
};

export default Dashboard;
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './FeatureDetails.css';
import { useSelector } from 'react-redux';


const FeatureDetails = () => {
  const { featureId } = useParams();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector(state => state.User);
  
  useEffect(() => {
    const token = user.token;
    setIsLoggedIn(!!token);
  }, [user.token]);

  const featureContent = {
    'property-listing': {
      title: 'Property Listing Management',
      description: 'Comprehensive property listing management system',
      icon: '🏠',
      redirectTo: '/Manage_Property',
      details: [
        'Easy property listing creation with multiple images and detailed descriptions',
        'Property status management (available, rented, sold)',
        'High priority as it is the core functionality for property owners to interact with the system',
        'Development of a user-friendly interface for listing.',
        'Integration with Google maps API to display property location on a map.',
        'Advanced pricing management tools',
        'Property analytics and performance metrics',
        'The system must notify the admin when a new property is listed',
        'Custom property attributes and features'
      ]
    },
    'property-search': {
      title: 'Property Search and Filter',
      description: 'Advanced search and filtering system',
      icon: '🔍',
      redirectTo: '/Book_Property',
      details: [
        'Multi-criteria search functionality',
        'Real-time search results with dynamic filtering',
        'Saved search preferences to favourites',
        'Location property search interface',
        'Advanced filtering options (price, location, amenities)',
        'The system must support keyword search based on property names',
        'Enables customers to easily find properties that match their criteria'
      ]
    },
    'user-auth': {
      title: 'User Authentication and Role Management',
      description: 'Secure authentication and role-based access control',
      icon: '🔐',
      redirectTo: '/',
      details: [
        'User friendly authentication system',
        'Role-based access control (Admin, Owner, User)',
        'User profile management',
        'Secure password policies and reset password functionality',
        'User verification processes',
        'Integration of JWT token for implementating authentication and authorization',
        'Admin receives access to a dashboard with all user and property management features',
        'Admin has the ability to suspend or delete user accounts if necessary'
      ]
    },
    'booking-inquiry': {
      title: 'Property Booking and Inquiry Management',
      description: 'Efficient booking and inquiry handling system',
      icon: '📅',
      redirectTo: '/Book_Property',
      details: [
        'User friendly booking management system',
        'Real-time availability of calendar',
        'Inquiry tracking and management',
        'Automated response system',
        'Payment integration for bookings using Stripe',
        'Notification on confirm booking and payment status',
        'Communication with property owners through phone and email',
        'Feedback and review system'
      ]
    },
    'admin': {
      title: 'Admin Management',
      description: 'Comprehensive administrative control panel',
      icon: '⚙️',
      redirectTo: '/Admin_Dashboard',
      details: [
        'User management and oversight',
        'System configuration and settings',
        'Content management system',
        'Analytics and reporting dashboard',
        'Billing and payment management',
        'System logs and monitoring',
        'Security settings management',
        'API access management',
        'Tools to suspend or remove users if necessary'
      ]
    }
  };

  const feature = featureContent[featureId];

  if (!feature) {
    return <div>Feature not found</div>;
  }

  const handleGetStarted = () => {
    if (!isLoggedIn) {
      // If user is not logged in, always redirect to signup
      navigate('/signup');
    } else {
      // If user is logged in, redirect to the specific page based on feature
      navigate(feature.redirectTo);
    }
  };

  return (
    <div className="feature-details-page">
      <nav className="feature-nav">
        <div className="nav-content">
          <Link to="/" className="back-link">
            <span className="back-arrow">←</span>
            <span>Back to Home</span>
          </Link>
          <h1 className="nav-title">HomeHub360</h1>
        </div>
      </nav>
      
      <div className="feature-hero">
        <div className="feature-hero-content">
          <div className="feature-icon">{feature.icon}</div>
          <h1>{feature.title}</h1>
          <p className="feature-description">{feature.description}</p>
        </div>
      </div>

      <div className="feature-details-content">
        <h2 className="section-title">Key Features & Capabilities</h2>
        <div className="feature-details-list">
          {feature.details.map((detail, index) => (
            <div key={index} className="detail-item">
              <div className="detail-number">{index + 1}</div>
              <div className="detail-content">
                <p>{detail}</p>
                <div className="detail-hover-effect"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="feature-cta">
        <h2>Ready to Get Started?</h2>
        <p>Experience the power of our {feature.title} system</p>
        <div className="cta-buttons">
          <button onClick={handleGetStarted} className="cta-button">Get Started</button>
          <Link to="/contact" className="secondary-button">Contact Us</Link>
        </div>
      </div>
    </div>
  );
};

export default FeatureDetails;
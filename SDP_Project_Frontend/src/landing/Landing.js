import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import './Landing.css';
import './ContactUs.css';

const Landing = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFeatureMenu, setShowFeatureMenu] = useState(false);
  const [showGetStartedMenu, setShowGetStartedMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userProfile, setUserProfile] = useState({
    profileImage: localStorage.getItem('profileImage') || '/images/logo192.png',
    username: localStorage.getItem('username') || ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    // Update user profile from localStorage
    setUserProfile({
      profileImage: localStorage.getItem('profileImage') || '/images/logo192.png',
      username: localStorage.getItem('username') || ''
    });
  }, []);

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/deleteUser', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        // After successful deletion from database, clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('profileImage');
        localStorage.removeItem('role');
        
        // Update state
        setIsLoggedIn(false);
        setUserProfile({
          profileImage: '/images/logo192.png',
          username: ''
        });
        setShowDeleteModal(false);
        
        // Redirect to home page
        navigate('/', { replace: true });
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to delete account');
      }
    } catch (error) {
      alert('An error occurred while deleting the account');
      console.error('Delete account error:', error);
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    // Remove all authentication-related items from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('profileImage');
    localStorage.removeItem('role');
    
    // Update state
    setIsLoggedIn(false);
    setUserProfile({
      profileImage: '/images/logo192.png',
      username: ''
    });
    setShowLogoutModal(false);
    
    // Redirect to home page
    navigate('/', { replace: true });
  };

  const handleGetStartedClick = (role) => {
    if (isLoggedIn) {
      if (role === 'owner') {
        navigate('/Manage_Property');
      } else if (role === 'customer') {
        navigate('/Book_Property');
      }
    } else {
      navigate(`/signup?role=${role}`);
    }
  };

  const features = [
    {
      id: 'property-listing',
      title: 'Property Listing Management',
      description: 'Complete property listing and management solution'
    },
    {
      id: 'property-search',
      title: 'Property Search and Filter',
      description: 'Advanced search and filtering capabilities'
    },
    {
      id: 'user-auth',
      title: 'User Authentication and Role Management',
      description: 'Secure user authentication and role-based access'
    },
    {
      id: 'booking-inquiry',
      title: 'Property Booking and Inquiry Management',
      description: 'Streamlined booking and inquiry process'
    },
    {
      id: 'admin',
      title: 'Admin Management',
      description: 'Comprehensive admin control panel'
    }
  ];

  return (
    <div className="landing">
      {/* Header/Navbar */}
      <nav className="navbar">
        <div className="logo">
          <h1>HomeHub360</h1>
        </div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <div 
            className="features-dropdown"
            onMouseEnter={() => setShowFeatureMenu(true)}
            onMouseLeave={() => setShowFeatureMenu(false)}
          >
            <a href="#features">Features</a>
            {showFeatureMenu && (
              <div className="dropdown-menu">
                {features.map(feature => (
                  <Link 
                    key={feature.id}
                    to={`/features/${feature.id}`}
                    className="dropdown-item"
                  >
                    {feature.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <a href="#how-it-works">How It Works</a>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="auth-buttons">
          {isLoggedIn ? (
            <div className="profile-section">
              <button onClick={handleLogoutClick} className="logout-btn">Logout</button>
              <div 
                className="profile-dropdown"
                onMouseEnter={() => setShowProfileMenu(true)}
                onMouseLeave={() => setShowProfileMenu(false)}
              >
                <img 
                  src={`http://localhost:5000/${userProfile.profileImage}`} 
                  alt="Profile" 
                  className="profile-image"
                />
              
                {showProfileMenu && (
                  <div className="profile-dropdown-menu">
                    <Link to="/my_profile" className="dropdown-item">
                      My Profile
                  </Link>
                    <div onClick={() => setShowDeleteModal(true)} className="dropdown-item">
                      Delete Account
                    </div>
                  </div>
                )}                
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Simplifying Property Management for Everyone</h1>
          <p>Your all-in-one solution for efficient real estate management</p>
          <div className="hero-buttons">
            <div 
              className="get-started-dropdown"
              onMouseEnter={() => setShowGetStartedMenu(true)}
              onMouseLeave={() => setShowGetStartedMenu(false)}
            >
              <button className="cta-button">Get Started</button>
              {showGetStartedMenu && (
                <div className="get-started-menu">
                  <button 
                    className="dropdown-item"
                    onClick={() => handleGetStartedClick('owner')}
                  >
                    Manage Property
                  </button>
                  <button 
                    className="dropdown-item"
                    onClick={() => handleGetStartedClick('customer')}
                  >
                    Book Property
                  </button>
                </div>
              )}
            </div>
            <a href="#features" className="secondary-button">Learn More</a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <h2>Why Choose HomeHub360</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <i className="fas fa-home"></i>
            <h3>Property Owners</h3>
            <p>Easily manage your properties, track maintenance, and handle tenant communications all in one place.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-user"></i>
            <h3>Property Seekers</h3>
            <p>Find your perfect property with advanced search filters and virtual tours.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-cog"></i>
            <h3>Administrators</h3>
            <p>Comprehensive tools for overseeing operations, managing users, and generating reports.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works" id="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Account</h3>
            <p>Sign up as a property owner, seeker, or administrator.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Complete Profile</h3>
            <p>Add your details and preferences to get personalized experiences.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Start Managing</h3>
            <p>List properties, search homes, or oversee operations based on your role.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <h2>Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <ul>
              <li>
                <span className="label">Email:</span>
                <a href="mailto:admin@gmail.com">admin@gmail.com</a>
              </li>
              <li>
                <span className="label">Phone:</span>
                <a href="tel:+911234567890">(+91) 1234567890</a>
              </li>
            </ul>
            <p>Address: Dharmsinh Desai University, College Road, Nadiad, 387001.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>HomeHub360</h3>
            <p>Simplifying property management for everyone.</p>
          </div>
          <div className="social-icons">
            <h3>Quick Links</h3>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-github"></i>
            </a>
            <a href="mailto:rudra0405@gmail.com" className="social-icon">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
          <div className="footer-section">
            <h3>Legal</h3>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 HomeHub360. All rights reserved.</p>
        </div>
      </footer>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
      />

      {/* Add this near the bottom of the component, right before the closing div of "landing" class */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone."
      />
    </div>
  );
};

export default Landing;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerDashboard from './CustomerDashboard';
import SearchProperty from './SearchProperty';
import CustomerAnalytics from './CustomerAnalytics'; 
import './BookProperty.css';
import { useSelector } from 'react-redux';

const BookProperty = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [username, setUsername] = useState('');
  const user = useSelector(state => state.User);
  
  useEffect(() => {
    const token = user.token;
    const storedUsername = user.username;
    
    if (!token) {
      navigate('/login');
    } else if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [navigate, user.token, user.username]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <CustomerDashboard />;
      case 'search':
        return <SearchProperty />;
      case 'analytics':
        return <CustomerAnalytics />;
      default:
        return <CustomerDashboard />;
    }
  };

  return (
    <div className="book-property">
      <nav className="book-property-nav">
        <div className="nav-logo">
          <h1>HomeHub360</h1>
        </div>
        <div className="nav-links">
          <button 
            className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Booked Properties
          </button>
          <button 
            className={`nav-link ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => setActiveTab('search')}
          >
            Search Property
          </button>
          <button 
            className={`nav-link ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            Dashboard
          </button>
        </div>
        <div className="user-greeting">
          <span>Hi, {username}!</span>
        </div>
      </nav>

      <div className="book-property-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default BookProperty;
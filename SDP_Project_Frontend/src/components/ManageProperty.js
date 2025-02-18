import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import SubmitProperty from './SubmitProperty';
import './ManageProperty.css';

const ManageProperty = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if user is authenticated and get username
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    
    if (!token) {
      navigate('/login');
    } else if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [navigate]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'submit':
        return <SubmitProperty />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="manage-property">
      <nav className="manage-property-nav">
        <div className="nav-logo">
          <h1>HomeHub360</h1>
        </div>
        <div className="nav-links">
          <button 
            className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`nav-link ${activeTab === 'submit' ? 'active' : ''}`}
            onClick={() => setActiveTab('submit')}
          >
            Submit New Property
          </button>
        </div>
        <div className="user-greeting">
          <span>Hi, {username}!</span>
        </div>
      </nav>

      <div className="manage-property-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default ManageProperty;
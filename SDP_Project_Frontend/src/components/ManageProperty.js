
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import SubmitProperty from './SubmitProperty';
import NotificationList from './NotificationList';
import OwnerAnalytics from './OwnerAnalytics';
import ViewGraph from './ViewGraph'; 
import './ManageProperty.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ManageProperty = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [username, setUsername] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const user = useSelector(state => state.User);

    const fetchUnreadCount = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            // Updated endpoint to match the one defined in your routes
            const response = await axios.get(/*'http://localhost:5000/api/notifications/unread-count'*/'https://homehub360.onrender.com/api/notifications/unread-count', config);
            // Updated to match the structure from your controller
            setUnreadCount(response.data.unreadCount);
        } catch (error) {
            console.error('Error fetching unread count:', error);
        }
    };

    useEffect(() => {
        const token = user.token;
        const storedUsername = user.username;
        if (!token) {
            navigate('/login');
        } else if (storedUsername) {
            setUsername(storedUsername);
        }

        if (token) {
            fetchUnreadCount();
            const interval = setInterval(fetchUnreadCount, 60000);
            return () => clearInterval(interval);
        }
    }, [navigate, user.token, user.username]);

    // Refresh the unread count every time showNotifications changes
    useEffect(() => {
        if (!showNotifications && user.token) {
            fetchUnreadCount();
        }
    }, [showNotifications, user.token]);

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard />;
            case 'submit':
                return <SubmitProperty />;
            case 'analytics':
                return <OwnerAnalytics />;
            case 'customerActivity':
                return <ViewGraph />;
            default:
                return <Dashboard />;
        }
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <div className="manage-property">
            <nav className="manage-property-nav">
                <div className="nav-logo">
                    <h1>HomeHub360</h1>
                </div>
                <div className="nav-links">
                    <button
                        className={`nav-link ${activeTab === 'dashboard' && !showNotifications ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab('dashboard');
                            setShowNotifications(false);
                        }}
                    >
                        {/* Dashboard */} My Properties
                    </button>
                    <button
                        className={`nav-link ${activeTab === 'submit' && !showNotifications ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab('submit');
                            setShowNotifications(false);
                        }}
                    >
                        Submit New Property
                    </button>
                    <button
                        className={`nav-link ${activeTab === 'analytics' && !showNotifications ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab('analytics');
                            setShowNotifications(false);
                        }}
                    >
                        {/* My Analysis */} Dashboard
                    </button>
                    <button
                        className={`nav-link ${activeTab === 'customerActivity' && !showNotifications ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab('customerActivity');
                            setShowNotifications(false);
                        }}
                    >
                        Customer Activity
                    </button>
                </div>
                <div className="user-greeting">
                    Hi, {username}!
                    <button 
                        className="notification-bell" 
                        onClick={toggleNotifications}
                        style={showNotifications ? {backgroundColor: '#f0f0f0'} : {}}
                    >
                        <i className="fas fa-bell"></i>
                        {unreadCount > 0 && (
                            <span className="notification-badge">{unreadCount}</span>
                        )}
                    </button>
                </div>
            </nav>
            <div className="manage-property-content">
                {showNotifications ? <NotificationList /> : renderContent()}
            </div>
        </div>
    );
};

export default ManageProperty;
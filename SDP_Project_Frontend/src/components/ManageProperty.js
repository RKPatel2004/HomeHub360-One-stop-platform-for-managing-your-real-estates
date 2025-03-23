import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import SubmitProperty from './SubmitProperty';
import NotificationList from './NotificationList';
import OwnerAnalytics from './OwnerAnalytics';
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

    useEffect(() => {
        const token = user.token;
        const storedUsername = user.username;
        if (!token) {
            navigate('/login');
        } else if (storedUsername) {
            setUsername(storedUsername);
        }

        const fetchUnreadCount = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get('http://localhost:5000/api/notifications/unread/count', config);
                setUnreadCount(response.data.count);
            } catch (error) {
                console.error('Error fetching unread count:', error);
            }
        };

        if (token) {
            fetchUnreadCount();
            const interval = setInterval(fetchUnreadCount, 60000);
            return () => clearInterval(interval);
        }
    }, [navigate, user.token, user.username]);

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard />;
            case 'submit':
                return <SubmitProperty />;
            case 'analytics':
                return <OwnerAnalytics />;
            default:
                return <Dashboard />;
        }
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
        if (!showNotifications) {
            // Reset unread count when opening notifications
            setUnreadCount(0);
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
                        onClick={() => {
                            setActiveTab('dashboard');
                            setShowNotifications(false);
                        }}
                    >
                        {/* Dashboard */} My Properties
                    </button>
                    <button
                        className={`nav-link ${activeTab === 'submit' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab('submit');
                            setShowNotifications(false);
                        }}
                    >
                        Submit New Property
                    </button>
                    <button
                        className={`nav-link ${activeTab === 'analytics' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab('analytics');
                            setShowNotifications(false);
                        }}
                    >
                        {/* My Analysis */} Dashboard
                    </button>
                </div>
                <div className="user-greeting">
                    Hi, {username}!
                    <button className="notification-bell" onClick={toggleNotifications}>
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
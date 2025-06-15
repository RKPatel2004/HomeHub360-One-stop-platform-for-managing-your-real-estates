import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NotificationList.css';
import { useSelector } from 'react-redux';

const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [properties, setProperties] = useState({});
    const [expandedNotifications, setExpandedNotifications] = useState({});
    const user = useSelector(state => state.User);
    
    const token = user.token;

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get(/*'http://localhost:5000/api/notifications/user'*/'https://homehub360.onrender.com/api/notifications/user', config);
                setNotifications(response.data.notifications);

                // Extract all property IDs from notifications
                const propertyIds = response.data.notifications
                    .filter(n => n.relatedId || (n.details && n.details.propertyId))
                    .map(n => n.relatedId || (n.details && n.details.propertyId));

                // Get unique property IDs
                const uniquePropertyIds = [...new Set(propertyIds)];

                // Fetch property details for each unique property ID
                const propertyData = {};
                
                // Use Promise.all to fetch all properties in parallel
                await Promise.all(uniquePropertyIds.map(async (propertyId) => {
                    if (propertyId) {
                        try {
                            // Use the new unified property endpoint
                            const propertyResponse = await axios.get(/*`http://localhost:5000/api/property/${propertyId}`*/`https://homehub360.onrender.com/api/property/${propertyId}`, config);
                            const collectionName = await axios.get(/*`http://localhost:5000/api/property/type/${propertyId}`*/`https://homehub360.onrender.com/api/property/type/${propertyId}`, config);
                            console.log(collectionName);
                            propertyData[propertyId] = {
                                name: propertyResponse.data.name || propertyResponse.data.title || 'Property',
                                propertyType: collectionName.data.collection.propertyType || 'N/A'                          
                            };
                        } catch (err) {
                            console.error(`Error fetching property ${propertyId}:`, err);
                        }
                    }
                }));               
                setProperties(propertyData);
            } catch (error) {
                console.error('Error fetching notifications:', error);
                setError(error.message || 'Failed to fetch notifications');
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchNotifications();
        } else {
            setError('Authentication token not found. Please log in.');
            setLoading(false);
        }
    }, [token]);

    const markAsRead = async (notificationId) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.put(/*`http://localhost:5000/api/notifications/read/${notificationId}`*/`https://homehub360.onrender.com/api/notifications/read/${notificationId}`, {}, config);
            setNotifications(notifications.map(n =>
                n._id === notificationId ? { ...n, isRead: true } : n
            ));
        } catch (error) {
            console.error('Error marking as read:', error);
            setError(error.message || 'Failed to mark as read');
        }
    };

    const deleteNotification = async (notificationId) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.delete(/*`http://localhost:5000/api/notifications/${notificationId}`*/`https://homehub360.onrender.com/api/notifications/${notificationId}`, config);
            setNotifications(notifications.filter(n => n._id !== notificationId));
        } catch (error) {
            console.error('Error deleting notification:', error);
            setError(error.message || 'Failed to delete notification');
        }
    };

    // Function to format date
    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleString();
        } catch (e) {
            return dateString;
        }
    };

    // Function to get property name and type
    const getPropertyInfo = (notification) => {
        const propertyId = notification.relatedId || (notification.details && notification.details.propertyId);
        
        // Check if we have property data
        if (propertyId && properties[propertyId]) {
            return {
                name: properties[propertyId].name,
                type: properties[propertyId].propertyType
            };
        }
        
        // Fallback to notification details if available
        if (notification.details) {
            return {
                name: notification.details.propertyName || 'Property',
                type: notification.details.propertyType || 'N/A'
            };
        }
        
        return { name: 'Property', type: 'N/A' };
    };

    // Toggle details visibility
    const toggleDetails = (notificationId) => {
        setExpandedNotifications(prev => ({
            ...prev,
            [notificationId]: !prev[notificationId]
        }));
    };

    if (loading) {
        return <div className="notification-list">Loading notifications...</div>;
    }

    if (error) {
        return <div className="notification-list">Error: {error}</div>;
    }

    return (
        <div className="notification-list">
            <h2>Notifications</h2>
            {notifications.length === 0 ? (
                <p>No notifications found.</p>
            ) : (
                <ul>
                    {notifications.map((notification, index) => {
                        const propertyInfo = getPropertyInfo(notification);
                        return (
                            <React.Fragment key={notification._id}>
                                <li className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}>
                                    <div className="notification-content">
                                        <div className="notification-message">{notification.message}</div>
                                        
                                        <div className="notification-info">
                                            <div className="notification-type">
                                                Type: {notification.type}
                                            </div>
                                            
                                            <div className="notification-property">
                                                Property: {propertyInfo.name}
                                            </div>
                                            
                                            <div className="notification-property-type">
                                                Property Type: {propertyInfo.type}
                                            </div>
                                            
                                            {notification.details && expandedNotifications[notification._id] && (
                                                <div className="notification-details-section">
                                                    <h4>Details:</h4>
                                                    {notification.details.paymentType && (
                                                        <div className="detail-item">
                                                            <span className="detail-label">Payment Type:</span>
                                                            <span className="detail-value">{notification.details.paymentType}</span>
                                                        </div>
                                                    )}
                                                    
                                                    {notification.details.amount && (
                                                        <div className="detail-item">
                                                            <span className="detail-label">Amount:</span>
                                                            <span className="detail-value">{notification.details.amount}</span>
                                                        </div>
                                                    )}
                                                    
                                                    {notification.details.currency && (
                                                        <div className="detail-item">
                                                            <span className="detail-label">Currency:</span>
                                                            <span className="detail-value">{notification.details.currency}</span>
                                                        </div>
                                                    )}
                                                    
                                                    {notification.details.customerName && (
                                                        <div className="detail-item">
                                                            <span className="detail-label">Customer Name:</span>
                                                            <span className="detail-value">{notification.details.customerName}</span>
                                                        </div>
                                                    )}
                                                    
                                                    {notification.details.timestamp && (
                                                        <div className="detail-item">
                                                            <span className="detail-label">Timestamp:</span>
                                                            <span className="detail-value">{formatDate(notification.details.timestamp)}</span>
                                                        </div>
                                                    )}
                                                    
                                                    {/* Display any other fields in details object that might be present */}
                                                    {Object.entries(notification.details)
                                                        .filter(([key]) => !['paymentId', 'propertyId', 'customerId', 'paymentType', 'amount', 'currency', 'customerName', 'timestamp'].includes(key))
                                                        .map(([key, value]) => (
                                                            <div className="detail-item" key={key}>
                                                                <span className="detail-label">{key}:</span>
                                                                <span className="detail-value">
                                                                    {typeof value === 'object' ? JSON.stringify(value) : value.toString()}
                                                                </span>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            )}
                                            
                                            <div className="notification-date">
                                                Created: {formatDate(notification.createdAt)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="notification-actions">
                                        {!notification.isRead && (
                                            <button className="mark-read-button" onClick={() => markAsRead(notification._id)}>
                                                Mark as Read
                                            </button>
                                        )}
                                        {notification.details && (
                                            <button className="view-more-button" onClick={() => toggleDetails(notification._id)}>
                                                {expandedNotifications[notification._id] ? 'Hide Details' : 'View More'}
                                            </button>
                                        )}
                                        <button className="delete-button" onClick={() => deleteNotification(notification._id)}>
                                            Delete
                                        </button>
                                    </div>
                                </li>
                                {index < notifications.length - 1 && <div className="notification-divider"></div>}
                            </React.Fragment>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default NotificationList;
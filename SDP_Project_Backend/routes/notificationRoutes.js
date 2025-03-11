const express = require('express');
const router = express.Router();
const { 
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
  deleteNotification,
  getUnreadCount
} = require('../controllers/notificationController');
const verifyToken = require('../middleware/auth');

// Create a new notification (manually - mostly for testing)
router.post('/create', verifyToken, createNotification);

// Get all notifications for a user
router.get('/user', verifyToken, getUserNotifications);

// Get unread notification count
router.get('/unread-count', verifyToken, getUnreadCount);

// Mark notification as read
router.put('/read/:id', verifyToken, markNotificationAsRead);

// Delete a notification
router.delete('/:id', verifyToken, deleteNotification);

module.exports = router;
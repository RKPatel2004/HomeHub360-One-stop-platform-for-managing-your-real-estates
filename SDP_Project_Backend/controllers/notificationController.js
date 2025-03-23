const Notification = require('../models/notification');
const Payment = require('../models/paymentModel');
const User = require('../models/users');

// Create a notification
exports.createNotification = async (req, res) => {
  try {
    const { userId, message, type, relatedId, details } = req.body;
    
    if (!userId || !message) {
      return res.status(400).json({ message: 'User ID and message are required' });
    }
    
    const notification = new Notification({
      userId,
      message,
      type: type || 'system',
      relatedId,
      details
    });
    
    await notification.save();
    
    res.status(201).json({
      success: true,
      notification
    });
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create notification',
      details: error.message
    });
  }
};

// Get all notifications for a user
exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 }) // Sort by latest first
      .limit(50); // Limit to 50 notifications
    
    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications
    });
  } catch (error) {
    console.error('Error getting user notifications:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve notifications',
      details: error.message
    });
  }
};

// Get unread notification count
exports.getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const count = await Notification.countDocuments({ 
      userId, 
      isRead: false 
    });
    
    res.status(200).json({
      success: true,
      unreadCount: count
    });
  } catch (error) {
    console.error('Error getting unread notification count:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get unread count',
      details: error.message
    });
  }
};

// Mark notification as read
exports.markNotificationAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const userId = req.user.id;
    
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, userId },
      { isRead: true },
      { new: true }
    );
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found or not owned by user' });
    }
    
    res.status(200).json({
      success: true,
      notification
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update notification',
      details: error.message
    });
  }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const userId = req.user.id;
    
    const notification = await Notification.findOneAndDelete({ 
      _id: notificationId,
      userId
    });
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found or not owned by user' });
    }
    
    res.status(200).json({
      success: true,
      message: 'Notification deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete notification',
      details: error.message
    });
  }
};

exports.createPaymentNotification = async (payment) => {
  try {
    if (!payment.userId || !payment.ownerId) {
      console.error('Missing user or owner ID for notification');
      return null;
    }
    
    const user = await User.findById(payment.userId);
    if (!user) {
      console.error(`User not found with ID: ${payment.userId}`);
      return null;
    }
    
    let propertyName = 'Property';
    let propertyType = 'property';
    let propertyDetailsPath = `/property/${payment.propertyId}`;
    
    try {
      const Apartment = require('../models/apartment');
      const Farmhouse = require('../models/farmhouse');
      const Land = require('../models/land');
      const Office = require('../models/office');
      
      const apartment = await Apartment.findById(payment.propertyId);
      if (apartment) {
        propertyName = apartment.name || apartment.title || 'Apartment';
        propertyType = 'apartment';
      } else {
        const farmhouse = await Farmhouse.findById(payment.propertyId);
        if (farmhouse) {
          propertyName = farmhouse.name || farmhouse.title || 'Farmhouse';
          propertyType = 'farmhouse';
        } else {
          const land = await Land.findById(payment.propertyId);
          if (land) {
            propertyName = land.name || land.title || 'Land';
            propertyType = 'land';
          } else {
            const office = await Office.findById(payment.propertyId);
            if (office) {
              propertyName = office.name || office.title || 'Office';
              propertyType = 'office';
            }
          }
        }
      }
    } catch (err) {
      console.error('Error fetching property details:', err);
    }
    
    let paymentTypeText = {
      'BOOKING': 'booking',
      'RENT': 'rent',
      'MAINTENANCE': 'maintenance fee',
      'DEPOSIT': 'deposit'
    }[payment.paymentType] || payment.paymentType.toLowerCase();
    
    const ownerNotification = new Notification({
      userId: payment.ownerId, 
      message: `${user.username} has made a ${paymentTypeText} payment of ${payment.amount} ${payment.currency} for your property.`,
      type: 'payment',
      relatedId: payment.propertyId,
      details: {
        paymentId: payment._id,
        paymentType: payment.paymentType,
        amount: payment.amount,
        currency: payment.currency,
        customerName: user.username,
        customerId: payment.userId,
        propertyId: payment.propertyId,
        propertyName: propertyName,
        propertyType: propertyType,
        timestamp: new Date()
      }
    });
    
    // Create notification for the customer
    const customerNotification = new Notification({
      userId: payment.userId, // Send to the customer
      message: `Your ${paymentTypeText} payment of ${payment.amount} ${payment.currency} was successful.`,
      type: 'payment',
      relatedId: payment.propertyId,
      details: {
        paymentId: payment._id,
        paymentType: payment.paymentType,
        amount: payment.amount,
        currency: payment.currency,
        ownerId: payment.ownerId,
        propertyId: payment.propertyId,
        propertyName: propertyName,
        propertyType: propertyType,
        timestamp: new Date()
      }
    });
    
    // Save both notifications
    await Promise.all([
      ownerNotification.save(),
      customerNotification.save()
    ]);
    
    console.log(`Created payment notifications for owner ${payment.ownerId} and customer ${payment.userId}`);
    return { ownerNotification, customerNotification };
  } catch (error) {
    console.error('Error creating payment notification:', error);
    return null;
  }
};
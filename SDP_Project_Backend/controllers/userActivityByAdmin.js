const User = require('../models/users');
const mongoose = require('mongoose');

exports.getMonthlyUniqueUsers = async (req, res) => {
  try {
    // Aggregate to get unique users per month
    const monthlyUsers = await User.aggregate([
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' }
          },
          uniqueUsers: { $addToSet: '$_id' }
        }
      },
      {
        $project: {
          _id: 0,
          month: '$_id.month',
          year: '$_id.year',
          uniqueUserCount: { $size: '$uniqueUsers' }
        }
      },
      {
        $sort: { year: 1, month: 1 }
      }
    ]);

    // Map month numbers to month names
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Prepare the final data with month names and ensure all months are represented
    const currentYear = new Date().getFullYear();
    const completeMonthlyData = monthNames.map((monthName, index) => {
      const monthData = monthlyUsers.find(item => item.month === index + 1 && item.year === currentYear);
      return {
        month: monthName,
        uniqueUserCount: monthData ? monthData.uniqueUserCount : 0
      };
    });

    res.status(200).json({
      success: true,
      data: completeMonthlyData
    });
  } catch (error) {
    console.error('Error fetching monthly unique users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve monthly unique users',
      error: error.message
    });
  }
};
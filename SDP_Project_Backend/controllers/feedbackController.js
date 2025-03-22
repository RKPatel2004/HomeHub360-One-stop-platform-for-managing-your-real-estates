const Feedback = require('../models/feedback');

// Submit feedback for a property
const submitFeedback = async (req, res) => {
  try {
    const { propertyId, feedbackText, rating } = req.body;
    const userId = req.user.id; // Extract user ID from token

    if (!propertyId || !feedbackText || !rating) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const feedback = new Feedback({
      propertyId,
      userId,
      feedbackText,
      rating
    });

    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully.", feedback });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// Get feedback for a specific property
const getFeedbackByProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const feedbacks = await Feedback.find({ propertyId }).populate('userId', 'username');
    
    if (!feedbacks.length) {
      return res.status(404).json({ message: "No feedback found for this property." });
    }

    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

module.exports = { submitFeedback, getFeedbackByProperty };

const mongoose = require('mongoose');
const Feedback = require('../models/feedbackModel');

// Add Feedback
exports.createFeedback = async (req, res) => {
  const { internId, feedback, managerId, mentorId } = req.body;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(internId) ||
      (managerId && !mongoose.Types.ObjectId.isValid(managerId)) ||
      (mentorId && !mongoose.Types.ObjectId.isValid(mentorId))) {
    return res.status(400).json({ success: false, message: 'Invalid ObjectId format' });
  }

  try {
    const newFeedback = new Feedback({ internId, feedback, managerId, mentorId });
    await newFeedback.save();
    res.status(201).json({ success: true, message: 'Feedback added successfully', feedbackId: newFeedback._id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Retrieve Feedback
exports.getFeedbackByInternId = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ internId: req.params.internId });
    res.status(200).json({ success: true, feedbacks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Feedback
exports.updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feedback) return res.status(404).json({ success: false, message: 'Feedback not found' });
    res.status(200).json({ success: true, message: 'Feedback updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) return res.status(404).json({ success: false, message: 'Feedback not found' });
    res.status(200).json({ success: true, message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

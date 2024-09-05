const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  internId: { type: mongoose.Schema.Types.ObjectId, ref: 'Intern', required: true },
  feedback: { type: String, required: true },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);

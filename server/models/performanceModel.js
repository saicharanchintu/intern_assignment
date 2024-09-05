const mongoose = require('mongoose');

const PerformanceSchema = new mongoose.Schema({
    internId: { type: mongoose.Schema.Types.ObjectId, ref: 'Intern', required: true },
    reviewDate: { type: Date, default: Date.now },
    metrics: { type: String, required: true },
});

module.exports = mongoose.model('Performance', PerformanceSchema);
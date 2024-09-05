const mongoose = require('mongoose');
const Intern = require('./internModel');

const TaskSchema = new mongoose.Schema({
    internId: { type: mongoose.Schema.Types.ObjectId, ref: 'Intern', required:true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
});

module.exports = mongoose.model('Task', TaskSchema);

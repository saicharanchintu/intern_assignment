const mongoose = require('mongoose');

const internSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    // performance: [
    //     {
    //         reviewDate: { type: Date, default: Date.now },
    //         metrics: { type: String, required: true },
    //     }
    // ],
    // tasks: [
    //     {
    //         description: { type: String, required: true },
    //         dueDate: { type: Date, required: true },
    //         priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    //         status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' }
    //     }
    // ],
    // feedback: [
    //     {
    //         feedbackDate: { type: Date, default: Date.now },
    //         content: { type: String, required: true },
    //     }
    // ]
}, { timestamps: true });

module.exports = mongoose.model('Intern', internSchema);

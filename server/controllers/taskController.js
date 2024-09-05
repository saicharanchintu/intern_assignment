const mongoose=require('mongoose');
const Task = require('../models/taskModel'); // Import your Task model

exports.createTask = async (req, res) => {
        try {
            const newTask = new Task(req.body);
            await newTask.save();
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
};

exports.getTasksByInternId = async (req, res) => {
    try {
        const tasks = await Task.find({ internId: req.params.internId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        console.log('Attempting to update task with ID:', taskId);

        // Convert ID to ObjectId
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({ error: 'Invalid task ID format' });
        }

        const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true, runValidators: true });

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const result = await Task.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ error: 'Task not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

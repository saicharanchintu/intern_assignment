const express = require('express');
const router = express.Router();
const Performance = require('../models/performanceModel');

// Add Performance Record
router.post('/', async (req, res) => {
    try {
        const performance = new Performance(req.body);
        await performance.save();
        res.status(201).json(performance);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Retrieve Performance Records for a Specific Intern
router.get('/:internId', async (req, res) => {
    try {
        const records = await Performance.find({ internId: req.params.internId });
        res.status(200).json(records);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update Performance Record
router.put('/:id', async (req, res) => {
    try {
        const performance = await Performance.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(performance);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete Performance Record
router.delete('/:id', async (req, res) => {
    try {
        await Performance.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Performance record deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;

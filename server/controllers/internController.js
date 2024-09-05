const Intern = require('../models/internModel');

// Create Intern
exports.createIntern = async (req, res) => {
    try {
        const newIntern = new Intern(req.body);
        await newIntern.save();
        res.status(201).json(newIntern);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Interns or By ID
exports.getInterns = async (req, res) => {
    try {
        const interns = req.params.id ? 
            await Intern.findById(req.params.id) : 
            await Intern.find();
        res.status(200).json(interns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Intern
exports.updateIntern = async (req, res) => {
    try {
        const updatedIntern = await Intern.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedIntern);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Intern
exports.deleteIntern = async (req, res) => {
    try {
        await Intern.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Intern deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const Society = require('../models/Society');

// Create a new society
exports.createSociety = async (req, res) => {
  try {
    const society = new Society(req.body);
    await society.save();
    res.status(201).json(society);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all societies
exports.getSocieties = async (req, res) => {
  try {
    const societies = await Society.find();
    res.json(societies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a society by ID
exports.getSocietyById = async (req, res) => {
  try {
    const society = await Society.findById(req.params.id);
    if (!society) return res.status(404).json({ message: "Society not found" });
    res.json(society);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a society by ID
exports.updateSociety = async (req, res) => {
  try {
    const society = await Society.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!society) return res.status(404).json({ message: "Society not found" });
    res.json(society);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a society by ID
exports.deleteSociety = async (req, res) => {
  try {
    const society = await Society.findByIdAndDelete(req.params.id);
    if (!society) return res.status(404).json({ message: "Society not found" });
    res.json({ message: "Society deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

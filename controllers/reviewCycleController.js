const ReviewCycle = require('../models/ReviewCycle');

const createCycle = async (req, res) => {
  try {
    const cycle = new ReviewCycle(req.body);
    await cycle.save();
    res.status(201).json(cycle); 
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const listCycles = async (req, res) => {
  try {
    const cycles = await ReviewCycle.find(); 
    res.json(cycles); // les renvoie en réponse JSON.
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCycleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const cycle = await ReviewCycle.findByIdAndUpdate(id, { status: req.body.status }, { new: true });//Modifie le champ status du cycle avec cet ID.
    res.json(cycle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createCycle, listCycles, updateCycleStatus };

// controllers/farmerController.js
import Farmer from '../models/Farmer.js';

export const getFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find();
    res.status(200).json(farmers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createFarmer = async (req, res) => {
  try {
    const farmer = new Farmer(req.body);
    await farmer.save();
    res.status(201).json(farmer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

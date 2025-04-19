// models/Farmer.js
import mongoose from 'mongoose';

const farmerSchema = new mongoose.Schema({
  name: String,
  village: String,
  phone: String,
  cropType: String,
  landSize: Number,
}, { timestamps: true });

export default mongoose.model('Farmer', farmerSchema);


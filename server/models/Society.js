const mongoose = require('mongoose');

const SocietySchema = new mongoose.Schema({
  socName: { type: String, required: true },
  description: { type: String },
  socialLinks: { type: [String] },
  socEmail: { type: String, required: true }
});

module.exports = mongoose.model('Society', SocietySchema);

// models/Event.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    poster: { type: String, required: true }, // URL to the image
    groupLink: { type: String }, // WhatsApp/Discord group link
    tags: [{ type: String }],
    description: { type: String, required: true },
    interested: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Reference to User IDs
    organiser: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);

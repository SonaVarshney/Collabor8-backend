const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    collegeEmail: {
      type: String,
      required: true,
      unique: true,
    },
    enrollmentNumber: {
      type: String,
      required: true,
      unique: true,
    },
    branch: {
      type: String,
      enum: ["CSE", "IT", "ECE", "CSE-AI", "MAE", "AI-ML", "ECE-AI"], // Customize with specific branches
      required: true,
    },
    year: {
      type: Date,
      required: true,
    },
    interestedTags: {
      type: [String],
      default: [],
    },
    subscribedSocieties: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Society",
      default: [],
    },
    rsvpdEvents: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Event",
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

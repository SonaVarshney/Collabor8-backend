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
    password: {
      type: String, 
      required: true
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

// Hash the password before saving the user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", UserSchema);

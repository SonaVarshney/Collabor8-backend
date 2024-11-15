const mongoose = require("mongoose");

const QRStoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    qrCode: {
      type: String, // assuming QR code is stored as a base64 string or URL
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QRStore", QRStoreSchema);

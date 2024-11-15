const QRStore = require("../models/QR_store");

// Add a new QR code
exports.addQRCode = async (req, res) => {
  const { userId, eventId, qrCode } = req.body;
  if (!userId || !eventId || !qrCode) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const qrEntry = new QRStore({ userId, eventId, qrCode });
    await qrEntry.save();
    res.status(201).json({ success: true, data: qrEntry });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get QR codes for a specific event
exports.getQRCodesByEvent = async (req, res) => {
  try {
    const qrCodes = await QRStore.find({
      eventId: req.params.eventId,
    }).populate("userId", "name");
    res.json({ success: true, data: qrCodes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get QR codes for a specific user for a specific event
exports.getQRCodesByUser = async (req, res) => {
  try {
    const qrCodes = await QRStore.find({
      userId: req.params.userId,
      eventId: req.params.eventId,
    }).populate("userId", "name date");
    res.json({ success: true, data: qrCodes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update QR code for a user and event
exports.updateQRCode = async (req, res) => {
  const { userId, eventId, qrCode } = req.body;
  if (!userId || !eventId || !qrCode) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const qrEntry = await QRStore.findOneAndUpdate(
      { userId, eventId },
      { qrCode },
      { new: true, upsert: true }
    );
    res.json({ success: true, data: qrEntry });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete QR code by user and event
exports.deleteQRCode = async (req, res) => {
  const { userId, eventId } = req.body;
  if (!userId || !eventId) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const qrEntry = await QRStore.findOneAndDelete({ userId, eventId });
    if (!qrEntry) {
      return res
        .status(404)
        .json({ success: false, message: "QR code not found" });
    }
    res.json({ success: true, message: "QR code deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

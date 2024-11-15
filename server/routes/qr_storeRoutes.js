const express = require("express");
const QRStoreController = require("../controllers/qr_storeController");

const router = express.Router();

router.post("/", QRStoreController.addQRCode);
router.get("/event/:eventId", QRStoreController.getQRCodesByEvent);
router.get("/user/:userId/:eventId", QRStoreController.getQRCodesByUser);
router.put("/", QRStoreController.updateQRCode);
router.delete("/", QRStoreController.deleteQRCode);

module.exports = router;

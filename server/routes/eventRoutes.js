// routes/eventRoutes.js
const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

// Create a new event
router.post("/", eventController.createEvent);

// Get all events
router.get("/", eventController.getAllEvents);

// Get a specific event by ID
router.get("/:id", eventController.getEventById);

// Update an event
router.put("/:id", eventController.updateEvent);

// Delete an event
router.delete("/:id", eventController.deleteEvent);

// Mark interest in an event
router.post("/interest/:id", eventController.markInterest);

router.get("/tag/:tag", eventController.getEventsByTag);

module.exports = router;

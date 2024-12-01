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

// Get all events by an organiser
router.get("/:organizer", eventController.getAllEventsByOrganizer);

// Update an event
router.put("/:id", eventController.updateEvent);

// Delete an event
router.delete("/:id", eventController.deleteEvent);

// Mark interest in an event
router.post("/interest/:id", eventController.markInterest);

//get all events by tag
router.get("/tag/:tag", eventController.getEventsByTag);

//Unified search by event name or tags
router.get("/search", eventController.searchEvents);

// Get all events by socName
router.get("/organiser/:organiser", eventController.getAllEventsByOrganiser);

// Get future events by society
router.get("/organiser/:organiser/future", eventController.getFutureEventsByOrganiser);

// Get past events by society
router.get("/organiser/:organiser/past", eventController.getPastEventsByOrganiser);

module.exports = router;

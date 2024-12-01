// controllers/eventController.js
const Event = require("../models/Event");

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get all events by organizer
exports.getAllEventsByOrganizer = async (req, res) => {
  try {
    const organizerId = req.params.organizer;
    const events = await Event.find({ organizer: organizer });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark interest for an event
exports.markInterest = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    // Add userId to 'interested' array if not already added
    if (!event.interested.includes(req.body.userId)) {
      event.interested.push(req.body.userId);
      await event.save();
    }
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEventsByTag = async (req, res) => {
  try {
    const tag = req.params.tag;
    const regexPattern = `^${tag}`; // Matches values starting with `tag`
    const events = await Event.find({
      tags: { $regex: regexPattern, $options: "i" },
    });

    if (events.length === 0)
      return res.status(404).json({ error: "No events found with this tag" });

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Search events by event name or tags
exports.searchEvents = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).send({ message: "Query is required" });
  }

  try {
    // Search by event name or tags using regex for case-insensitive matching
    const events = await Event.find({
      $or: [
        { eventName: { $regex: query, $options: "i" } }, // Case-insensitive search for event name
        { tags: { $regex: query, $options: "i" } }, // Case-insensitive search for tags
      ],
    });

    if (events.length === 0) {
      return res.status(404).send({ message: "No events found" });
    }

    res.send(events);
  } catch (error) {
    console.error("Error searching events:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.getAllEventsByOrganiser = async (req, res) => {
  try {
    const organiser = req.params.organiser;

    const events = await Event.find({ organiser }); 

    if (!events || events.length === 0) {
      return res.status(404).json({ error: "No events found for this organiser" });
    }

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events by organiser:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getFutureEventsByOrganiser = async (req, res) => {
  try {
    const organiser = req.params.organiser;
    const today = new Date();

    // Find future events
    const events = await Event.find({ organiser, date: { $gte: today } });

    if (!events || events.length === 0) {
      return res.status(404).json({ error: "No future events found for this society" });
    }

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching future events:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getPastEventsByOrganiser = async (req, res) => {
  try {
    const organiser = req.params.organiser;
    const today = new Date();

    // Find past events
    const events = await Event.find({ organiser, date: { $lt: today } });

    if (!events || events.length === 0) {
      return res.status(404).json({ error: "No past events found for this society" });
    }

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching past events:", error);
    res.status(500).json({ message: error.message });
  }
};


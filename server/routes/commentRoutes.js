// routes/commentRoutes.js
const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// Create a new comment
router.post("/", commentController.createComment);

// Get all comments for a specific event
router.get("/event/:eventId", commentController.getCommentsByEvent);

// Update a comment
router.put("/:id", commentController.updateComment);

// Delete a comment
router.delete("/:id", commentController.deleteComment);

module.exports = router;

// index.js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const eventRoute = require("./routes/eventRoutes");
const commentRoute = require("./routes/commentRoutes");

const app = express();

// Routes
app.use("/api/event", eventRoute);
app.use("/api/comments", commentRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

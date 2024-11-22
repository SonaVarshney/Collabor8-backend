const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();


const eventRoute = require("./routes/eventRoutes");
const commentRoute = require("./routes/commentRoutes");
const userRoute = require("./routes/userRoutes");
const societyRoute = require('./routes/societyRoutes');
const authRoute = require('./routes/authRoutes')

const connectDB = require("./utils/database");
const bodyParser = require("body-parser");

const app = express();
// Connect to MongoDB
connectDB();

app.use(bodyParser.json())

// Routes
app.use("/api/user", userRoute);
app.use("/api/event", eventRoute);
app.use("/api/comments", commentRoute);
app.use("/api/society", societyRoute);
app.use("/api/auth", authRoute);

//Middleware
app.use(express.json());

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

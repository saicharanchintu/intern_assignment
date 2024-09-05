const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const internRoutes = require("./routes/internRoutes");
const performanceRoutes = require("./routes/performanceRoutes");
const taskRoutes = require("./routes/taskRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const DATABASE_URL = process.env.CONNECTION_URL;

// Connect to MongoDB
mongoose
  .connect(DATABASE_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", userRoutes);
app.use("/api/interns", internRoutes);
app.use("/api/performance", performanceRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/feedback", feedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/database");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Job Tracker API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

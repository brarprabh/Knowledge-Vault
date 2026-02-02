const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// ✅ Enable CORS for frontend
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Middleware to parse JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Test POST endpoint
app.post("/test", (req, res) => {
  const data = req.body;

  res.json({
    message: "Data received successfully",
    receivedData: data,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

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
app.post("/summarize", (req, res) => {
  const { title, url, type } = req.body;

  // Mocked summary response
  const response = {
    summary: [
      `This is a summary for "${title}"`,
      `Content type detected as ${type}`,
      "Main concepts are explained clearly",
    ],
    keyTakeaways: [
      "Summaries save time",
      "Structured knowledge improves recall",
    ],
  };

  res.json(response);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

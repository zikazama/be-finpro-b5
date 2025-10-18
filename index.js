const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { testConnection } = require("./src/configs/connection-db.js");
const app = express();
const port = 5000;

// Routes
const auth = require("./src/routes/auth.route");

// Enable CORS to allow all origins
app.use(
  cors({
    origin: "*", // Allow all origins
    credentials: true, // Enable credentials support if needed
  })
);

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", auth);

const startServer = async () => {
  await testConnection().catch((error) => {
    console.error("Failed to start server:", error);
  });

  app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
  });
};

startServer();

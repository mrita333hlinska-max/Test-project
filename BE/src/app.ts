import express from "express";
import axios from "axios";

// 1. Prepare the Express application
const app = express(); // Create an Express application

// 2. Add endpoints to the application
app.get("/", (_req, res) => {
  axios
    .get("https://api.example.com/data") // Make an HTTP GET request to an external API
    .then((response) => {
      res.json(response.data); // Send the API response data as JSON
    })
    .catch((error) => {
      console.error("Error fetching data from external API:", error);
      res.status(500).json({ error: "Failed to fetch data from external API" }); // Handle errors and send a 500 response
    });
  res.send("Hello, World!"); // Send a response for the root route
});

app.get("/api", (_req, res) => {
  res.json({ message: "This is the API endpoint." }); // Send a JSON response for the /api route
});

app.use("/*splat", (_req, res) => {
  res.status(404).json({ error: "Not Found" }); // Send a 404 response for any other route
});

export { app };

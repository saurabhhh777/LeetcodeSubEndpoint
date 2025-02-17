const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

// Convert Unix timestamp to date string in YYYY-MM-DD format
const convertTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};

app.get("/leetcode/:username", async (req, res) => {
  const { username } = req.params; // Get username from query parameter

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    // Fetch data from LeetCode GraphQL API
    const response = await axios.post(
      `${process.env.LEETCODE_ENDPOINT}`,
      {
        query: `
          query {
            matchedUser(username: "${username}") {
              submissionCalendar
            }
          }
        `,
      },
      {
        headers: {
          "Content-Type": "application/json", // Ensure correct content type
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", // Mimic browser request
        },
      }
    );

    // Parse the submission calendar data from the LeetCode response
    const submissionCalendar = JSON.parse(response.data.data.matchedUser.submissionCalendar);

    // Convert the submission data into the desired format { date: submission }
    const formattedData = {};
    Object.entries(submissionCalendar).forEach(([timestamp, submission]) => {
      const date = convertTimestamp(parseInt(timestamp)); // Convert timestamp to date string
      formattedData[date] = submission; // Map date to submission count
    });

    // Return the formatted data to the frontend
    console.log(formattedData);
    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching data:", error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({ error: "Request failed" });
  }
});


const PORT = process.env.PORT || 7000;


app.listen(PORT, () => console.log("Proxy server running on port 5000"));

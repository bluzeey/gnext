import express from "express";
import cheerio from "cheerio";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

// Sample route to demonstrate server setup
app.get("/", (req, res) => {
  res.send("Google Lens Scraper is running.");
});

// Scraping route (not actually implemented safely/compliantly)
app.get("/scrape", async (req, res) => {
  const { query } = req.query; // e.g., ?query=dog

  if (!query) {
    return res.status(400).send("Query parameter is required");
  }

  const url = `https://lens.google.com/search?p=${encodeURIComponent(query)}`;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const images = [];

    $("img").each((index, element) => {
      const imgSrc = $(element).attr("src");
      if (imgSrc) {
        images.push(imgSrc);
      }
    });

    res.json(images);
  } catch (error) {
    console.error("Error scraping Google Lens:", error);
    res.status(500).send("Error while trying to scrape Google Lens.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

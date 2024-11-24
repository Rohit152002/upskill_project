const express = require("express");
const fs = require("fs");
const rateLimit = require("express-rate-limit");
const path = require("path");

const app = express();
const port = 3000;

const quotes = JSON.parse(fs.readFileSync(path.join(__dirname, "quotes.json")));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { error: "Rate limit exceeded. Try again after a minute." },
});

app.use(limiter);

app.get("/", (req, res) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const { type, ...quoteWithoutType } = randomQuote;
  res.json(quoteWithoutType);
});

app.listen(port, () => {
  console.log(`Quote API is running at http://localhost:${port}`);
});

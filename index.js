import { join } from "node:path";
import express from "express";

const hostname = "localhost";
const port = 8080;

const __dirname = import.meta.dirname;

const app = express();

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(join(__dirname, "about.html"));
});

app.get("/contact-me", (req, res) => {
  res.sendFile(join(__dirname, "contact-me.html"));
});

app.use((req, res) => {
  res.status(404).sendFile(join(__dirname, "404.html"));
});

app.listen(port, hostname, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server running at http://${hostname}:${port}/`);
});

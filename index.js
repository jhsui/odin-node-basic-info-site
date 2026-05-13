import { createServer } from "node:http";
import fs from "node:fs/promises";
import { join } from "node:path";

const __dirname = import.meta.dirname;

const hostname = "localhost";
const port = 8080;

let indexFile;
let aboutFile;
let contactMeFile;
let file404;

const requestListener = function (req, res) {
  res.setHeader("Content-Type", "text/html");

  switch (req.url) {
    case "/":
      res.writeHead(200);
      return res.end(indexFile);

    case "/contact-me":
      res.writeHead(200);
      return res.end(contactMeFile);

    case "/about":
      res.writeHead(200);
      return res.end(aboutFile);

    default:
      res.writeHead(404);
      return res.end(file404);
  }
};

const server = createServer(requestListener);

Promise.all([
  fs.readFile(join(__dirname, "index.html")),
  fs.readFile(join(__dirname, "contact-me.html")),
  fs.readFile(join(__dirname, "about.html")),
  fs.readFile(join(__dirname, "404.html")),
])
  .then(([index, contact, about, notFound]) => {
    indexFile = index;
    contactMeFile = contact;
    aboutFile = about;
    file404 = notFound;

    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  })
  .catch((err) => {
    console.error(`Could not read files: ${err}`);
    process.exit(1);
  });

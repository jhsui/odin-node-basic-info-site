import { createServer } from "node:http";
import fs from "node:fs";

const hostname = "localhost";
const port = 8080;

const requestListener = function (req, res) {
  let fileName = "";

  switch (req.url) {
    case "/":
      fileName = "index.html";
      break;

    case "/contact-me":
      fileName = "contact-me.html";
      break;

    case "/about":
      fileName = "about.html";
      break;

    default:
      fileName = "404.html";
  }

  fs.readFile(fileName, (err, data) => {
    if (err) {
      res.writeHead(500, { "content-type": "text/plain" });
      res.end("server error");
      return;
    } else {
      res.writeHead(fileName === "404.html" ? 404 : 200, {
        "content-type": "text/html",
      });
      res.end(data);
    }
  });
};

const server = createServer(requestListener);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

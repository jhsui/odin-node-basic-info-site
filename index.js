import { createServer } from "node:http";
import fs from "node:fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const hostname = "localhost";
const port = 8080;

const requestListener = function (req, res) {
  fs.readFile(join(__dirname + "/index.html"))
    .then((contents) => {
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.end(contents);
    })
    .catch((err) => {
      res.writeHead(500);
      res.end("Internal Server Error");
      return;
    });
};

const server = createServer(requestListener);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

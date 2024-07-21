const fs = require("fs");

const requestHelper = (req, res) => {
  console.log(req);
  const url = req.url;
  const method = req.method;

  if (url === "/name" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      fs.writeFileSync("name.txt", parsedBody);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.end();
    });
  }

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>
        <head><title>Enter Name</title></head>
        <body><form action="/name" method="POST"><input type="text" name="name"><button type="submit">Enter</button></form></body>
        </html>`);
    res.end();
  }
};

module.exports = requestHelper;

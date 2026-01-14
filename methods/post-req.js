const reqBodyParser = require("../util/bodyParser");
const writeToFile = require("../util/writeToFile");
const crypto = require("crypto");

module.exports = async (req, res) => {
  if (req.url === "/api/movies") {
    try {
      let body = await reqBodyParser(req);
      body.id = crypto.randomUUID();
      req.movies.push(body);
      writeToFile(req.movies);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(body));
    } catch (e) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ title: "Validation Failed", message: "req body is invalid" }));
    }
  }
};

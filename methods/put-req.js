const reqBodyParser = require("../util/bodyParser");
const writeToFile = require("../util/writeToFile");

module.exports = async (req, res) => {
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  const id = req.url.split("/")[3];

  const regexV4 = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  );

  if (!regexV4.test(id)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "UUID Invalid",
      })
    );
  }

  if (baseUrl !== "/api/movies/") {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({
        title: "Not Found",
        message: "Route not found",
      })
    );
  }

  try {
    const body = await reqBodyParser(req);
    const index = req.movies.findIndex((movie) => movie.id === id);

    if (index === -1) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          title: "Not Found",
          message: "Movie not found",
        })
      );
    }

    req.movies[index] = { id, ...body };
    writeToFile(req.movies);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(req.movies[index]));
  } catch (e) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "Request body is invalid JSON",
      })
    );
  }
};

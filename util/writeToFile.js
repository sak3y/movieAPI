const fs = require("fs");
const path = require("path");

module.exports = (data) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "movies.json");
    const json = JSON.stringify(data, null, 2); // pretty print optional

    fs.writeFileSync(filePath, json, "utf-8");
  } catch (e) {
    console.log(e);
  }
};

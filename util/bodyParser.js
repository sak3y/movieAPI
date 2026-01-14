module.exports = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chuck) => {
        body += chuck;
      });
      req.on("end", () => {
        resolve(JSON.parse(body));
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

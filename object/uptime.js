module.exports.extract = async () => {
  const http = require("http");
  const express = require("express");
  const app = express();

  //
  app.use(express.static("public"));

  app.get("/", function(request, response) {
    response.sendFile("/app/glitch/index.html");
  });

  app.get("/", (request, response) => {
    response.sendStatus(200);
  });

  app.listen(process.env.PORT);

  setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
  }, 280000);
};

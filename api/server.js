const express = require("express");
const helmet = require("helmet");

const middleware = require("./middleware");
//const routes =

//const secrets =

const server = express();

middleware(server);

server.get("/", (req, res) => {
  res.send("it's working!");
});

module.exports = server;

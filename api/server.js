const express = require("express");
const authRouter = require("../routers/authRouter");
const userRouter = require("../routers/userRouter");
const helmet = require("helmet");
const cors = require("cors");
const server = express();

//middleware
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send("it's working!");
});

module.exports = server;

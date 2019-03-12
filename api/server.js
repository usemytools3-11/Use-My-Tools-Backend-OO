const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();

const authRouter = require("../routers/authRouter");
const userRouter = require("../routers/userRouter");
const toolsRouter = require("../routers/toolsRouter");
const lentToolsRouter = require("../routers/lentToolRouter");

//middleware
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);
server.use("/api/tools", toolsRouter);
server.use("/api/lent-tools", lentToolsRouter);

server.get("/api", (req, res) => {
  res.send("it's working!");
});

module.exports = server;

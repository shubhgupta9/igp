const express = require("express");
const server = express();
const userRouter = require("./routes/user");

var hbs = require("express-hbs");

server.engine(
  "hbs",
  hbs.express4({
    partialsDir: __dirname + "/views/",
  })
);
server.set("view engine", "hbs");
server.set("views", __dirname + "/views");

server.use(express.json());
server.use("/", userRouter);

server.listen(8080, () => console.log("server running"));

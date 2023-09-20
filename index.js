const express = require("express");
const server = express();
const userRouter = require("./routes/user");
const methodOverride = require("method-override");

var hbs = require("express-hbs");

server.engine(
  "hbs",
  hbs.express4({
    partialsDir: __dirname + "/views/",
  })
);
server.set("view engine", "hbs");
server.set("views", __dirname + "/views");

server.use(express.urlencoded({ extended: true }));

server.use(methodOverride("_method"));
server.use(express.json());
server.use("/", userRouter);

server.listen(8080, () => console.log("server running"));

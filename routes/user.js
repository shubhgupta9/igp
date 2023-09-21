const express = require("express");
const UC = require("../controllers/users");
const userRouter = express.Router();

userRouter
  .get("/", UC.readAll)
  .get("/create", UC.renderCreateUserForm)
  .put("/", UC.create)
  .get("/:id", UC.read)
  .put("/:id", UC.update)
  .get("/edit/:id", UC.renderEditUserForm)
  .post("/delete/:id", UC.delete);

module.exports = userRouter;

const fs = require("fs");
const data1 = JSON.parse(fs.readFileSync("data1.json", "utf-8"));
const users = data1.users;

function saveDataToFile() {
  fs.writeFileSync("data1.json", JSON.stringify(data1, null, 2), "utf-8");
}

exports.create = (req, res) => {
  const { name, email, designation } = req.body;

  // if (!name || !email || !designation) {
  //   return res.status(400).send("Please provide all required fields.");
  // }
  const newUser = {
    id: users.length + 1,
    name,
    email,
    designation,
  };

  users.push(newUser);

  saveDataToFile();

  console.log(req.body);

  res.redirect("/");
};

exports.renderCreateUserForm = (req, res) => {
  res.render("layouts/create");
};

exports.read = (req, res) => {
  const id = +req.params.id;
  const user = users.find((p) => p.id === id);
  res.render("layouts/view", user);
};

exports.readAll = (req, res) => {
  res.render("layouts/list", { users });
  // res.json(users);
};

exports.update = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((p) => p.id === id);
  const updatedUser = users[userIndex];
  users.splice(userIndex, 1, { ...updatedUser, ...req.body });
  saveDataToFile();
  res.redirect("/");
};

exports.renderEditUserForm = (req, res) => {
  const id = +req.params.id;
  const user = users.find((p) => p.id === id);
  res.render("layouts/edit", user);
};

exports.delete = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((p) => p.id === id);
  users.splice(userIndex, 1);
  saveDataToFile();
  res.redirect("/");
};

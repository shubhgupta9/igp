const fs = require("fs");
const data1 = JSON.parse(fs.readFileSync("data1.json", "utf-8"));
const users = data1.users;
const multer = require("multer");

function saveDataToFile() {
  fs.writeFileSync("data1.json", JSON.stringify(data1, null, 2), "utf-8");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB file size limit
});

exports.create = (req, res) => {
  const { name, email, designation } = req.body;

  if (!name || !email || !designation) {
    alert("pls provide all fields");
    return res.status(400).send("Please provide all required fields.");
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    designation,
  };

  users.push(newUser);

  saveDataToFile();

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

exports.update = [
  upload.single("photo"),
  (req, res) => {
    const id = +req.params.id;
    const userIndex = users.findIndex((p) => p.id === id);

    const { name, email, designation } = req.body;

    if (!name || !email || !designation) {
      return res.status(400).send("Please provide all required fields.");
    }

    const updatedUser = users[userIndex];

    if (req.file) {
      // Handle file upload if a new photo is provided
      updatedUser.photo = req.file.filename;
    }

    users.splice(userIndex, 1, { ...updatedUser, ...req.body });
    saveDataToFile();
    return res.status(200).send("OKAY");
    // res.redirect("/");
  },
];

exports.renderEditUserForm = (req, res) => {
  const id = +req.params.id;
  const user = users.find((p) => p.id === id);
  res.render("layouts/edit", user);
};

exports.delete = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((p) => p.id === id);

  if (userIndex === -1) {
    return res.status(404).send("User not found.");
  }

  users.splice(userIndex, 1);
  saveDataToFile();
  res.redirect("/");
};

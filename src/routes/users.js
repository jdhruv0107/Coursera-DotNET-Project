const express = require("express");
const apiKeyAuth = require("../middleware/auth");
const validateUserPayload = require("../middleware/validateUser");

const router = express.Router();

let users = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 23 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 }
];

let nextId = 3;

router.get("/", (req, res) => {
  res.json(users);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.json(user);
});

router.post("/", apiKeyAuth, validateUserPayload, (req, res) => {
  const newUser = {
    id: nextId++,
    name: req.body.name.trim(),
    email: req.body.email.toLowerCase(),
    age: req.body.age
  };

  users.push(newUser);
  return res.status(201).json(newUser);
});

router.put("/:id", apiKeyAuth, validateUserPayload, (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users[index] = {
    id,
    name: req.body.name.trim(),
    email: req.body.email.toLowerCase(),
    age: req.body.age
  };

  return res.json(users[index]);
});

router.delete("/:id", apiKeyAuth, (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const deletedUser = users[index];
  users = users.filter((item) => item.id !== id);
  return res.json({ message: "User deleted successfully", deletedUser });
});

function resetUsers() {
  users = [
    { id: 1, name: "Alice", email: "alice@example.com", age: 23 },
    { id: 2, name: "Bob", email: "bob@example.com", age: 30 }
  ];
  nextId = 3;
}

module.exports = router;
module.exports.resetUsers = resetUsers;

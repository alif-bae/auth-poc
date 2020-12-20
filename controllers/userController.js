const { User } = require("../models");
const userService = require("../services/userService");

const userList = async (req, res) => {
  const users = await userService.getUserList();
  res.json(users);
};

const userDetail = async (req, res) => {
  user_id = parseInt(req.params.id);
  const user = await userService.getUserById(user_id);

  if (!user) {
    res.status(404).send("Not Found");
  } else {
    res.status(200).json(user);
  }
  next(err);
};

const userCreate = async (req, res) => {
  try {
    new_user = await userService.createUser(req.body.email, req.body.password);

    if (!new_user) {
      res.status(400).send("Bad Request");
    } else {
      res.status(201).send("Created");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const userEdit = async (req, res) => {
  if (!req.body.email) {
    res.status(400).send("Bad Request");
  }

  user = await userService.updateUser(
    (user_id = req.params.id),
    (email = req.body.email)
  );
  if (!user) {
    res.status(404).send("Not Found");
  } else {
    res.status(200).json(user);
  }
};

const userDelete = async (req, res) => {
  try {
    const result = await userService.deleteUser(
      (userId = req.params.id),
      (email = req.body.email)
    );
    if (result == 0) {
      res.status(204).send("Deleted");
    } else if (result == 1) {
      res.status(400).send("Not Found")
    }
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

module.exports = {
  userList,
  userDetail,
  userCreate,
  userEdit,
  userDelete,
};

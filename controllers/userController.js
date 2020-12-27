const userService = require("../services/userService");

const userList = async (req, res) => {
  const users = await userService.getUserList();
  res.status(200).json(users);
};

const userDetail = async (req, res) => {
  try {
    const reqUserId = parseInt(req.params.id);
    const user = await userService.getUserById(reqUserId);
    res.status(200).json(user);
  } catch (err) {
    if (err.status == 404) {
      res.status(err.status).json({ message: err.message });
    } else next(err);
  }
};

const userCreate = async (req, res) => {
  try {
    if (!req.body.email) {
      throw { status: 400, message: "email is required" };
    } else if (!req.body.password) {
      throw { status: 400, message: "password is required" };
    }

    const newUser = await userService.createUser(req.body.email, req.body.password);
    if (!newUser) {
      throw { status: 422, message: "could not create user" };
    } else {
      res.status(201).json(newUser);
    }
  } catch (err) {
    if (err.status == 400 || err.status == 422) {
      res.status(err.status).json({ message: err.message });
    } else {
      next(err);
    }
  }
};

const userEdit = async (req, res) => {
  try {
    if (!req.body.email) {
      throw { status: 400, message: "email is required" };
    }
    const reqUserId = parseInt(req.params.id);
    const user = await userService.updateUser(reqUserId, req.body.email);
    res.status(200).json(user);
  } catch (err) {
    if (err.status == 404) {
      res.status(err.status).json({ message: err.message });
    } else {
      next(err);
    }
  }
};

const userDelete = async (req, res) => {
  try {
    const reqUserId = parseInt(req.params.id);
    await userService.deleteUser(reqUserId);
    res.status(204).json({ message: "user deleted successfully" });
  } catch (err) {
    if (err.status == 404) {
      res.status(err.status).json({ message: err.message });
    } else {
      next(err);
    }
  }
};

module.exports = {
  userList,
  userDetail,
  userCreate,
  userEdit,
  userDelete,
};

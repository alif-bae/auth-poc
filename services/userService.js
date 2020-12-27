const { User } = require("../models");

async function getUserList() {
  users = await User.findAll();
  return users;
}

async function getUserById(user_id) {
  const user = await User.findByPk(user_id);
  if (!user) {
    throw { status: 404, message: "user does not exist" };
  } else {
    return user;
  }
}

async function getUserByEmail(email) {
  user = await User.findOne({ where: { email: email } });
  if (!user) {
    throw { status: 404, message: "email not found" };
  } else {
    return user;
  }
}

async function createUser(email, password) {
  new_user = await User.create({
    email: email,
    password: password,
  });
  if (!new_user) {
    throw { status: 422, message: "could not create user" };
  } else {
    return new_user;
  }
}

async function updateUser(userId, email) {
  const [rows, user] = await User.update(
    {
      email: email,
    },
    {
      where: {
        id: userId,
      },
      plain: true,
    }
  );

  if (!rows) {
    throw { status: 404, message: "user does not exist" };
  } else {
    return getUserById(userId);
  }
}

async function deleteUser(userId, email) {
  const rows = await User.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (rows) {
    return true;
  } else {
    throw { status: 404, message: "user does not exist" };
  }
}

module.exports = {
  getUserList,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};

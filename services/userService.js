const { User } = require("../models");

async function getUserList() {
  const users = await User.findAll();
  return users;
}

async function getUserById(userId) {
  const user = await User.findByPk(userId);
  if (!user) {
    throw { status: 404, message: "user does not exist" };
  } else {
    return user;
  }
}

async function getUserByEmail(email) {
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    throw { status: 404, message: "email not found" };
  } else {
    return user;
  }
}

async function createUser(email, password) {
  const newUser = await User.create({
    email: email,
    password: password,
  });
  if (!newUser) {
    throw { status: 422, message: "could not create user" };
  } else {
    return newUser;
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

async function deleteUser(userId) {
  const rows = await User.destroy({
    where: {
      id: userId,
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

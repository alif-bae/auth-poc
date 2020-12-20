const { User } = require("../models");

function getUserList() {
  users = User.findAll();
  return users;
}

function getUserById(user_id) {
  user = User.findByPk(user_id);
  if (!user) {
    return;
  }
  return user;
}

async function getUserByEmail(email) {
  user = await User.findOne({
    where: { email: email },
  });
  console.log("from method", user);
  return user;
}

async function createUser(email, password) {
  if (!email || !password) {
    return;
  }

  new_user = await User.create({
    email: email,
    password: password,
  });
  return new_user;
}

async function updateUser(user_id, email) {
  user = await getUserById(user_id);
  if (user) {
    user.email = email;
    const updatedUser = await user.save();
    return updatedUser;
  } else {
    return;
  }
}

async function deleteUser(userId, email) {
  user = await getUserById(userId);
  result = 1
  try {
    if (user) {
      await user.destroy();
      result = 0
    } else {
      result = 1
    }
    return result
  } catch (err) {
    console.log(err)
  }

}

module.exports = {
  getUserList,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser
};

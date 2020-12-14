const {User} = require('../models')

function getUserList() {
    users = User.findAll();
    return users
}

function getUserById(user_id) {
    if (parseInt(user_id <= 0)) {
        return
    }

    user = User.findByPk(user_id)
    if (!user) {
        return
    }
    return user
}

function createUser(email, password) {
    if (!email || !password) {
        return
    }

    new_user = User.create({
        email: email,
        password: password
    })

    if (new_user) {
        return new_user
    }
    return

}

module.exports = {
    getUserList,
    getUserById,
    createUser
};
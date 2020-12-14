const {User} = require('../models')
const userService = require('../services/userService')

const userList = async (req, res) => {
  const users = await userService.getUserList()
  res.json(users)
}

const userDetail = async (req, res) => {
  user_id = parseInt(req.params.id)
  const user = await userService.getUserById(user_id)

  if (!user) {
    res.status(404).send('Not Found')
  } else {
    res.status(200).json(user)
  }
}

const userCreate = async (req, res) => {
  new_user = await userService.createUser(
    req.body.email,
    req.body.password
  );

  if (!new_user) {
    res.status(400).send('Bad Request')
  } else {
    res.status(201).send('Created')
  }
}

const userEdit = (req, res) => {
  res.send(
    'NOT IMPLEMENTED: user_edit'
  )
}

const userDelete = (req, res) => {
  res.send(
    'NOT IMPLEMENTED: user_delete'
  )
}

module.exports = {
  userList,
  userDetail,
  userCreate,
  userEdit,
  userDelete
}

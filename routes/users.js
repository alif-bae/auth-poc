const express = require('express');
const router = express.Router();
const passport = require('passport')
const {validateUrlPathParam} = require('../utils/argUtil')

// require controllers
const userController = require('../controllers/userController')

router.get('/', userController.userList)
router.get('/:id', passport.authenticate('jwt', {session: false}), validateUrlPathParam, userController.userDetail)
router.post('/', userController.userCreate)
router.put('/:id', validateUrlPathParam, userController.userEdit)
router.delete('/:id', validateUrlPathParam,  userController.userDelete)

module.exports = router
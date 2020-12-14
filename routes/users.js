const express = require('express');
const router = express.Router();

// require controllers
const userController = require('../controllers/userController')

function validateUrlPathParam(req, res, next) {
    if (parseInt(req.params.id) <= 0) {
        res.send("404 Not Found!");
    }
    next()
};

router.get('/', userController.userList)
router.get('/:id', validateUrlPathParam, userController.userDetail)
router.post('/', userController.userCreate)
router.put('/:id', validateUrlPathParam, userController.userEdit)
router.delete('/:id', validateUrlPathParam,  userController.userDelete)

module.exports = router
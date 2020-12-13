const express = require('express');
const router = express.Router();

// require controllers
const user_controller = require('../controllers/userController')

router.get('/', user_controller.user_list)
router.get('/:id', user_controller.user_detail)
router.post('/', user_controller.user_create)
router.put('/:id', user_controller.user_edit)
router.delete('/:id', user_controller.user_delete)

module.exports = router
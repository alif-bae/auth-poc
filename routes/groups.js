const express = require('express');
const router = express.Router();

// require controllers
const group_controller = require('../controllers/groupController')

router.get('/', group_controller.group_list)
router.get('/:id', group_controller.group_detail)
router.post('/', group_controller.group_create)
router.put('/:id', group_controller.group_edit)
router.delete('/:id', group_controller.group_delete)

module.exports = router
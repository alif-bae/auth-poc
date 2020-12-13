const express = require('express');
const router = express.Router();

// require controllers
const item_controller = require('../controllers/itemController')

router.get('/', item_controller.item_list)
router.get('/:id', item_controller.item_detail)
router.post('/', item_controller.item_create)
router.put('/:id', item_controller.item_edit)
router.delete('/:id', item_controller.item_delete)

module.exports = router
const express = require('express');
const router = express.Router();

// require controllers
const groupController = require('../controllers/groupController')

router.get('/', groupController.groupList)
router.get('/:id', groupController.groupDetail)
router.post('/', groupController.groupCreate)
router.put('/:id', groupController.groupEdit)
router.delete('/:id', groupController.groupDelete)

module.exports = router
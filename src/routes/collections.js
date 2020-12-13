const express = require('express');
const router = express.Router();

// require controllers
const collection_controller = require('../controllers/collectionController')

router.get('/', collection_controller.collection_list)
router.get('/:id', collection_controller.collection_detail)
router.post('/', collection_controller.collection_create)
router.put('/:id', collection_controller.collection_edit)
router.delete('/:id', collection_controller.collection_delete)

module.exports = router
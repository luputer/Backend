const express = require('express');
const router = express.Router();

const controller = require('../controllers/productControler');

router.get('/', controller.getAll)
router.post('/', controller.postProduct)
router.get('/:id', controller.deleteById)

module.exports = router;
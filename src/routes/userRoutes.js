const express = require('express');
const router = express.Router();

const controller = require('../controllers/userControler');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/:id', controller.deleteById);


module.exports = router;
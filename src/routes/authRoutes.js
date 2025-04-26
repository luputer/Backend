const express = require('express');
const router = express.Router();

const controller = require('../controllers/authControler');

router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/user/:id', controller.getById)


module.exports = router;
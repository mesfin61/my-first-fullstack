const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authControllers');
const { getUsers } = require('../controllers/userControllers')

router.post('/register', register);
router.post('/login', login);
router.get('/home', getUsers);

module.exports = router;

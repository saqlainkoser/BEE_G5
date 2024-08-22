const express = require('express');
const authController = require('./../Controllers/authController.js')

const router = express.Router();

router.route('/signup').post(authController.signup)

module.exports = router ;
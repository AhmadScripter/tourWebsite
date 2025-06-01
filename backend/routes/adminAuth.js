const express = require('express');
const { adminLogin } = require('../controller/adminAuthController');
const router = express.Router();

router.post('/', adminLogin);

module.exports = router;
const express = require('express');
const router = express.Router();
const { transform } = require('./users_controller');
/* GET users listing. */
router.get('/', transform);

module.exports = router;

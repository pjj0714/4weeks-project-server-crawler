const express = require('express');
const router = express.Router();
const { query } = require('./register_controller');

/* POST users listing. */
router.post('/', query);

module.exports = router;

const express = require('express');
const router = express.Router();
const { query } = require('./shopList_controller');

/* GET users listing. */
router.get('/', query);

module.exports = router;

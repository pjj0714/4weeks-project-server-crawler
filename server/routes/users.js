const express = require('express');
const router = express.Router();
const controller = require('./users_controller');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});
router.get('/template', controller.templateList);
router.get('/results', controller.getDmResults);
router.get('/condition/list', controller.conditionList);
/* POST users listing. */
router.post('/send', controller.sends);
router.post('/message', controller.message);

/* PUT users listing. */
router.put('/condition', controller.condition);
module.exports = router;

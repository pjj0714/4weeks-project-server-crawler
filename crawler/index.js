const urlScrap = require('./scrap/imge/urlScrap');
const se = require('./models/index').sequelize;
se.sync();
async function puppet(tag, after) {
  console.log('시작');
  return await urlScrap(tag, after);
}
puppet('네일');

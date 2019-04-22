const models = require('../models/index');

exports.query = async function(req, res) {
  let {
    page = 0,
    limitCount = 20,
    text,
    search = 'account_name',
    status
  } = req.query;
  try {
    const where = {};
    const responseData = {};
    [text, status] = [decodeURI(text), decodeURI(status)];

    where.is_shop = true;
    where.double_check_it = false;
    where.status = status;

    if (text !== 'undefined') {
      where[search] = { $like: `%${text}%` };
    }

    if (search === 'All' && text !== 'undefined') {
      where.$or = {
        account_name: { $like: `%${text}%` },
        account_full_name: { $like: `%${text}%` },
        account_tag: { $like: `%${text}%` }
      };
      delete where[search];
    }

    if (status === '전체' || status === 'undefined') delete where.status;

    const data = await models.Users.findAll({
      where,
      offset: Number(page * limitCount),
      limit: Number(limitCount)
    });

    let dataCount = await models.Users.findAll({ where });

    responseData.data = data;
    responseData.dataCount = dataCount.length;
    res.send(responseData);
  } catch (err) {
    res.status(401).send(err.message);
  }
};

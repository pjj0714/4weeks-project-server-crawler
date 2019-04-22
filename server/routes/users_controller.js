const directMessage = require('../instagramDM/directMessage');
const Messages = require('../models/index').Messages;
const Condition = require('../models/index').Conditions;
const Users = require('../models/index').Users;

const _getDmResults = async (page, limitCount, option) => {
  let [obj, where] = [{}];

  if (option === '전체보기') {
    where = {
      status: {
        $not: '미확인'
      }
    };
  } else {
    where = {
      status: option
    };
  }
  const results = await Users.findAll({
    where: where,
    offset: Number(page * limitCount),
    limit: Number(limitCount)
  });
  const resultsCount = await Users.findAll({
    where: where
  });
  obj = { results };
  obj.resultsCount = resultsCount.length;
  return obj;
};

exports.getDmResults = async (req, res) => {
  const { option, page = 0, limitCount = 20 } = req.query;
  const result = await _getDmResults(page, limitCount, option);
  res.status(200).send(result);
};

exports.templateList = async (req, res) => {
  try {
    const messages = await Messages.findAll();
    res.status(200).send(messages);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.message = async (req, res) => {
  const { title, message } = req.body;
  try {
    await Messages.create({
      title,
      direct_message: message,
      created_date: Date.now()
    });
    res.status(201).send('ok');
  } catch (err) {
    res.status(401).send(err.message);
  }
};

const userStatusUpdate = async (account_name, status, message) => {
  if (message === undefined) {
    message = null;
  }
  await Users.update(
    { status, send_message: message, send_date: Date.now() },
    {
      where: {
        account_name
      }
    }
  );
};
exports.sends = async (req, res) => {
  let { users, option } = req.body;
  let [mkUrl, messages, message] = [];
  for (let user in users) {
    try {
      await userStatusUpdate(user, 'DM 발송요청');
    } catch (err) {
      console.log(err.message);
    }
  }

  for (let user in users) {
    let status = users[user];
    if (option !== 'DM 발송요청') {
      await userStatusUpdate(user, '삭제');
    } else {
      try {
        messages = await Condition.findOne({
          where: { condition: status },
          include: { model: Messages }
        });
        message = messages.Message.direct_message;
      } catch (err) {
        console.log('1 : ', err.message);
      }
      try {
        mkUrl = await directMessage(user, message);
        await userStatusUpdate(user, 'DM 발송완료', mkUrl);
      } catch (err) {
        await userStatusUpdate(user, 'DM 발송실패', mkUrl);
      }
    }
  }
  res.send('ok');
};

exports.condition = async (req, res) => {
  const { arr } = req.body;
  console.log(arr);
  try {
    for (let val of arr) {
      console.log(val);
      await Condition.update(
        {
          title: val.title,
          last_modify_date: Date.now()
        },
        {
          where: {
            condition: val.condition
          }
        }
      );
    }
    res.status(202).send('ok');
  } catch (err) {
    res.status(402).send(err.message);
  }
};

exports.conditionList = async (req, res) => {
  const list = await Condition.findAll();
  const title = await Messages.findAll({
    attributes: ['title']
  });
  const data = {
    list,
    title
  };
  res.status(200).send(data);
};

exports.transform = async (req, res) => {
  const transUser = await Users.findAll({ where: { status: '제휴완료' } });
  const users = await Users.findAll();

  const result = (transUser.length / users.length) * 100;

  const data = {
    transUser: transUser.length,
    users: users.length,
    result
  };
  res.status(200).send(data);
};

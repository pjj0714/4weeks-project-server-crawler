const fetch = require('node-fetch');
const Users = require('../models/index').Users;
const url =
  '';

exports.query = async function(req, res) {
  let token = await getToken();
  let { access_token, token_type, scope, jti } = token;

  let { data, user } = req.body;
  const account_name = Buffer.from(user, 'base64').toString('ascii');
  await Users.update({ status: '제휴완료' }, { where: { account_name } });

  let response_data = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      Authorization: token_type + ' ' + access_token,
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(data)
  });
  console.log('response :', await response_data.json());
  res.send('ok');
};

async function getToken() {
  const url = `${auth_url}`;
  const data = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Basic bWVyY2hhbnQtZ3Vlc3Q6',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
    })
  };
  let res = await fetch(url, data);
  let json = await res.json();
  json = json.access_token;
  return json;
}
getToken().then(data => console.log(data));

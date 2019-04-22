const fetch = require('node-fetch');
const url =
  'http://ec2-52-78-48-27.ap-northeast-2.compute.amazonaws.com:38380/register';
let data = {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json'
  },
  body: JSON.stringify({
    data: { test: 'test' }
  })
};

async function getCheck(token, type) {
  try {
    data.headers.Authorization = `${type} ${token}`;
    let a = await fetch(url, data);
    let b = await a.json();

    console.log(a.headers);
    console.log(b);
  } catch (err) {
    console.log(err);
  }
}
getCheck('basic', 'tokentoken');

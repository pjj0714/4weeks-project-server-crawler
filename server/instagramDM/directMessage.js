const iClient = require('instagram-private-api').V1;
const user = require('../config/config.json').user;
const device = new iClient.Device(user.username);
const storage = new iClient.CookieFileStorage(
  __dirname + `/${user.username} instaUser.json`
);
async function login(name, message) {
  const session = await iClient.Session.create(
    device,
    storage,
    user.username,
    user.password
  );
  try {
    const account = await iClient.Account.searchForUser(session, name);
    session.referer = 'instagram';
    const bufferUser = Buffer.from(name).toString('base64');
    const dmLink = 'url';
    message = `${message}\n${dmLink}?${bufferUser}`;
    await iClient.Thread.configureText(session, account.id, message);
    console.log('success!!');
    return message;
  } catch (err) {
    console.log(err.mesaage);
  }
}

module.exports = login;

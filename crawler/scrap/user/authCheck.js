const fetch = require('node-fetch');
const auth_url = 'url';

module.exports = class AuthService {
  constructor(domain) {
    this.domain = domain || auth_url;
    this.fetch = this.fetch.bind(this);
    this.login = this.login.bind(this);
  }
  login(username, password) {
    return this.fetch(`${this.domain}/oauth/token`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      })
    }).then(res => res);
  }
  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let err = new Error(response.statusText);
      err.response = response;
      throw err;
    }
  }
  fetch(url, options) {
    const headers = {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: 'Basic YWRtaW46'
    };
    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(res => res.json());
  }
  async getCheck(token, type, id) {
    let a = await fetch(
      `${auth_url}`,
      {
        headers: {
          Authorization: `${type} ${token}`
        }
      }
    );
    const b = await a.json();
    console.log('bbbbbbbbbbbbbbbbbbb : ', b);
    return b;
  }
};

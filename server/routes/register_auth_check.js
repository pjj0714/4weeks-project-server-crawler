
module.exports = class RegisterAuthCheck {
  constructor(domain) {
    this.domain = domain || ;
    // this.fetch = this.fetch.bind(this);
    // this.login = this.login.bind(this);
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

  // fetch(url, options) {
  //   return fetch(url, {
  //     headers,
  //     ...options
  //   })
  //     .then(this._checkStatus)
  //     .then(res => res.json());
  // }
  async getCheck(token, type, id) {
    let a = await fetch(`${auth_url}`, {
      headers: {
        method: 'POST',
        Authorization: `${type} ${token}`
      },
      body: {
        data: { test: 'test' }
      }
    });
    return await a.json();
  }
};

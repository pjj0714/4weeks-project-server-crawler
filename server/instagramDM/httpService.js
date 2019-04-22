"use strict";

const http = require("http");
const url = require("url");

module.exports = {
  get(url) {
    return this._makeRequest("GET", url);
  },
  _makeRequest(method, urlString, options) {
    return new Promise((resolve, reject) => {
      const parsedUrl = url.parse(urlString);
      const requestOptions = this._createOptions(method, parsedUrl);
      const request = http.get(requestOptions, res => {
        this._onResponse(res, resolve, reject);
      });
      request.on("error", reject);
      request.end();
    });
  },
  _createOptions(method, url) {
    let url_info = {
      hostname: url.hostname,
      path: url.path,
      port: url.port,
      method
    };
    return url_info;
  },
  _onResponse(response, resolve, reject) {
    const hasResponseFailed = response.statusCode >= 400;
    let responseBody = "";

    if (hasResponseFailed) {
      reject(`Request to ${response.url} failed with HTTP ${response.status}`);
    }
    response.on("data", chunk => {
      responseBody += chunk.toString();
    });
    response.on("end", () => resolve(responseBody));
  },
  _addQueryParams(originUrl) {
    let obj = url.parse(originUrl, true, false);
    obj.query["ge_source"] = "instagram";
    obj.query["ge_medium"] = "social";
    obj.query["ge_campaign"] = "insta_DM";
    delete obj.search;
    let trackedUrl = url.format(obj);
    return trackedUrl;
  },
  _trackedUrl(param) {
    // example
    var params = window.location.search.substr(1).split("&");
    for (let i = 0; i < params.length; i++) {
      let p = params[i].split("=");
      if (p[0] === param) {
        return decodeURIComponent(p[1]);
      }
    }
    return false;
  }
};

// _trackedUrl example
// url_src = _trackedUrl("ge_source");
// url_mdm = _trackedUrl("ge_medium");
// url_cpn = _trackedUrl("ge_campaign");

// Internal api representation.
//
// @since 1.0
// @date 2015.11.1
// @author ray


var _ = require('underscore');
var urlp= require('url-pattern');

var API = function () {
  this._headers = {};
  this._uri = undefined;
  this._method = API.M.G;
  this._response = undefined;
};

// setup methods
API.M = {
  G: "GET",
  PO: "POST",
  PU: "PUT",
  T: "TRACE",
  H: "HEAD"
};

// Add header to api or get header by name or get header acorrding to arguemnts length .
// usage:
//  ```
//    var headers = api.header();
//    var accetpH = api.header('accept');
//    api.header('accept', "curl");
//    api.header('accept', "curl", true);
//  ```
API.prototype.header = function () {
  var argc = arguments.length;
  switch (arguments.length) {
    case 0: 
      return this._headers;
    case 1:
      return this._headers[arguments[0].toLowerCase()];
    default:
      break;
  }

  // set header
  var key = arguments[0].toLowerCase();
  if (key in this._headers && 2 == argc) {
    this._headers[key].push(arguments[1]);

  } else {
    this._headers[key] = [arguments[1]];

  }
  return true;
}

API.prototype.uri = function() {
  var argc = arguments.length;
  switch (arguments.length) {
    case 0: 
      return this._uri;
    default:
      this._uri = arguments[0];
      break;
  }
};



API.prototype.res = function() {
  var argc = arguments.length;
  switch (arguments.length) {
    case 0: 
      return this._response;
    default:
      this._response = arguments[0];
      break;
  }
};

API.prototype.method = function() {
  var argc = arguments.length;
  switch (arguments.length) {
    case 0: 
      return this._method;
    default:
      this._method = arguments[0];
      break;
  }
};


// Match the uri using library *url-pattern*
//
// @param uri uri to matched
// @return null: not match; {name:val} match
API.prototype.matchURI = function (uri) {
  if (!uri) {
    return false;
  }

  var ptn = new urlp(this.uri());
  return ptn.match(uri);
}

// Math the header by name and val
//
// @param header case-insensitive header name
// @param val header val case sensitive
// @return true | false
API.prototype.matchHeader = function (header, val) {
  var hVal = this.header(header);
  return !hVal ? false : undefined !== _.find(hVal, function(hdr) {
    return hdr === val;
  });
}

API.prototype.matchMethod = function (method) {
  return this.method() === method;
}

module.exports = API;

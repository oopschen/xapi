var expect = require('expect.js');
var API = require('../lib/api.js');

describe("api", function() {
  it('match api by criterias', function () {
    var userInfo = new API();
    userInfo.header('Content-Type', 'text/html');
    userInfo.header('Content-Type', 'x-application/json');

    userInfo.method(API.M.P);
    userInfo.res({"name": 'name'});
    userInfo.uri('/a/b/:id.json');

    expect(userInfo.method()).to.be(API.M.P);
    expect(userInfo.header('content-Type')).to.eql(['text/html', 'x-application/json']);
    expect(userInfo.uri()).to.be('/a/b/:id.json');

    expect(userInfo.matchURI('/a/b/1.json')).to.eql({id: 1});
    expect(userInfo.matchMethod(API.M.P)).to.be(true);
    expect(userInfo.matchHeader('content-type', 'text/html')).to.be(true);
    
  });
});

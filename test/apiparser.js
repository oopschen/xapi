var expect = require('expect.js');
var parser = require('../lib/apiparser.js');
var path = require('path');

describe('parse apis', function() {

  it('parser aips', function(done) {
    
    var curPath = path.resolve(__dirname, 'api');
    parser(curPath, function(apis) {
      expect(apis).to.length(1);
      done();

    });
  }); 
});

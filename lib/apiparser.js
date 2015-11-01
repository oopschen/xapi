// The directory based parser.
// Usage:
// ```
//    var parser = require('apiparser.js');
//    parser(path, function(apis) {
//
//    });
// ```
//
// @since 1.0
// @author ray
// @date 2015.11.1
//
var fs = require('fs');
var _ = require('underscore');
var path = require('path');
var util = require('util');

// parse api and return the list of api module
//
// @param path file or directory
// @param callback when finished callback it with a list or fail with null
function parse(fpath, callback) {
  var apis = [];
  loopFile(fpath, function(isStop, fileAbsPath) {
    if (isStop) {
      callback(apis);
      return;
    }


    var api = parseAPI(require.resolve(fileAbsPath));

    if (api) {
      apis.push(api);
    }

  });
  
}

// Loop the filesystem, callback with file object
//
// @param path the file path(directory or file)
// @param callback callback funtion accept one file object
function loopFile(fpath, callback) {
  if (!fpath) {
    callback(true);
    return;
  } 

  var findFiles = function(fileList, cb) {
    if (fileList.length < 1) {
      cb(true);
      return;
    }
    var filePath = path.resolve(fileList.pop());
    fs.stat(filePath, function(err, stats) {
      if (err) {
        util.error("stat path:", this.path, err);
        findFiles(this.result, this.cb);
        return;
      }

      // directories
      if (stats.isDirectory()) {
        fs.readdir(this.path, function(err, files) {
          if (err) {
            util.log("list directory:", this.path, err);
            findFiles(this.result, this.cb);
            return;
          }

          _.each(files, function(f) {
            this.result.push(path.resolve(this.path, f));
          }, this);
          findFiles(this.result, this.cb);


        }.bind(this));

      } else if (stats.isFile()) {
        // files
        cb(false, this.path);
        findFiles(this.result, this.cb);

      } else {
        // others ignore
        findFiles(this.result, this.cb);
      }

    }.bind({path: filePath, result: fileList, cb:cb}));

  };

  findFiles([path.resolve(fpath)], callback);
    
}

function parseAPI(mod) {
  
  // TODO module parsing
  return {};
}

module.exports = parse;

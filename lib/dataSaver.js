var fs = require('fs');
var path = require('path');

/**
 *
 * @constructor
 */
function DataSaver () {

}

/**
 *
 * @param file
 * @param text
 * @param cb
 */
DataSaver.prototype.appendToFile = function (file, text, cb) {
  fs.appendFile(path.resolve(file), text +  '\n', function (err) {
    if(cb) {
      cb(err);
    }

  });
};


module.exports = DataSaver;
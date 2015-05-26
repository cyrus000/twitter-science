var fs = require('fs');
var path = require('path');

function Filter (dataPath) {
  var filterTerms = fs.readFileSync(path.resolve(dataPath)).toString().split('\n').join('|');
  this.regExp = new RegExp(filterTerms, 'i');
}


/**
 *
 * @param text
 */
Filter.prototype.passFilter = function (text) {
  return this.regExp.exec(text) === null;
};



module.exports = Filter;
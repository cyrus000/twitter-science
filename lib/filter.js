var fs = require('fs');
var path = require('path');

function Filter (dataPath) {
  var filterTerms = fs.readFileSync(path.resolve(dataPath)).toString().toLowerCase().split('\n').join('|');
  this.regExp = new RegExp(filterTerms, 'i');
}


/**
 *
 * @param text
 * @returns {boolean}
 */
Filter.prototype.passFilter = function (text) {
  return this.regExp.exec(text.toLowerCase()) === null;
};



module.exports = Filter;
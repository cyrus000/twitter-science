var happyEmoticon = ' HAPPY_EMOTICON ';
var sadEmoticon = ' SAD_EMOTICON ';

/**
 *
 * @constructor
 */
function PrepareString (config) {
  this.config = config;
}

/**
 *
 * @param text
 * @returns {*}
 */
PrepareString.prototype.prepare = function (text) {
  text = text.replace(/(\r\n|\n|\r)/gm,"");
  text = this.replaceAll('#', '', text);
  text = this.replaceAll('.', ' ', text);

  text = this.replaceAll(':)', happyEmoticon, text);
  text = this.replaceAll('=)', happyEmoticon,text);
  text = this.replaceAll(':-)', happyEmoticon,text);
  text = this.replaceAll(';)', happyEmoticon,text);

  text = this.replaceAll(';(', sadEmoticon,text);
  text = this.replaceAll(';(', sadEmoticon,text);
  text = this.replaceAll('=(', sadEmoticon,text);
  text = this.replaceAll(':-(', sadEmoticon,text);


  if(text.indexOf('RT ') === 0 || !text) {
    return null
  }



  if(text.indexOf('http') > -1) {
    return null;
  }

  if(text.split(' ').length > this.config.minLength) {
    return text;
  }

  return null;
};


PrepareString.prototype.replaceAll = function (find, replace, str) {
  var find = find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  return str.replace(new RegExp(find, 'g'), replace);
};


module.exports = PrepareString;


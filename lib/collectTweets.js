var util = require("util");
var events = require("events");

/**
 *
 * @param client
 * @param filter
 * @constructor
 */
function CollectTweet (client, filter) {
  client.stream('statuses/filter', {track: filter},  function(stream){
    stream.on('data', function(tweet) {
      if(tweet.user.lang !== 'en') {
        return;
      }

      this.emit("tweet", tweet.text);
    }.bind(this));

    stream.on('error', function(error) {
      this.emit("error", error);
    });
  }.bind(this));

}

util.inherits(CollectTweet, events.EventEmitter);

module.exports = CollectTweet;
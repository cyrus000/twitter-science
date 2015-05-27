var config = require('./etc/config');
var twitterConfig = require('./etc/twitterConfig');
var Twitter = require('twitter');
var Filter = require('./lib/filter');
var DataSaver = require('./lib/dataSaver');

var dataSaver = new DataSaver();
var filter = new Filter(config.filter.dataFilePath);

var client = new Twitter(twitterConfig);

client.stream('statuses/sample', {},  function(stream){
  stream.on('data', function(tweet) {
    if(tweet.user.lang !== 'en') {
      return;
    }

    if(filter.passFilter(tweet.text)) {
      dataSaver.appendToFile('./data/sampleTweets.txt', tweet.text.replace(/(\r\n|\n|\r)/gm,""));
    }

  });

  stream.on('error', function(error) {
  });
});

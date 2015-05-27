var Twitter = require('twitter');
var config = require('./etc/config');
var twitterConfig = require('./etc/twitterConfig');
var CollectTweets = require('./lib/collectTweets');
var Filter = require('./lib/filter');
var DataSaver = require('./lib/dataSaver');
var PrepareString = require('./lib/prepareString');


var prepareString = new PrepareString(config.prepareString);
var dataSaver = new DataSaver();
var filter = new Filter(config.filter.dataFilePath);
var client = new Twitter(twitterConfig);

saveTweets('#happy', config.dataFiles.happyTweets);
saveTweets('#sad', config.dataFiles.sadTweets);

function saveTweets(filterOn, file) {
  var tweets = new CollectTweets(client, filterOn);
  tweets.on('tweet', function(tweet) {

    var formattedTweet = prepareString.prepare(tweet);
    if(filter.passFilter(tweet) && formattedTweet) {
      dataSaver.appendToFile(file, formattedTweet);
      console.log(filterOn + ' -- ' + formattedTweet);
    }
  });
}
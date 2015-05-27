var fs = require('fs');
var config = require('./etc/config');
var limdu = require('meet-limdu');
var twitterConfig = require('./etc/twitterConfig');
var Twitter = require('twitter');
var Filter = require('./lib/filter');
var DataSaver = require('./lib/dataSaver');
var PrepareString = require('./lib/prepareString');

var data = [];
var prepareString = new PrepareString(config.prepareString);
var dataSaver = new DataSaver();
var filter = new Filter(config.filter.dataFilePath);


data = formatTrainingData(data,'happy', config.dataFiles.happyTweets);
data = formatTrainingData(data,'sad', config.dataFiles.sadTweets);

var TextClassifier = limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
  binaryClassifierType: limdu.classifiers.SvmLinear.bind(0, {C: 1.0})
});

var classifier = new limdu.classifiers.EnhancedClassifier({
  classifierType: TextClassifier,
  featureExtractor: limdu.features.NGramsOfWords(1),  // each word ("1-gram") is a feature
  featureLookupTable: new limdu.features.FeatureLookupTable()
});

classifier.trainBatch(data);


console.log(classifier.classify("work shoes are so torn up "));
var client = new Twitter(twitterConfig);

client.stream('statuses/sample', {},  function(stream){
  stream.on('data', function(tweet) {
    tweet = tweet.text;
    var formattedTweet = prepareString.prepare(tweet);
    if(filter.passFilter(tweet) && formattedTweet) {
      var str = classifier.classify(formattedTweet)[0] + '  --- ' + tweet;
      console.log(str)
    }


  });

  stream.on('error', function(error) {
  });
});



function formatTrainingData (data, label, file) {
  var d = fs.readFileSync(file).toString().split('\n');

  d.forEach(function(line) {
    data.push({input: line.toLowerCase(), output: label})
  });


  return data;
}
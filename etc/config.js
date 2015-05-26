module.exports = {
  filter: {
    dataFilePath: './etc/filterWords.txt'
  },
  dataFiles: {
    happyTweets: './data/happyTweets.txt',
    sadTweets: './data/sadTweets.txt'
  },
  prepareString : {
    minLength: 4
  }
};
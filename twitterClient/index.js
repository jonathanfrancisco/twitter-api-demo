const Twitter = require('twitter')

const config = require('../config')

module.exports = (accessToken, accessTokenSecret) => {
  return new Twitter({
    consumer_key: config.TWITTER_CONSUMER_KEY,
    consumer_secret: config.TWITTER_CONSUMER_SECRET_KEY,
    access_token_key: accessToken,
    access_token_secret: accessTokenSecret
  })
}

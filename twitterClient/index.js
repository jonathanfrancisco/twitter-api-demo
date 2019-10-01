const Twitter = require('twitter')
const config = require('../config')

module.exports = (accessTokenKey, accessTokenSecretKey) => {
  return new Twitter({
    consumer_key: config.TWITTER_CONSUMER_KEY,
    consumer_secret: config.TWITTER_CONSUMER_SECRET_KEY,
    access_token_key: accessTokenKey,
    access_token_secret: accessTokenSecretKey
  })
}

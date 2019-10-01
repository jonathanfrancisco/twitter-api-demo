const passport = require('passport')
const { Strategy: TwitterStrategy } = require('passport-twitter')

const config = require('../config')

module.exports = () => {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: config.TWITTER_CONSUMER_KEY,
        consumerSecret: config.TWITTER_CONSUMER_SECRET_KEY,
        callbackURL: config.TWITTER_CALLBACK_URL
      },
      (token, tokenSecret, profile, callback) => {
        const user = {
          token,
          tokenSecret,
          username: profile.username,
          displayName: profile.displayName
        }
        callback(null, user)
      }
    )
  )
  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })
}

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const passportConfig = require('./passportConfig')
const authenticated = require('./middlewares/authenticated')
const twitterClient = require('./twitterClient')

const app = express()
passportConfig()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
  session({ resave: false, saveUninitialized: false, secret: 'shithappens' })
)
app.use(passport.initialize())
app.use(passport.session())

app.get('/', authenticated, (req, res) => {
  const { username, token, tokenSecret } = req.user
  twitterClient(token, tokenSecret)
    .get('statuses/user_timeline')
    .then(results => {
      console.log(results)
    })
  res.render('index')
})

app.get('/login', (req, res) => res.render('login'))
app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})
app.get('/auth/twitter', passport.authenticate('twitter'))
app.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
)

app.listen(3000, () => {
  console.log('server started on port 3000')
})

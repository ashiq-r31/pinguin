const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const server = http.Server(app)

const io = socketIO(server)
require('./services/socket')(io)
const User = require('./models/user')

mongoose.connect('mongodb://<user:pass>/pinguin')

app.use(express.static(__dirname + '/dist'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.sendFile('./index.html')
})

const jwt = require('jwt-simple')

const tokenForUser = (user) => {
  const timestamp = new Date().getTime()
	return jwt.encode({ sub: user.id, iat: timestamp }, 'rahmaas')
}

app.post('/api/sign-up', (req, res, next) => {
  const { username, email, password } = req.body
  
  if(!username || !email || !password) {
		return res.status(422).send({ error: `You must provide username, email and password.` })
	}

  User.findOne({ email }, (err, existingUser) => {
		if(err) return next(err)
		if(existingUser) res.status(422).send({ error: `Email already in use.` })
	})

  const user = new User({ username, email, password })

  user.save(err => {
    if(err) return next(err)
    res.json({ success: true, token: tokenForUser(user) })
  })
})

const passport = require('passport')
const requireAuth = passport.authenticate('local', { session: false })


app.post('/api/login', requireAuth, (req, res, next) => {
  res.json({ success: true, token: tokenForUser(req.user) })
})

server.listen(8080, () => {
  console.log('listening on *:8080')
})


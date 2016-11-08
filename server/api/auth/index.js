'use strict'

var express = require('express')
var passport = require('passport')
var auth = require('./auth.service')
var User = require('../user/user.model')

var router = express.Router()

// Passport Configuration
passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(user, done) {
  done(null, user)
})

require('./passport-strategy').setup(User)

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info
    if (error) return res.status(401).json(error)
    if (!user) return res.status(404).json({message: 'Something went wrong, please try again.'})

    var token = auth.signToken(user._id, user.role)
    res.json({token: token})
  })(req, res, next)
})

module.exports = router
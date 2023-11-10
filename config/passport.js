const express = require("express");
const router = express.Router();
const passport =require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const{User} = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },

  async function (accessToken, refreshToken, profile, cb) {
    try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) return cb(null, user);

        const [firstName, lastName] = profile.displayName?.split(' ');

        user = await User.create({
        googleId: profile.id,
        firstName,
        lastName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
    });
    
    return cb(null, user);
    } catch (err) {
        return cb(err);
    }
  }
));

passport.serializeUser(function(user, cb) {
    cb(null, user._id);
});

passport.deserializeUser(async function(userId, cb) {
    cb(null, await User.findById(userId));
})
var express = require('express');
var router = express.Router();
const passport = require('passport');
const Appt = require('../models/appt');
const {Roles} = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;
const moment = require('moment');

/* GET home page. */
router.get('/', async function(req, res, next) {
    const user = req?.user || {};
    const isSignedIn = req.isAuthenticated();

    const aggregation = [];

    if (user.role === Roles.client) {
      aggregation.push({
        $match: {
          userId: new ObjectId(user._id),
        },
      })
    }
    
    const appts = (isSignedIn ? (await Appt.aggregate ([
      ...aggregation,
      {
        $lookup: {
          from:'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user'
      }
    ]).exec()) :[]).map(appt => ({
      ...appt,
      date: moment(appt.date).format('MMMM DD YYYY, h:mm a'),
    }));

    res.render('index', { title: 'Cleaning Services - Schedule Application', isSignedIn, appts});
    });
  
// GET Route, OAuth Authenticate
router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['email', 'profile']
  }
));

// GET Route, OAuth Authenticate
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login/failed',
}));

// GET Route, Logout
router.get('/logout', function(req, res){
  req.logout(function(err) {
    res.redirect('/');
  });
});

module.exports = router;

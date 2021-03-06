const models = require('../models');
const Promise = require('bluebird');

// In middleware/auth.js, write a createSession middleware function that accesses the parsed cookies on the request,
// looks up the user data related to that session, and assigns an object to a session property on
// the request that contains relevant user information. (Ask yourself: what information about the user
// would you want to keep in this session object?)

// An incoming request with no cookies should generate a session with a unique hash and store it the 
// sessions database. The middleware function should use this unique hash to set a cookie in the response headers. 
// (Ask yourself: How do I set cookies using Express?).

// If an incoming request has a cookie, the middleware should verify that the cookie is valid 
// (i.e., it is a session that is stored in your database).
// If an incoming cookie is not valid, what do you think you should do with that session and cookie?

module.exports.createSession = (req, res, next) => {
  if ((Object.keys(req.cookies)).length === 0) {
    return models.Sessions.create()
      .then((result) => {
        var id = result.insertId;
        return models.Sessions.get({id});
      })
      .tap((queryResult) => {
        req.session = {};
        req.session = queryResult;
      })
      .tap((session) => {
        res.cookie('shortlyid', session.hash);
        next();
      });
  } else {
    var hash = req.cookies.shortlyid;
    return models.Sessions
      .get({hash})
      .then((hash) => {
        req.session = hash;
        res.cookie('shortlyid', hash);
        next();
      });
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

const parseCookies = (req, res, next) => {
  if ((Object.keys(req.headers)).length === 0) {
    req.cookies = req.headers;  
    next();
  } else {
    // parsing process:
    // 1. split into array by space
    // 2. separate key and cookie string by '='

    req.cookies = {};
    req.headers.cookie = req.headers.cookie || '';
    var incomingCookiesArr = req.headers.cookie.split('; ');
    
    incomingCookiesArr.forEach((cookie) => {
      var cookieArr = cookie.split('=');
      req.cookies[cookieArr[0]] = cookieArr[1];
    });
    next();
  }
};

module.exports = parseCookies;
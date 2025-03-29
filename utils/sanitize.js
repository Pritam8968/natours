const xss = require('xss');

const sanitizeObject = obj => {
  if (!obj || typeof obj !== 'object') return obj;
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object') {
      obj[key] = sanitizeObject(obj[key]); // Recursively sanitize nested objects
    } else if (typeof obj[key] === 'string') {
      obj[key] = xss(obj[key]); // Sanitize string input
    }
  });
  return obj;
};

const sanitizeInput = (req, res, next) => {
  req.body = sanitizeObject(req.body);
  req.query = sanitizeObject(req.query);
  req.params = sanitizeObject(req.params);
  next();
};

module.exports = sanitizeInput;

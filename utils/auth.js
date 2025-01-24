const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized user' });
  }

  jwt.verify(token, SECRET_KEY, (error, decodedUser) => {
    if (error) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    req.user = decodedUser;
    next();
  });
};

module.exports = authenticateToken;

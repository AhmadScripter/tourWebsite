const jwt = require('jsonwebtoken');

const adminAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: 'Access denied' });
    }
    req.user = {
      id: 'admin',
      email: decoded.email
    };
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = adminAuthMiddleware;
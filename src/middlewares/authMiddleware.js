const jwt = require('jsonwebtoken');

module.exports = (event) => {
  const authHeader = event.headers.authorization || event.headers.Authorization;
  
  if (!authHeader) {
    return { statusCode: 401, body: JSON.stringify({ message: 'Unauthorized' }) };
  }

  const token = authHeader.split(' ')[1];  // Extract token from "Bearer <token>"
  if (!token) {
    return { statusCode: 401, body: JSON.stringify({ message: 'Unauthorized' }) };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { isAuthenticated: true, user: decoded };
  } catch (error) {
    return { statusCode: 401, body: JSON.stringify({ message: 'Invalid token' }) };
  }
};

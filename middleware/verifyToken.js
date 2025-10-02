const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: decoded.id }; // 存 userId
    } catch (err) {
      console.log('Token 無效，當作訪客');
      req.user = null;
    }
  } else {
    req.user = null; // 沒有 token → 訪客
  }
  next();
};

module.exports = verifyToken;
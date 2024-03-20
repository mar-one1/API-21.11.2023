const jwt = require('jsonwebtoken');

// Secret key used to sign and verify tokens
const secretKey = '123456';

function verifyToken(req, res, next) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(403).json({ message: 'Authorization token not provided' });
  }

  const token = authToken.replace('Bearer ', '');

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      // Handle expired token
      if (err.name === 'TokenExpiredError') {
        const expiredDecoded = jwt.decode(token); // Decode without verification
        if (!expiredDecoded) {
          return res.status(400).json({ message: 'Token is invalid and cannot be refreshed' });
        }

        // Assume expiredDecoded contains the necessary information to issue a new token
        const newAccessToken = jwt.sign(
          { id: expiredDecoded.id, username: expiredDecoded.username },
          secretKey,
          { expiresIn: '1h' }
        );

        // Optionally attach the new token to the headers or directly to the request object
        req.headers.authorization = `Bearer ${newAccessToken}`;
        req.newAccessToken = newAccessToken; // For the endpoint to send back if needed
        // Set a flag to indicate token was refreshed
        req.tokenRefreshed = true;
        // Log or handle the new token as needed, then continue to the next middleware or route handler
        next();
      } else {
        // Handle other token verification errors
        return res.status(401).json({ message: 'Token is invalid' });
      }
    } else {
      // Token is valid, attach decoded user to request and proceed
      req.user = decoded;
      next();
    }
  });
}


module.exports = verifyToken;

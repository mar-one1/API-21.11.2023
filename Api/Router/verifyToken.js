const jwt = require("jsonwebtoken");

// Secret key used to sign and verify tokens
const secretKey = "123456";

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "Token not provided" });
  }

  // Verify the token
  jwt.verify(token.replace("Bearer ", ""), secretKey, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        // Token has expired, attempt to refresh it
        //const refreshToken = req.body.refreshToken;
        // Extract the refresh token from the "Authorization" header
        const refreshToken = token.replace("Bearer ", "");
        if (!refreshToken) {
          return res
            .status(401)
            .json({
              message: "Access token expired, no refresh token provided",
            });
        }

        jwt.verify(refreshToken, secretKey, (err, user) => {
          if (err) {
            return res
              .status(401)
              .json({ message: "Refresh token is invalid" });
          }

          // If the refresh token is valid, generate a new access token
          //const newAccessToken = generateAccessToken({ id: user.id, username: user.username });
          const newAccessToken = jwt.sign(
            {
              id: user.Id_user,
              username: user.username,
              firstname: user.Firstname_user,
              icon: user.Icon_user,
              birthday: user.Birthday_user,
              lastname: user.Lastname_user,
              email: user.Email_user,
              phoneNumber: user.Phonenumber_user,
              grade: user.Grade_user,
              status: user.Status_user,
              password: user.password,
            },
            secretKey,
            {
              expiresIn: "1h", // Token expiration time (adjust as needed)
            }
          );
          // Attach the new access token to the request
          req.newAccessToken = newAccessToken;

          // Continue processing the request with the new access token
          next();
        });
      } else {
        return res.status(401).json({ message: "Token authentication failed" });
      }
    } else {
      req.user = decoded; // Store the decoded user information in the request object
      next();
    }
  });
}

module.exports = verifyToken;

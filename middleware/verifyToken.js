const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  // console.log(req.headers);
  let authHeader = req.headers.authorization;

  if (authHeader) {
    authHeader = authHeader.split(" ")[1];
    // console.log(authHeader);
    await jwt.verify(authHeader, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        res.status(403).json("token is not valid");
        return;
      }
      req.user = user;

      console.log(req.user);

      next();
    });
    return;
  } else {
    res.status(401).json("You are not authenticated");
    return;
  }
};
module.exports = verifyToken;

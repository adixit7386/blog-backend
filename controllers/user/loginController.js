const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginController = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(500).json("user not found");
      return;
    } else {
      try {
        const isValid = await bcrypt.compare(req.body.password, user.password);
        if (!isValid) {
          res.status(500).json("incorrect password");
          return;
        }
        const { password, ...others } = user._doc;
        const accessToken = jwt.sign(
          { _id: user._id, isAdmin: false },
          process.env.SECRET_KEY,
          { expiresIn: "3y" }
        );

        res.json({ ...others, accessToken }).status(200);
        return;
      } catch (err) {
        console.log(err.message);
        res.status(500).json("err.message");
      }
    }
  } catch (err) {
    res.status(500).json("incorrect username or password");
    return;
  }
};

module.exports = loginController;

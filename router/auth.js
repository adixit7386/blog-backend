const express = require("express");
const loginController = require("../controllers/user/loginController");
const registerController = require("../controllers/user/registerController");

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);

module.exports = router;

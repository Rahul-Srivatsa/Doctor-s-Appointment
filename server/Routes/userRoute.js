const express = require("express");
const { userRegister, userLogin } = require("../Controllers/userController");

const router = express.Router();

router.post("/", userLogin);
router.post("/signup", userRegister);

module.exports = router;

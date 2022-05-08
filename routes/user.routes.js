const router = require("express").Router();
const { loginUser } = require("../controller/user.controller")

router.route("/login").post(loginUser)

module.exports = router;
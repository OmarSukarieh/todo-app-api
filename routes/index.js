const router = require("express").Router();

router.use("/api/todo", require("./todo.routes"));
router.use("/api/user", require("./user.routes"));

module.exports = router;
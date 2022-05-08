const router = require("express").Router();

router.use("/api/todo", require("./todo.routes"));

module.exports = router;
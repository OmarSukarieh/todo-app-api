const router = require("express").Router();
const { createTodo, updateTodo, getTodo, deleteTodo } = require("../controller/todo.controller")

router.route("/").post(createTodo)
router.route("/:id").get(getTodo).put(updateTodo).delete(deleteTodo)

module.exports = router;
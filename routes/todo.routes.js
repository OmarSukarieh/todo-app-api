const router = require("express").Router();
const { createTodo, updateTodo, getTodo, deleteTodo, getTodos } = require("../controller/todo.controller")

router.route("/").get(getTodos).post(createTodo)
router.route("/:id").get(getTodo).put(updateTodo).delete(deleteTodo)

module.exports = router;
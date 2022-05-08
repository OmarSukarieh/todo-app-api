const router = require("express").Router();

const { protect } = require('../middleware/auth')

const { createTodo, updateTodo, getTodo, deleteTodo, getAllTodos } = require("../controller/todo.controller")


router.route("/").get(protect, getAllTodos).post(protect, createTodo)
router.route("/:id").get(protect, getTodo).put(protect, updateTodo).delete(protect, deleteTodo)

module.exports = router;
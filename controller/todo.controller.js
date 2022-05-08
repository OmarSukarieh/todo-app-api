const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async.js");

const Todo = require("../model/Todo");
const User = require("../model/User");

exports.getAllTodos = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id.toString()).select('todo').populate('todo')

  res.json({
    success: true,
    data: user.todo
  })
})

exports.getTodo = asyncHandler(async (req, res, next) => {
  const { id: todoId } = req.params

  const todo = await Todo.findById(todoId)
  if (todo.user.toString() !== req.user.id.toString()) return next(new ErrorResponse(`Not authorize to access this todo`, 401))
  if (!todo) return next(new ErrorResponse(`Todo is not found`, 404))

  res.status(200).json({
    success: true,
    data: todo,
  });
});

exports.createTodo = asyncHandler(async (req, res, next) => {
  const { todo: todoBody } = req.body

  // find user
  const user = await User.findById(req.user._id)
  if (!user) return next(new ErrorResponse(`User is not found`, 404))

  const todo = await Todo.create({
    todo: todoBody,
    user: req.user._id,
  });

  await User.findByIdAndUpdate(req.user._id, {
    $push: { todo: todo._id },
  });

  res.status(201).json({
    success: true,
    data: todo,
  });
})

exports.updateTodo = asyncHandler(async (req, res, next) => {
  const { id: todoId } = req.params;
  const { todoMessage } = req.body

  const todo = await Todo.findOneAndUpdate({
    _id: todoId,
    user: req.user.id.toString()
  }, {
    todo: todoMessage,
  });
  if (!todo) return next(new ErrorResponse(`Todo is not exists`, 404))

  res.status(200).json({
    success: true,
  });
})

exports.deleteTodo = asyncHandler(async (req, res, next) => {
  const { id: todoId } = req.params;

  const userId = req.user.id.toString();

  const todo = await Todo.findByIdAndDelete({
    _id: todoId,
    user: userId
  });
  if (!todo) return next(new ErrorResponse(`Todo is not found`, 404))

  await User.findByIdAndUpdate(userId, {
    $pull: { todo: todoId }
  })

  res.status(200).json({
    success: true,
  })
})
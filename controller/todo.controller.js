const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async.js");

const Todo = require("../model/Todo");
const User = require("../model/User");

exports.getTodo = asyncHandler(async (req, res, next) => {
  const { id: todoId } = req.params

  const todo = await Todo.findById(todoId)
  if (!todo) return next(new ErrorResponse(`Todo is not found`, 404))

  res.status(200).json({
    success: true,
    data: todo,
  });
});

exports.createTodo = asyncHandler(async (req, res, next) => {
  const { userId } = req.query

  // find user
  const user = await User.findById(userId)
  if (!user) return next(new ErrorResponse(`User is not found`, 404))

  const todo = await Todo.create(req.body);

  await User.update({
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

  const todo = await Todo.findByIdAndUpdate(todoId, {
    todo: todoMessage,
  });
  if (!todo) return next(new ErrorResponse(`todo id is not exists`, 404))

  res.status(200).json({
    success: true,
  });
})

exports.deleteTodo = asyncHandler(async (req, res, next) => {
  const { id: todoId } = req.params;
  const { userId } = req.query

  const userExists = await User.findById(userId)
  if (!userExists) return next(new ErrorResponse(`User is not exits`, 404))

  const todo = await Todo.findByIdAndDelete(todoId);
  if (!todo) return next(new ErrorResponse(`Todo is not found`, 404))

  await User.findByIdAndUpdate(userId, {
    $pull: { todo: todoId }
  })

  res.status(200).json({
    success: true,
  })
})
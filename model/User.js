const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    maxLength: 50,
    requiredL: true,
  },
  last_name: {
    type: String,
    maxLength: 50,
    requiredL: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  todo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Todo",
  }],
});

module.exports = mongoose.model("User", UserSchema);

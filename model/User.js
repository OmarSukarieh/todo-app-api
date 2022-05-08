const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { jwtSecret, jwtExpire } = require('../config')

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
  username: {
    type: String,
    unique: true,
    maxLength: 20,
    required: true,
  },
  password: {
    type: String,
    maxLength: 255,
    select: false,
    minlenght: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  todo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Todo",
    required: true
  }],
});

//Encypt password using Bycrpt
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

///Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, jwtSecret, {
    expiresIn: jwtExpire,
  });
};

//Match User Entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);

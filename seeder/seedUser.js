const User = require("../model/User");
const mongoose = require("mongoose");
const configApp = require("../config");


//create your array. i inserted only 1 object here
const users = [
  new User({
    first_name: "Omar",
    last_name: "Sukarieh"
  }),]


//connect mongoose
mongoose
  .connect(configApp.databaseUrl, { useNewUrlParser: true })
  .catch(err => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(() => {
    console.log("connected to db in development environment");
  });

users.map(async (user, index) => {
  await user.save((err, result) => {
    if (index === users.length - 1) {
      console.log("DONE!");
      mongoose.disconnect();
    }
  });
});
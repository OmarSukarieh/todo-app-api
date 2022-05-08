const express = require("express");
const mongoose = require('mongoose');
const colors = require('colors');

const errorHandler = require("./middleware/error");
const configApp = require('./config')

const router = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router)
app.use(errorHandler);

app.listen(configApp.port, async () => {
  console.log(`SERVER RUNNING ON PORT = ${configApp.port}`.bgYellow);
  const conn = await mongoose.connect(configApp.databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
});
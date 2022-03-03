"use strict";

var _user = _interopRequireDefault(require("./schema/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

let app = express();
app.use(cors({
  origin: 'http://localhost:3000'
})); // app.use(bodyParser.json());

app.use(bodyParser.json({
  limit: "100mb",
  extended: true
}));
app.use(bodyParser.urlencoded({
  limit: "100mb",
  extended: true
})); // connect mongoose to mongodb

mongoose.connect("mongodb://localhost/byjus", {
  // useCreateIndex :true,
  useNewUrlParser: true
}); // listening to 7000

app.listen(7000, function () {
  console.log("listening to port : 7000");
});
app.get("/all-users", async (req, res) => {
  const users = await _user.default.find({
    isDeleted: false
  });
  return res.json({
    success: true,
    users: users
  });
});
app.post("/create-user", async (req, res) => {
  const userData = req.body;
  let x;

  try {
    x = await _user.default.create(userData);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to create user"
    });
  }

  return res.json({
    success: true,
    user: x
  });
});
app.delete("/remove-user/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    await _user.default.deleteOne({
      _id: userId
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to remove user"
    });
  }

  return res.json({
    success: true,
    userId: userId
  });
});
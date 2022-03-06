// import User from "./schema/user";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// const mongoose = require("mongoose");

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new Schema({
	name:String,
	email:{type:String,unique:true},
	address : String,
    joiningDate: String,
    isDeleted: {type: Boolean, default:false}
});

const User = mongoose.model('user',user);

let app = express();
app.use(cors({ origin: 'https://byjus-frontend-manish.herokuapp.com'}));
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

// connect mongoose to mongodb
mongoose.connect("mongodb+srv://manish:manish123@cluster0.3ucdb.mongodb.net/byjus?retryWrites=true&w=majority", {
  useNewUrlParser: true,
});

// listening to 7000
app.listen(process.env.PORT || 7000, function () {
  console.log("listening to port : 7000");
});

app.get("/all-users", async (req, res) => {
  const users = await User.find({ isDeleted: false });

  return res.json({
    success: true,
    users: users,
  });
});

app.post("/create-user", async (req, res) => {
  const userData = req.body;
  let x;
  try {
     x = await User.create(userData);
    
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to create user" });
  }

  return res.json({
    success: true,
    user: x,
  });
});

app.delete("/remove-user/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    await User.deleteOne({ _id: userId });
    
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to remove user" });
  }

  return res.json({
    success: true,
    userId: userId,
  });
});

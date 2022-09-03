const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const User = require("./model");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log("server is at " + PORT);
});

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome" });
});

app.get("/login", async (req, res) => {
  const email = req.query.email;
  const user = await User.findOne({ email });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ msg: "User not Found" });
  }
});

app.post("/signup", (req, res) => {
  const { fname, lname, age, email, password1 } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User Already Exist" });
    } else {
      const user = new User({
        firstName: fname,
        lastName: lname,
        age: age,
        email: email,
        password: password1,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully registered,Please login now " });
        }
      });
    }
  });
});

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

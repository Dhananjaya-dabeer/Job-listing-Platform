const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./User");

const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("go to /health to confirm the server is working");
});

app.get("/health", (req, res) => {
  res.send({ message: "Server is up and running" });
});

let signUp = async (req, res) => {
  try {
    let { Name, Email, Mobile, Password } = req.body;

    const duplicateVerification = await User.findOne({ Email });
    //  console.log(duplicateVerification)
    if (duplicateVerification) {
      return res.status(500).json({
        status: "Failed to create",
        message: "Mail id is alredy used",
      });
    }

    let salt = await bcrypt.genSalt(10);
    let encryptedPassword = await bcrypt.hash(Password, salt);
    const userDetails = { Name, Email, Mobile, Password: encryptedPassword };
    await User.create(userDetails);

    const token = jwt.sign(userDetails, process.env.JWT_SECRET, {
      expiresIn: 120,
    });

    res.json({
      status: "Suucees",
      message: "User created Successfully",
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    let user = await User.findOne({ Email });

    if (!user) {
      return res.json({
        status: "Failed",
        message: "email is wrong",
      });
    }

    const passwordMatched = await bcrypt.compare(Password, user.Password);

    if (!passwordMatched) {
      return res.json({
        status: "Failed",
        message: " Password is wrong!",
      });
    }
    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
      expiresIn: 120,
    });
    res.json({
      status: "Success",
      message: `Welcome ${user.Name}`,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      message: "User doesn't exist",
    });
  }
};

app.post("/SignUp", signUp);

app.post("/signIn", signIn);
let PORT = process.env.PORT;
let connect = mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log(`server running on ${PORT}`);
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  connect;
});

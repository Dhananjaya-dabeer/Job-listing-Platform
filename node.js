const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/now", (req, res) => {
  res.send({ message: "All Good" });
});

let PORT = process.env.PORT;
let connect = mongoose
                        .connect(process.env.MONGODB_URL)
                        .then(() => {
                            console.log(`server running on ${PORT}`)
                        })
                        .catch((error) => {console.log(error)})
app.listen(PORT, () => {
  connect
});

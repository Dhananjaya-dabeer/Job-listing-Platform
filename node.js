const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const User = require('./User')



const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.get('/', (req,res) => {
    res.status(200).send('go to /health to confirm the server is working')
})

app.get("/health", (req, res) => {
  res.send({ message: "Server is up and running" });
});

let getUser = async(req,res) => {
    try{
      let user = await User.find()
      console.log(user)
      res.json({
        status : 'success',
        data : user
      })
    }
    catch(err){
      res.status(500).json({
        status : 'Failed',
        message : err.message
      })
    }
}

  let postFunction = async(req,res) => {
    try{
      console.log(req.body)
      let {Name, Email, Mobile } = req.body;
      await User.create({Name,Email,Mobile});
      res.json({
        status: 'Suucees',
        message: 'User created Successfully'
      })
    }
    catch(err){
      res.status(500).json({
        status: 'Failed',
        message : err.message
      })
    }

  }
  app.post('/', postFunction)

  app.get('/user', getUser)
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

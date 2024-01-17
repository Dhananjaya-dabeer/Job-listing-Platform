const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./User");
const cors = require('cors')
const JD = require('./Job_description')
const editJob = require('./editjob')
const jobs = require('./jobs')
const app = express();
dotenv.config({
  path : __dirname + '/.env'
});
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.status(200).send("go to /health to confirm the server is working");
});

app.get("/health", (req, res) => {
  res.send({ message: "Server is up and running" });
});

// app.get('/users',verifyToken,async(req,res) => {
  
//   try{
//     res.json({
//       data: await User.find()
//     })
//   }
//   catch(err){
//     res.json({
//       message : err.message
//     })
//   }
 
// })

// ************JWT_Token middleware*************
  function verifyToken (req,res,next) {
    let token = req.headers.authorization
    

    if(!token){
      return res.status(401).json({status : 'You are not Autorized' })
    }

    try{
      const verifiedToken = jwt.verify(token,process.env.JWT_SECRET)
      req.userToken = verifiedToken
      next()  
    }
    catch(err){
      return res.status(401).json({status : 'token expired or Invalid'})
    }

  }

  // ***********signUp*********
let signUp = async (req, res) => {
  try {
    let { Name, Email, Mobile, Password } = req.body;

    const duplicateVerification = await User.findOne({ Email });
    //  console.log(duplicateVerification)
    if (duplicateVerification) {
      return res.status(500).json({
        status: "Failed to create",
        message: "Email id is alredy used"
      });
    }

    let salt = await bcrypt.genSalt(10);
    let encryptedPassword = await bcrypt.hash(Password, salt);
    const userDetails = { Name, Email, Mobile, Password: encryptedPassword };
    
    // if(!emptyDetails){
    //   res.json({message: 'All fields are required'})
    //   console.log('error triggord')
    // }

    await User.create(userDetails);

    const token = jwt.sign(userDetails, process.env.JWT_SECRET, {
      expiresIn: 1000000
    });
     
    res.json({
      status: "Suucees",
      message: "User created Successfully. Please SignIn to proceed",
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

// *********signIn***********
const signIn = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    let user = await User.findOne({ Email });

    if (!user) {
      return res.status(400).json({
        status: "Failed",
        message: "You are not Registered please SignUp ",
      });
    }

    const passwordMatched = await bcrypt.compare(Password, user.Password);

    if (!passwordMatched) {
      return res.json({
        status: "Failed",
        message: "Either Email or Password is wrong!",
      });
    }
    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
      expiresIn: Infinity,
    });
    res.json({
      status: "Success",
      message: `Hello! ${user.Name}`,
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

const addJob = async(req,res) => {

  try{
    const {
      companyName,
      logoURL,
      jobposition,
      monthlysalary,
      jobtype,
      remoteOffice,
      location,
      jobDescription,
      aboutCompany,
      skillRequired,
      information} = req.body
    const jobDetails = {
      companyName,
      logoURL,
      jobposition,
      monthlysalary,
      jobtype,
      remoteOffice,
      location,
      jobDescription,
      aboutCompany,
      skillRequired,
      information}
await JD.create(jobDetails)
res.json({
  status : 'Success',
  message : 'Job added Succesfully'
})
  }
  catch(err){
    console.log(err)
  }
  
}

app.post("/SignUp", signUp);

app.post("/signIn", signIn);

app.post('/Add-Job',verifyToken, addJob);

app.get('/edit-job/:_id',editJob )
      
app.get('/jobs', jobs)

app.use((req,res,next) => {
  const error = new Error("Not Found")
  error.status = 404
  next(error)
})


// error handler
app.use((error,req,res,next) => {
  res.status(error.status || 500)
  res.send({
    status : error.status || 500,
    message : error.message
  })
})
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

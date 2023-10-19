const mongoose = require('mongoose')


const Job = new mongoose.Schema({
    companyName : {
        type : String,
        required : true
    } ,

    logoURL : {
        type: String,

    },

    jobposition : {
        type : String,
        required : true
    },

    monthlysalary : {
        type : Number,
        required : true
    },

    jobtype : {
        type : String,
        required : true
    },

    remoteOffice : {
        type : String,
        required : true
    },

    location : {
        type : String,
        require : true
    },

    jobDescription : {
        type : String,
        required : true
    },

    aboutCompany :{
        type : String,
        required : true
    },
    skillRequired : {
        type : String,
        required : true
    },
    information : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('JD',Job)

// const express = require("express");
// const router = express.Router();

// router.post("/job-post", async (req, res) => {
//   try {
//     const jobPost = new JobPost({
//       companyName,
//       logoURL,
//       jobposition,
//       monthlysalary,
//       jobtype,
//       remoteOffice,
//       location,
//       description,
//       aboutCompany,
//       skillRequired,
//       information,
//     });

//     await jobPost.save();
//     res.json({ message: "Job post created successfully" });
//   } catch (error) {
//     console.log(error);
//   }
// });

const mongoose = require('mongoose')
const JD = require('./Job_description')
const editJob = async(req,res) => {
    try{

        const resourceId = req.params._id
        // const updatedData = req.body
    
        const existingJobDetails = await JD.findById(resourceId)
        if(existingJobDetails) {
            JD.updateOne({resourceId}, {})
        }
        console.log(existingJobDetails)
    }
catch(err){
    res.json({message: err})
}
}   

module.exports = editJob


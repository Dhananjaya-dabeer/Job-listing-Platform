const mongoose = require('mongoose')
const JD = require ('./Job_description')
const jobListing = async(req,res) => {
    try{

        // const jobs = JD.find({},{companyName:0, jobposition:1, monthlysalary:1, jobtype:1, remoteOffice:1,})
        const jobs = await JD.find()
        const filteredJobs = jobs.map( job => ({
              jobposition : job.jobposition,
             monthlysalary : job.monthlysalary,
             jobtype : job.jobtype,
             remoteOffice : job.remoteOffice,
             location : job.location,
             skills : job.skillRequired,
             remoteoffice : job.remoteOffice
            }));
        // console.log(filteredJobs)

        res.json({
            data : filteredJobs,
            jobDetails : jobs
        })
      
    }
    catch(err){
        res.json({
            message: 'failed',
            data : err
        })
    }
}

module.exports = jobListing
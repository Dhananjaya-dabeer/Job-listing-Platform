const mongoose = require('mongoose')
const JD = require ('./Job_description')

const jobListing = async (req, res) => {
  try {
    // Initialize an empty query object
    let query = {};

    // Check if the 'search' query parameter is provided
    if (req.query.search) {
      // Use a regular expression to perform a case-insensitive search on the 'jobposition' field
      query.jobposition = { $regex: new RegExp(req.query.search, 'i') };
    }

    // Fetch job listings that match the query
    const jobDetails = await JD.find(query);
   
    // If no search query is provided, return all job listings
    if (!req.query.search) {
      const jobs = await JD.find();
      const filteredJobs = jobs.map(job => ({
        jobposition: job.jobposition,
        monthlysalary: job.monthlysalary,
        jobtype: job.jobtype,
        remoteOffice: job.remoteOffice,
        location: job.location,
        skills: job.skillRequired,
        jobDescription: job.jobDescription,
        CompanyName : job.companyName,
        aboutCompany : job.aboutCompany,
        information : job.information
      }));
      res.json({
        data: filteredJobs
      });
    } else {
      // Return the filtered job listings based on the search query
      res.json({
        data: jobDetails
      });
    }
  } catch (err) {
    res.json({
      message: 'failed',
      data: err
    });
  }
}

module.exports = jobListing;

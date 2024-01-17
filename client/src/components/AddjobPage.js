import React, { useState } from "react";
import css from "./Addjob.module.css";
import image from "../images/addJobImage.svg";
import { Link } from 'react-router-dom'
import axios from "axios";
import { getItemFromLocalStorage } from "../utils";
function AddjobPage() {
    const [successMsg, setSuccessMsg] = useState("")
    const [jobData, setJobData] = useState({
        companyName: '',
        logoURL: '',
        jobposition: '',
        monthlysalary: '',
        jobtype: '',
        remoteOffice: '',
        location: '',
        jobDescription: '',
        aboutCompany: '',
        skillRequired: '',
        information: ''
    })
    const addJobHandler = async (e) => {
       
        if(jobData.companyName && jobData.logoURL && jobData.jobDescription && jobData.monthlysalary && jobData.jobtype &&
            jobData.remoteOffice && jobData.location && jobData.jobDescription && jobData.aboutCompany && jobData.skillRequired &&
            jobData.information
            ){
             
         let response =   await axios.post('https://job-listing-platform-gtms.onrender.com/Add-Job',jobData,{
            headers: {
              Authorization: `${getItemFromLocalStorage('user-token')}`,
            },
          })
                try {
                    window.alert(response.data.message)
                } catch (error) {
                    console.log(error)
                }
            }
        else{
            e.preventDefault()
                window.alert('All fields are required!')
        }

       
    }



    return (
        <div className={css.container}>
            <div className={css.leftcomponent}>
                <div className={css.header}>
                    <h1>Add job description</h1>
                </div>
                <div className={css.form}>
                    <div className={css.formTemplate}>
                        <label htmlFor="companyname">Company Name </label>
                        <input id="companyname" type="text" placeholder="Enter your company name here" onChange={(e) => setJobData({ ...jobData, companyName: e.target.value.trim() })} />
                    </div>
                    <div className={css.formTemplate}>
                        <label htmlFor="logo">Add logo URL </label>
                        <input id="logo" type="text" placeholder="Enter the link" onChange={(e) => setJobData({...jobData, logoURL : e.target.value.trim()})} />
                    </div>
                    <div className={css.formTemplate}>
                        <label htmlFor="jobposition">Job position </label>
                        <input id="jobposition" type="text" placeholder="Enter job position" onChange={(e) => setJobData({...jobData,jobposition : e.target.value.trim()})}/>
                    </div>
                    <div className={css.formTemplate}>
                        <label htmlFor="salary">Monthly salary </label>
                        <input id="salary" type="text" placeholder="Enter Amount in rupees" onChange={(e) => setJobData({...jobData, monthlysalary : e.target.value.trim()})} />
                    </div>
                    <div className={css.jobtype}>
                        <label htmlFor="Job Type">Job Type </label>
                        <select name="" id="Job Type" onChange={(e) => setJobData({...jobData, jobtype : e.target.value})}>

                            <option value="">Select</option>
                            <option value="Internship">Internship</option>
                            <option value="Full Time">Full Time</option>
                        </select>
                    </div>
                    <div className={css.selectremote_office}>
                        <label htmlFor="Remote/office">Remote/office </label>
                        <select name="" id="Remote/office" onChange={(e) => setJobData({...jobData, remoteOffice : e.target.value})}>
                            <option value="">Select</option>
                            <option value="Remote">Remote</option>
                            <option value="Office">Office</option>
                        </select>
                    </div>
                    <div className={css.formTemplate}>
                        <label htmlFor="location">Location </label>
                        <input id="location" type="text" placeholder="Enter Location" onChange = {(e) => setJobData({...jobData, location : e.target.value.trim()})}/>
                    </div>
                    <div className={css.formTemplate}>
                        <label htmlFor="JD">Job Description </label>
                        <textarea id="JD" type="text" placeholder="Type the job description" onChange={(e) => setJobData({...jobData,jobDescription : e.target.value.trim()})}/>
                    </div>
                    <div className={css.formTemplate}>
                        <label htmlFor="about">About Company </label>
                        <textarea id="about" type="text" placeholder="Type about your company" onChange={(e) => setJobData({...jobData, aboutCompany : e.target.value.trim()})} />

                    </div>
                    <div className={css.formTemplate}>
                        <label htmlFor="skills">Skills Required </label>
                        <input id="skills" type="text" placeholder="Enter the skills comma seperated" onChange={(e) => setJobData({...jobData, skillRequired : e.target.value.trim()})} />

                    </div>
                    <div className={css.formTemplate}>
                        <label htmlFor="about">Information </label>
                        <input id="about" type="text" placeholder="Enter additional information" onChange={(e) => setJobData({...jobData, information : e.target.value.trim()})} />

                    </div>

                </div>
                <div className={css.cancel_addjob}>
                    <div className={css.cancel}>
                        <button>
                            <Link to={'/homepage'}>Cancel</Link>
                        </button>
                    </div>
                    <div className={css.addjob}>
                        <button>
                            <Link to={'/homepage'} onClick={addJobHandler}>+ Add Job</Link>
                        </button>
                    </div>
                </div>
            </div>
            <div className={css.rightcomponent}>
                <div className={css.imageheader}>
                    <p>Recruiter add job details here</p>
                </div>
                <div className={css.imgholder}>
                    <img src={image} alt="" />
                </div>
            </div>
        </div>
    );
}

export default AddjobPage;

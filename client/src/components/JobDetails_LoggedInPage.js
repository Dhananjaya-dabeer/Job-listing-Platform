import React, { useState, useContext, useEffect } from "react";
import { jobdetails } from "../Contexts/jobContext";
import JD from "./JobDetails_loggedInPage.module.css";
import navImage from "../images/Outer rectangle.png";
import { Link } from "react-router-dom";
import suitCase from "../images/Suitcase.svg";
import { clearLocalStorage, getItemFromLocalStorage } from "../utils";
function JobDetailsPage() {
  let { jobDetails } = useContext(jobdetails);
  const [workFromHome, setWorkFromHome] = useState("");
  let job_details = { ...jobDetails };
  // console.log(job_details)
  
  useEffect(() => {
    if (job_details.remoteofice === "remote") {
      setWorkFromHome("work from home");
    } else {
      setWorkFromHome(job_details.remoteOffice);
    }
  }, [job_details]);

  if (!jobDetails) {
    return <h1>Please return to HomePage</h1>;
  }
  // console.log(job_details);
  let jobPoition = job_details.jobposition;
  let companyName = job_details.CompanyName;
  let jobType = job_details.jobtype;
  let location = job_details.location;
  let aboutCompany = job_details.aboutCompany;
  let jobDescription = job_details.jobDescription;
  let skillsRequired = job_details.skills;
  let salary = job_details.monthlysalary;
  let additionalInfo = job_details.information;
  let arrayOfSkills = skillsRequired.split(",");
  
  const logOutHandler = () => {
    clearLocalStorage()
  }

 
  return (
    <div className={JD.jd_page}>
      <div className={JD.nav}>
        <div className={JD.nav_img}>
          <img src={navImage} alt="" />
        </div>
        <div className={JD.innercontent}>
          <div className={JD.jobfinder}>
            <h2>Jobfinder</h2>
          </div>
          <div className={JD.button}>
            <button id={JD.login} onClick={logOutHandler}>
              {" "}
              <Link to={"/signin"}>Logout</Link>
            </button>
            <p>{getItemFromLocalStorage('userName')}</p>
          </div>
        </div>
      </div>
      <div className={JD.nav_header}>
        <p id={JD.header}>
          {jobPoition} {jobType} {workFromHome} Job at {companyName}{" "}
        </p>
      </div>

      <div className={JD.job_details}>
        <div className={JD.jobtype}>
          <p id={JD.jobtype}>{jobType}</p>
          <h1>{jobPoition}</h1>
          <p id={JD.location}>{location} | India</p>
          <div className={JD.stipend_duration}>
            <div className={JD.stipend}>
              <p id={JD.stipend}>&#128181; Stipend/Salary </p>
              <p id={JD.salary}>Rs {salary}/month</p>
            </div>
            <div className={JD.duration}>
              <div className={JD.duration_header}>
                <img src={suitCase} alt="" />
                <p> Duration</p>
              </div>
              <p>Not Disclosed</p>
            </div>
          </div>
          <div className={JD.aboutcompany}>
            <p id={JD.aboutcompany}>About company</p>
            <br />
            <p id={JD.aboutCompany_innrcontnt}>{aboutCompany}</p>
          </div>
          <div className={JD.jobdescription}>
            <h4>About the job/internship</h4>
            <p>{jobDescription}</p>
          </div>
          <div className={JD.skillsrequired}>
            <h4>Skill(s) required</h4>
            <p>
              {arrayOfSkills.map((item, index) => (
                <span key={index}>{item}</span>
              ))}
            </p>
          </div>
          <div className={JD.additionalInfo}>
            <h4>Additional Information</h4>
            <p>{additionalInfo}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetailsPage;

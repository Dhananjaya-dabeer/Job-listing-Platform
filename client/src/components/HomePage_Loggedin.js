import React, { useEffect, useContext } from "react";
import { jobdetails } from "../Contexts/jobContext";
import outerRect from "../images/Outer rectangle.png";
import Home from "./HomePage_Loggedin.module.css";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { clearLocalStorage, getItemFromLocalStorage } from "../utils";
import { name } from "../Contexts/recruiter";
function HomePage_Loggedin() {
  const [skills, setSkills] = useState([]);
  const [jobBrief, setJobBrief] = useState([]);
  const [dbSkills, setdbSkills] = useState([]);
  const {setJobDetails} = useContext(jobdetails);
 
  let skillsHandler = (event) => {
    let skill = event.target.value;

    if (skill === "skills") return;
    for (let element of skills) {
      if (element === skill) return;
    }
    setSkills([...skills, skill]);
  };

  let removeSkills = (index) => {
    let updatedSkill = skills.filter((_, i) => i !== index);
    setSkills(updatedSkill);
  };

  useEffect(() => {
    axios
      .get("https://job-listing-platform-gtms.onrender.com/jobs")
      .then((res) => {
        let resdata = res.data.data;
        setJobBrief(resdata);
        let arrayOfSplittedArray = [];
        for (let element of resdata) {
          for (let prop in element) {
            if (prop === "skills") {
              let splitedArray = element[prop].split(",");
              arrayOfSplittedArray.push(splitedArray);
              // setdbSkills([...dbSkills,splitedArray])
              setdbSkills(arrayOfSplittedArray);
            }
          }
        }

      })
      .catch((err) => console.log(err));
  }, []);

  const jobDetails = async(index) => {
  let responseInstance =  await axios.get('https://job-listing-platform-gtms.onrender.com/jobs')
  try {
    setJobDetails(responseInstance.data.data[index])
    
  } catch (error) {
    console.log(error)
  }
  }

  const logOutHandler = () => {
    clearLocalStorage()
  }
  
 console.log(jobBrief)
  return (
    <div className={Home.home}>
      <div className={Home.nav}>
        <div className={Home.image}>
          <img id={Home.outer} src={outerRect} alt="" />
        </div>
        <div className={Home.innercontent}>
          <div className={Home.jobfinder}>
            <h2>Jobfinder</h2>
          </div>
          <div className={Home.button}>
            <button id={Home.logout}>
              {" "}
              <Link to={"/"} onClick={logOutHandler}>Logout</Link>
            </button>
            <p>{getItemFromLocalStorage('userName')}</p>
          </div>
        </div>
      </div>
      <div className={Home.searchbarcontainer}>
        <div className={Home.searchbar}>
          <img id={Home.searchicon}></img>
          <input
            type="search"
            id={Home.input}
            placeholder="Type any job title "
          />
        </div>
        <div className={Home.select}>
          {/* <select name="skills" id={Home.skills} onChange={skillsHandler}>
            <option value="skills" selected>
              Skills
            </option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Frontend">Frontend</option>
            <option value="WordPress">WordPress</option>
          </select> */}
          {/* <div className={Home.popskills}>
            {skills.map((item, index) => (
              <div className={Home.renderskill}>
                <li className={Home.skill_list} key={index}>
                  {item}
                </li>
                <span onClick={() => removeSkills(index)}>&#10005;</span>
              </div>
            ))}
          </div> */}
          <div className={Home.addjob}>
            <button>
              <Link to={'/addjob'}>+ Add Job</Link>
            </button>
          </div>
        </div>
      </div>

      <div className={Home.job_list}>
        <div className={Home.individual_job}>
          {jobBrief.length > 0 ? (
            jobBrief.map((item, index) => (
              <div key={index} className={Home.jobs}>
                <div className={Home.leftjobs}>
                  <span id={Home.jobpstn}>{item.jobposition}</span>
                  <div className={Home.sal_loc}>
                    <span id={Home.monthlySal}>
                      &#8377; {item.monthlysalary}
                    </span>
                    <span id={Home.location}>
                      {" "}
                      &#127470;&#127475; {item.location}
                    </span>
                  </div>
                  <div className={Home.type_remoOffice}>
                    <span id={Home.remoteoffice}>{item.remoteOffice}</span>
                    <span id={Home.jobtype}>{item.jobtype}</span>
                  </div>
                </div>
                <div className={Home.rightjobs}>
                  <div className={Home.skills_JD}>
                    <span className={Home.jbskills}>
                      {dbSkills[index].map((skillsArray, i) => (
                        <div key={i}>
                          {Array.isArray(skillsArray) ? (
                            skillsArray.map((skill, j) => (
                              <span key={j}>{skill}</span>
                            ))
                          ) : (
                            <span>{skillsArray}</span>
                          )}
                        </div>
                      ))}
                    </span>
                    <div className={Home.viewdetails_btn}>
                      <Link to={'/signin/jobdetails'}><button onClick={ () => jobDetails(index)}>View details</button></Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p id={Home.loading_msg}>Loading..........</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default HomePage_Loggedin;

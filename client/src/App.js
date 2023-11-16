import "./App.css";
import SignUpPage from "./components/SignUpPge";
import SignInPage from "./components/SignInPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import JobDetailsPage from "./components/JobDetailsPage";
import { jobdetails } from "./Contexts/jobContext";
import { useEffect, useState } from "react";
import { getItemFromLocalStorage } from "./utils";
import JobDetails_LoggedInPage from "./components/JobDetails_LoggedInPage";
import HomePage_Loggedin from "./components/HomePage_Loggedin";
import { name } from "./Contexts/recruiter";
import AddjobPage from "./components/AddjobPage.js";
function App() {
  const [jobDetails,setJobDetails] = useState();
  const [userName,setUserName] = useState()
  const appRoutes = [
    {
      path : '/',
      element : <HomePage/>
    },
    {
      path : '/signup',
      element : <SignUpPage/>
    },
    {
      path : '/signin',
      element : <SignInPage/>
    },
    {
      path : '/jobdetails',
      element : <JobDetailsPage/>
    },
    {
      path : '/signin/jobdetails',
      element : <JobDetails_LoggedInPage/>
    },
    {
      path : '/homepage',
      element : <HomePage_Loggedin/>
    },
    {
      path : '/addjob',
      element : <AddjobPage/>
    }
  ];


  return (
    <BrowserRouter>
      <div className="App">
          <jobdetails.Provider value={{jobDetails,setJobDetails}}>
        <Routes>
          {
            appRoutes.map(route => {
              return  <Route element={route.element} path={route.path}/>
            })
          }
        </Routes>
          </jobdetails.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import SignUpPage from "./components/SignUpPge";
import SignInPage from "./components/SignInPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import JobDetailsPage from "./components/JobDetailsPage";
import { jobdetails } from "./Contexts/jobContext";
import { useState } from "react";
function App() {
  const [jobDetails,setJobDetails] = useState()
  return (
    <BrowserRouter>
      <div className="App">
          <jobdetails.Provider value={{jobDetails,setJobDetails}}>
        <Routes>
          <Route path="/" element = {<HomePage/>} > </Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/signin" element={<SignInPage />}></Route>
          <Route path="/jobdetails" element={<JobDetailsPage/>}></Route>
        </Routes>
          </jobdetails.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;

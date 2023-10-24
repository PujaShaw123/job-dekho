import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import React, { useState } from "react";
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import CareerLayout from "./layouts/CareerLayout";
import Careers from "./pages/careers/Careers";
import JobDetails from "./pages/careers/JobDetails";
import AppliedJobs from "./pages/careers/AppliedJobs";
import Logout from "./pages/Logout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const updateLoginState = (loggedIn) => {
    setIsLoggedIn(loggedIn);
  };

  const updateUserEmail = (email) => {
    setUserEmail(email);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout isLoggedIn={isLoggedIn} />}>
          <Route path="/" element={<CareerLayout />}>
            <Route index element={<Careers />} />
            <Route
              path=":id"
              element={
                <JobDetails checkLogin={isLoggedIn} userEmail={userEmail} />
              }
            />
          </Route>
          <Route
            path="login"
            element={
              <Login onLogin={updateLoginState} handleUser={updateUserEmail} />
            }
          />
          <Route path="signup" element={<Signup />} />
          <Route
            path="applied"
            element={<AppliedJobs userEmail={userEmail} />}
          />
          <Route
            path="logout"
            element={<Logout onLogout={updateLoginState} />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

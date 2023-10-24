import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
function RootLayout(isLoggedIn) {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1 className="logoh">Job Dekho</h1>
          <NavLink to="/">Jobs</NavLink>
          {isLoggedIn.isLoggedIn ? (
            <>
              <NavLink to="applied">Applied Jobs</NavLink>
              <NavLink to="logout">Logout</NavLink>
            </>
          ) : (
            <>
              <NavLink to="login">Login</NavLink>
              <NavLink to="signup">Signup</NavLink>
            </>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;

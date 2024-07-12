import React from "react";
import { Link } from "react-router-dom";
import { getToken, removeToken } from "../../utils/HandleToken";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>
        Crime <span>Scoop</span>
      </h1>
      <div className="navbar-content">
        <Link className="navbar-link" to="/">
          Home
        </Link>
        <Link className="navbar-link" to="/authorities">
          Authorities
        </Link>
        <Link className="navbar-link" to="/resources">
          Crime Prevention
        </Link>
        {getToken() ? (
          <>
            <Link className="navbar-link" to="/search-history">
              Search History
            </Link>
            <Link
              className="navbar-link"
              to="/logout"
              onClick={() => {
                removeToken();
                window.location.href = "/";
              }}
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link className="navbar-link" to="/login">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const login = useSelector((state) => state.login.login);
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          OnlineVegetableSales
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/home">
                Home
              </NavLink>
            </li>

          </ul>
          <ul className="navbar-nav ms-auto">
            {login.loginStatus ==="LoggedIn" ? (
              <li className="nav-item">
                <NavLink to="/logout" className="nav-link">
                  Logout
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
            )}
            {login.loginStatus === "LoggedIn" && (
              <li className="nav-item">
                <NavLink to="/profile" className="nav-link">
                  Profile
                </NavLink>
              </li>
            )}
            {login.loginStatus !=="LoggedIn" &&(
            <li className="nav-item">
              <NavLink to="/register" className="nav-link">
                Sign Up
              </NavLink>
            </li>
)}
            {login.loginStatus === "LoggedIn" && (
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link">
                <i className="bi bi-cart"></i>
              </NavLink>
            </li>
)}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
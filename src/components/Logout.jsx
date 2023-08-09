import React, { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { logoutAction } from "../actions/LoginActions";
import { useDispatch, useSelector } from "react-redux";

const Logout = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login.login);
  const navigate = useNavigate()
  console.log(login.email);
    dispatch(logoutAction(login.email));
    
  if(login.loginStatus === "LoggedOut"){
    alert("LoggedOut Successfully!");
    navigate("/home");
  }
 
  return (
    <div>
    </div>
  );
};

export default Logout;
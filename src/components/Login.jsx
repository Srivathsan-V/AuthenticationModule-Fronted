import React, {useState} from "react";
import axios from "axios";
import Registration from "./Registration";
import { NavLink } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loginAction } from "../actions/LoginActions";
import Joi from "joi-browser";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [errRes, setErrRes] = useState("");

 
  //Define schema to validate email and password
  const schema = {
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().min(6).max(15).required(),
  };

  //Validate
  const validate = () => {
    const errors = {}; 
    const result = Joi.validate(login, schema, {
      abortEarly: false,
    });
    console.log(result);
    // setting error messages to error properties
    // ex: errors[password] = "password is required";
    if (result.error != null)
      for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
      }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  let lgn = useSelector((state) => state.login.login);
  console.log(lgn === null);
 useEffect(()=>{
    // if(lgn!=null){
    //  window.localStorage.setItem("login info",JSON.stringify(lgn))
    // }
    // else 
    if(lgn === null){
      window.localStorage.setItem("login info",JSON.stringify({}))

 }
   },[])

  const handleChange = (event) => {
    const newLogin = { ...login };
    newLogin[event.target.name] = event.target.value;
    setLogin(newLogin);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Step3: Call validate function
    // validate login details with schema
    setErrors(validate());

    if (errors) return;

    // dispatch login action to rest api
      dispatch(loginAction(login));



    

    // Based on logginStatus redirect user to home.
    console.log(lgn);
      if (lgn.loginStatus ==="LoggedIn") {
          alert("User logged in successfully!");
          navigate("/home");
      }   
       else {
        console.log(lgn.errMsg);
        setErrRes(lgn.errMsg);
      }
  };
  console.log(login);

  return (
    <div className="login">
      <h1></h1>
      <div>
        <form
          onSubmit={handleSubmit}
          className="w-50 mx-auto border border-secondary rounded mt-4 p-2 shadow-lg p-3 mb-5 bg-body rounded"
        >
          <p className="text-center fs-4 bg-secondary text-white">
            Login in To Your Account
          </p>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={login.email}
              onChange={handleChange}
            />
            {errors && <small className="text-danger">{errors.email}</small>}

          </div>
            <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={login.password}
              onChange={handleChange}
            />
            {errors && <small className="text-danger">{errors.password}</small>}

          </div>
          
            <div>
            <button type="submit" className="btn btn-secondary">
              Log In
            </button>
            {errors && <small className="text-danger">{errRes}</small>}

            </div>
            <div>
             
<NavLink strict to="/updatepassword">
  Forgetten your password?Reset it here
</NavLink>   
            </div>
            <div>
            <NavLink strict to="/register">
  Don't have an account.Sign Up here.
</NavLink>   
            </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
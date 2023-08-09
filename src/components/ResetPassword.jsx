import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserByEmailAction } from "../actions/UserActions";
import Joi from "joi-browser";
const ResetPassword = () => {
  let navigate = useNavigate();
    const dispatch = useDispatch();
  const login = useSelector((state) => state.login.login);
  const nuser = useSelector((state) => state.user.user ); 



  // define state
  const [nPassword, setPassword] = useState("");
  const [email,setEmail] = useState("");
  
  const [errors, setErrors] = useState({});

  //Define schema to validate email and password
  const schema = {
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    nPassword: Joi.string().min(6).max(15).required(),
  };

  //Validate
  const validate = () => {
    const errors = {}; 
    const result = Joi.validate({email,nPassword},schema, {
      abortEarly: false,
    });
    console.log(result);
    // setting error messages to error properties
    // ex: errors[password] = "password is required";
    if (result.error != null)
      for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
        console.log("sucess")
        console.log(errors)
      }
    return Object.keys(errors).length === 0 ? null : errors;
  };


  const handleChange = (event) => {
    console.log(event.target.name); // returns field name
    console.log(event.target.value); // retruns filed value

    if(event.target.name ==="nPassword"){
    setPassword(event.target.value);
}
if(event.target.name ==="email"){
    //newEmail = event.target.value
    setEmail(event.target.value);
}
    console.log(nPassword)
    console.log(email)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("start");
    setErrors(validate());
    console.log("end");
    if (errors) return;

    console.log(email)
    dispatch(getUserByEmailAction(email));
    // send patch request to update
    console.log(nPassword)
    console.log(typeof(nPassword))
    axios
      .patch(`http://localhost:8080/user/updatepassword${nuser.userId}`, nPassword ,{
        headers: {
          'Content-Type': 'text/plain; charset=utf-8'
        }})
      .then((res) => {
        console.log(res);
        // alert user with msg
        alert("Password Updated Successfully!");
        // redirect to login page
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>

      <div className="w-50 mx-auto mt-3">
        <p className="display-6">Reset Password</p>
        <form className="border p-3" onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="empName" className="form-label float-start">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              name="email"
              onChange={handleChange}
            />
            {errors && <small className="text-danger">{errors.email}</small>}

          </div>
          <div className="mb-3">
            <label htmlFor="empName" className="form-label float-start">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="npassword"
              value={nPassword}
              name="nPassword"
              onChange={handleChange}
            />
            {errors && <small className="text-danger">{errors.nPassword}</small>}

          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
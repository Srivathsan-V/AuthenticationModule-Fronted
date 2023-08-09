import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserByEmailAction } from "../actions/UserActions";
import Joi from "joi-browser";


const UpdateUser = () => {
  let navigate = useNavigate();
    const dispatch = useDispatch();
  const login = useSelector((state) => state.login.login);
  const nuser = useSelector((state) => state.user.user ) 

  // define state
  const [user, setUser] = useState({
    
        userId: nuser.userId,
        username: "",
        address: "",
        email: nuser.email
  });
  useEffect(()=>{
    dispatch(getUserByEmailAction(login.email));
  },[]);

  const [errors, setErrors] = useState({});

  //Define schema to validate email and password
  const schema = {
    username: Joi.string()
      .required(),
    address: Joi.string().required(),
  };

  //Validate
  const validate = () => {
    const errors = {}; //object type local variable
    const result = Joi.validate(user, schema, {
      abortEarly: false,
      allowUnknown: true,
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
  

  const handleChange = (event) => {
    console.log(event.target.name); // returns field name
    console.log(event.target.value); // retruns filed value

    // copy user details to newUser obj
    const newUser = { ...user };

    
    newUser[event.target.name] = event.target.value;

    // update the newUser
    setUser(newUser);
    console.log(user)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate());

    if (errors) return;
    // send put request to update
    axios
      .put(`http://localhost:8080/user/update${nuser.userId}`, user)
      .then((res) => {
        console.log(res);
        // alert user with msg
        alert("Details Have Been Updated successfully!");
        // redirect to profile page
        navigate("/profile");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
        {login.loginStatus === "LoggedIn" && (

      <div className="w-50 mx-auto mt-3">
        <p className="display-6">Update Your Profile</p>
        <form className="border p-3" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="empName" className="form-label float-start">
              User Id
            </label>
            <input
              type="number"
              className="form-control"
              id="userId"
              value={user.userId}
              name="userId"
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="empName" className="form-label float-start">
              UserName
            </label>
            <input
              type="text"
              className="form-control"
              id="empName"
              value={user.username}
              name="username"
              onChange={handleChange}
            />
            {errors && <small className="text-danger">{errors.username}</small>}

          </div>
          <div className="mb-3">
            <label htmlFor="salary" className="form-label float-start">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="salary"
              value={user.address}
              name="address"
              onChange={handleChange}
            />
            {errors && <small className="text-danger">{errors.address}</small>}

          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label float-start">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              value={user.email}
              name="email"
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
        )}
    </div>
  );
};

export default UpdateUser;
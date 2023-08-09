import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { registerAction } from "../actions/LoginActions";
import Joi from "joi-browser";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword:"",
    address: "",
  });

  const [errors, setErrors] = useState({});

  //Define schema to validate email and password
  const schema = {
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().min(6).max(15).required(),
    confirmPassword: Joi.string().min(6).max(15).required(),
    name:Joi.string().required(),
    address:Joi.string().required()
  };

  //Validate
  const validate = () => {
    const errors = {}; 
    const result = Joi.validate(user, schema, {
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

  const handleChange = (event) => {
    const newUser = { ...user };
    newUser[event.target.name] = event.target.value;
    setuser(newUser);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate());
    if (errors) return;
    if(user!==null){
    dispatch(registerAction(user));
    alert("User added successfully!");
    navigate("/login");
    }
    
  };

  return (
    <div className = "Registration">
      <div>
        <form
              id = "register"

          onSubmit={handleSubmit}
          className= "w-50 mx-auto border border-secondary rounded mt-2 p-3 shadow-lg p-7 mb-5 bg-body rounded"
        >
          <p className="text-center fs-4 bg-dark bg-gradient
 rounded text-white">
            Create Your Account
          </p>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
            {errors && <small className="text-danger">{errors.name}</small>}

          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              name="email"
              value={user.email}
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
              value={user.password}
              onChange={handleChange}
            />
            {errors && <small className="text-danger">{errors.password}</small>}

          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              confirmPassword
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
            />
            {errors && <small className="text-danger">{errors.confirmPassword}</small>}

          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
                Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={user.address}
              onChange={handleChange}
            />
            {errors && <small className="text-danger">{errors.address}</small>}

          </div>          <div>
            <button type="submit" className="btn btn-secondary">
              Register
            </button>
            
          </div>
          <div>
        <NavLink strict to="/login">
        Already a registered user!Click here to login.
        </NavLink>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
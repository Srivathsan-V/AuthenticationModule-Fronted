import React from "react";
import { useEffect } from "react";
import { useSelector} from "react-redux";
import { useDispatch } from "react-redux";
import { getUserByEmailAction } from "../actions/UserActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logoutAction } from "../actions/LoginActions";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useSelector((state) => state.login.login);
  console.log(login);
  useEffect(()=>{
  dispatch(getUserByEmailAction(login.email));
},[]);

  const user = useSelector((state) => state.user.user);
  console.log(user)

  const navigateToUpdateProfile = () => {
    // 👇️ navigate to /updateprofile
    navigate('/updateprofile');
  };
  const handleDelete = () =>{
    // sending logout action
    dispatch(logoutAction(login.email));
    axios
      .delete(`http://localhost:8080/user/delete${user.userId}`)
      .then((res) => {
        console.log(res);
        // alert user with msg
        alert("Account Deleted");
        // redirect to employees page
        navigate("/register");
      })
      .catch((error) => console.log(error));

  };
  return (
    <div  className = "profile">
      {login.loginStatus === "LoggedIn" && (
      <div class="card" style={{width:"fit-content",height:"fit-content"}}>
  <img class="card-img-top" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="Card image cap"/>
  <div class="card-body">
    <h5 class="card-title">NAME:{user.username}</h5>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item"></li>
    <li class="list-group-item">EMAIL ADDRESS:{user.email}</li>
    <li class="list-group-item">ADDRESS:{user.address}</li>
  </ul>
  <div class="card-body">

  <div><button onClick = {navigateToUpdateProfile}type="button" class="btn btn-info">Update Profile </button></div>
  </div>

  <div><button onClick = {handleDelete}type="button" class="btn btn-info">Delete Account</button></div>

  </div>
  )}
    </div>
  );
}

export default ProfilePage;
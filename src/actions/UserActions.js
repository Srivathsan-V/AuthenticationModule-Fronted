import axios from "axios";
export const getUserByEmailAction = (email) => (dispatch) => {
  axios
    .patch(`http://localhost:8080/user/getuserbyemail/${email}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: "GET_USER_BY_EMAIL",
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error.response.data.message);
      dispatch({
        type: "ERR_RES",
        payload: error.response.data.message,
      });
    });
};
export const getAllUsersAction =()=> (dispatch) => {
  axios
    .get(`http://localhost:8080/user/Allusers`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: "GET_USERS",
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error.response.data.message);
      dispatch({
        type: "ERR_RES",
        payload: error.response.data.message,
      });
    });
};

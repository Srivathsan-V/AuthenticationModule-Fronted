import axios from "axios";

// Register
export const registerAction = (user) => async (dispatch) => {
  const result = await axios.post(
    "http://localhost:8080/user/userRegistration",
    user
  );
  console.log(result);
  console.log(result.data);
  dispatch({
    type: "REGISTER",
    payload: result.data,
  })
  .catch((error) => {
    console.log(error.response.data.message);
    dispatch({
      type: "ERR_RES",
      payload: error.response.data.message,
    });
  });
  
};

// login action
// export const loginAction = (login) => async (dispatch) => {
//   const result = await axios.post("http://localhost:8080/login/dto", login);
//   console.log(result);
//   console.log(result.data);
//   dispatch({
//     type: "LOGIN",
//     payload: result.data,
//   });
// };

export const loginAction = (login) => (dispatch) => {
  axios
    .post("http://localhost:8080/login/dto", login)
    .then((res) => {
      console.log(res);
      dispatch({
        type: "LOGIN",
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error.response.data.message);
      alert(error.response.data.message)
      dispatch({
        type: "ERR_RES",
        payload: error.response.data.message,
      });
    });
};

// logout action
export const logoutAction = (email) => async (dispatch) => {
  const result = await axios.patch(`http://localhost:8080/logout/${email}`);
  console.log(result);
  console.log(result.data);
  dispatch({
    type: "LOGOUT",
    payload: result.data,
  });
};
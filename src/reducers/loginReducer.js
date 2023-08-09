const initialState = {
    user: {},
    login: JSON.parse(localStorage.getItem("login info")),
    errMsg: "",
  };
  
  export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case "REGISTER":
        return { ...state, user: action.payload };
      case "LOGIN":
        return { ...state, login: action.payload };
      case "ERR_RES":
        return { ...state, errMsg: action.payload };
      case "LOGOUT":
        return { ...state, login: action.payload };
      default:
        return state;
    }
  };
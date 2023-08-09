const initialState = {
    users: [],
    user: {},
  };
  
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_USERS":
        return { ...state, users: action.payload };
      case "GET_USER_BY_EMAIL":
        return { ...state, user: action.payload };
      case "ADD_USER":
        return { ...state, users: [...state.users, action.payload] };
      case "DELETE_USER":
        const users = state.users.filter(
          (e) => e.id !== action.payload.id
        );
        return { ...state, users: users };
      case "UPDATE_USER":
        return state.users.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
      default:
        return state;
    }
  };
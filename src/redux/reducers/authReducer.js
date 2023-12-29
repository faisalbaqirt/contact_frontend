import { REGISTER, LOGIN } from "../actions/authAction";

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;

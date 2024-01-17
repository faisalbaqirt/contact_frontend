import axios from "axios";

let API_AUTH_URL;

if (process.env.NODE_ENV === "development") {
  // url local
  API_AUTH_URL = "http://localhost:5000/api/v1/auth";
} else {
  // url production
  API_AUTH_URL = process.env.REACT_APP_API_AUTH_URL;
}

// Action Types
export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";

// Action Creators
export const register = (user) => ({
  type: REGISTER,
  payload: user,
});

export const login = (user) => ({
  type: LOGIN,
  payload: user,
});

// Thunks
export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_AUTH_URL}/register`, userData);
    return dispatch(register(response.data));
  } catch (error) {
    throw error;
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_AUTH_URL}/login`, userData);
    return dispatch(login(response.data));
  } catch (error) {
    throw error;
  }
};

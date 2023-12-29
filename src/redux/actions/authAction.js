import axios from "axios";

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
    const response = await axios.post("http://localhost:5000/api/v1/auth/register", userData);
    return dispatch(register(response.data));
  } catch (error) {
    throw error;
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:5000/api/v1/auth/login", userData);
    return dispatch(login(response.data));
  } catch (error) {
    throw error;
  }
};

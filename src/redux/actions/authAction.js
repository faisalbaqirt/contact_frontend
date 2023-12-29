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

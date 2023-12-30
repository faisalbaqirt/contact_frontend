import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import contactReducer from "./reducers/contactReducer"

const store = configureStore({
  reducer: {
    auth: authReducer,
    contact: contactReducer
  },
});

export default store;
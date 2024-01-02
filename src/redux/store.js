import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import contactReducer from "./reducers/contactReducer"
import labelReducer from "./reducers/labelReducer"

const store = configureStore({
  reducer: {
    auth: authReducer,
    contact: contactReducer,
    label: labelReducer
  },
});

export default store;
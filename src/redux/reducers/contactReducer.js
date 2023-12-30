import {
  GET_ALLCONTACTS,
  GET_CONTACT,
  CREATE_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
} from "../actions/contactAction";

const initialState = {
  contactlist: [],
  error: null,
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALLCONTACTS:
    case GET_CONTACT:
      return {
        ...state,
        contactlist: action.payload,
        error: null,
      };
    case CREATE_CONTACT:
    case UPDATE_CONTACT:
    case DELETE_CONTACT:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default contactReducer;

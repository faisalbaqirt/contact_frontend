import {
  GET_ALLCONTACTS,
  GET_CONTACT_ID,
  GET_CONTACT_LABEL,
  CREATE_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  ADD_LABEL,
  REMOVE_LABEL,
} from "../actions/contactAction";

const initialState = {
  allContactData: [],
  contactDataById: [],
  contactDataByLabel: [],
  error: null,
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALLCONTACTS:
      return {
        ...state,
        allContactData: action.payload,
        error: null,
      };
    case GET_CONTACT_ID:
      return {
        ...state,
        contactDataById: action.payload,
        error: null,
      };
    case GET_CONTACT_LABEL:
      return {
        ...state,
        contactDataByLabel: action.payload,
        error: null,
      };
    case CREATE_CONTACT:
    case UPDATE_CONTACT:
    case DELETE_CONTACT:
    case ADD_LABEL:
    case REMOVE_LABEL:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default contactReducer;

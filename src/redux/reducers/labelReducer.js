import {
  GET_ALLLABELS,
  CREATE_LABEL,
  DELETE_LABEL,
} from "../actions/labelAction";

const initialState = {
  labellist: [],
  error: null,
};

const labelReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALLLABELS:
      return {
        ...state,
        labellist: action.payload,
        error: null,
      };
    case CREATE_LABEL:
    case DELETE_LABEL:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default labelReducer;

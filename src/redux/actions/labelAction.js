import axios from "axios";

let API_LABEL_URL;

if (process.env.NODE_ENV === "development") {
  // url local
  API_LABEL_URL = "http://localhost:5000/api/v1/label";
} else {
  // url production
  API_LABEL_URL = process.env.REACT_APP_API_LABEL_URL;
}

// Action Types
export const GET_ALLLABELS = "GET_ALLLABELS";
export const CREATE_LABEL = "CREATE_LABEL";
export const DELETE_LABEL = "DELETE_LABEL";

// Action Creators
export const getAllLabels = (label) => ({
  type: GET_ALLLABELS,
  payload: label,
});

export const createLabel = () => ({
  type: CREATE_LABEL,
});

export const deleteLabel = (labelId) => ({
  type: DELETE_LABEL,
  payload: labelId,
});

//Thunk
export const getAllLabelsByUser = () => async (dispatch) => {
  try {
    const response = await axios.get(API_LABEL_URL, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    dispatch(getAllLabels(response.data.data));
  } catch (error) {
    throw error;
  }
};

export const createNewLabel = (name) => async (dispatch) => {
  try {
    await axios.post(
      API_LABEL_URL,
      { name },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(createLabel());
    dispatch(getAllLabelsByUser());
  } catch (error) {
    throw error;
  }
};

export const deleteLabelById = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_LABEL_URL}/${id}`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    dispatch(deleteLabel(id));
    dispatch(getAllLabelsByUser());
  } catch (error) {
    throw error;
  }
};

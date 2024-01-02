import axios from "axios";

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
    const response = await axios.get("http://localhost:5000/api/v1/label", {
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
      "http://localhost:5000/api/v1/label",
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
    await axios.delete(`http://localhost:5000/api/v1/label/${id}`, {
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

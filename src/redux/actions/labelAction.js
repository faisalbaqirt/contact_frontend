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

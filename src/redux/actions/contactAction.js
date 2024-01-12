import axios from "axios";

// Action Types
export const GET_ALLCONTACTS = "GET_ALLCONTACTS";
export const GET_CONTACT_ID = "GET_CONTACT_ID";
export const GET_CONTACT_LABEL = "GET_CONTACT_LABEL";
export const CREATE_CONTACT = "CREATE_CONTACT";
export const UPDATE_CONTACT = "CONTACT";
export const UPDATE_PHOTO = "UPDATE_PHOTO";
export const UPDATE_STATUS = "UPDATE_STATUS";
export const DELETE_CONTACT = "DELETE_CONTACT";
export const ADD_LABEL = "ADD_LABEL";
export const REMOVE_LABEL_ALL_CONTACT = "REMOVE_LABEL_ALL_CONTACT";
export const REMOVE_LABEL = "REMOVE_LABEL";

// Action Creators
export const getAllContacts = (contact) => ({
  type: GET_ALLCONTACTS,
  payload: contact,
});

export const getContactId = (contact) => ({
  type: GET_CONTACT_ID,
  payload: contact,
});

export const getContactLabel = (contact) => ({
  type: GET_CONTACT_LABEL,
  payload: contact,
});

export const createContact = () => ({
  type: CREATE_CONTACT,
});

export const updateContact = () => ({
  type: UPDATE_CONTACT,
});

export const updatePhoto = () => ({
  type: UPDATE_PHOTO,
});

export const updateStatus = () => ({
  type: UPDATE_STATUS,
});

export const deleteContact = (contactId) => ({
  type: DELETE_CONTACT,
  payload: contactId,
});

export const addLabel = () => ({
  type: ADD_LABEL,
});

export const removeLabelAllContact = () => ({
  type: REMOVE_LABEL_ALL_CONTACT,
});

export const removeLabel = () => ({
  type: REMOVE_LABEL,
});

// Thunks
export const getAllContactsByUser = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:5000/api/v1/contact", {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    dispatch(getAllContacts(response.data.data));
  } catch (error) {
    throw error;
  }
};

export const getContactById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/contact/person/${id}`,
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(getContactId(response.data.data));
  } catch (error) {
    throw error;
  }
};

export const getContactByLabel = (label) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/contact/label/${label}`,
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(getContactLabel(response.data.data));
  } catch (error) {
    throw error;
  }
};

export const createNewContact =
  (name, telephone, email, address, labels) => async (dispatch) => {
    try {
      await axios.post(
        "http://localhost:5000/api/v1/contact/new",
        { name, telephone, email, address, labels },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(createContact());
    } catch (error) {
      throw error;
    }
  };

export const updateContactById =
  (id, name, telephone, email, address, labels) => async (dispatch) => {
    try {
      await axios.put(
        `http://localhost:5000/api/v1/contact/person/${id}`,
        { name, telephone, email, address, labels },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(updateContact());
    } catch (error) {
      throw error;
    }
  };

export const updateContactStatus = (id, newStatus) => async (dispatch) => {
  try {
    await axios.put(
      `http://localhost:5000/api/v1/contact/person/${id}/status`,
      { newStatus },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(updateStatus());
    dispatch(getAllContactsByUser());
  } catch (error) {
    throw error;
  }
};

export const deleteContactById = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/v1/contact/person/${id}`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    dispatch(deleteContact(id));
  } catch (error) {
    throw error;
  }
};

export const addLabelToContact = (contactId, label) => async (dispatch) => {
  try {
    await axios.post(
      `http://localhost:5000/api/v1/contact/person/${contactId}/label`,
      { label },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(addLabel());
    dispatch(getContactById(contactId));
  } catch (error) {
    throw error;
  }
};

export const removeLabelFromAllContact = (label) => async (dispatch) => {
  try {
    await axios.delete("http://localhost:5000/api/v1/contact/label", {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
      data: { label },
    });
    dispatch(removeLabelAllContact());
    dispatch(getAllContactsByUser());
  } catch (error) {
    throw error;
  }
};

export const removeLabelFromContact =
  (contactId, label) => async (dispatch) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/contact/person/${contactId}/label`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
          data: { label },
        }
      );
      dispatch(removeLabel());
      dispatch(getContactById(contactId));
    } catch (error) {
      throw error;
    }
  };

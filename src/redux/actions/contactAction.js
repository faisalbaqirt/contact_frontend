import axios from "axios";

// Action Types
export const GET_ALLCONTACTS = "GET_ALLCONTACTS";
export const GET_CONTACT = "GET_CONTACT";
export const CREATE_CONTACT = "CREATE_CONTACT";
export const UPDATE_CONTACT = "CONTACT";
export const DELETE_CONTACT = "DELETE_CONTACT";
export const ADD_LABEL = "ADD_LABEL";
export const REMOVE_LABEL = "REMOVE_LABEL";

// Action Creators
export const getAllContacts = (contact) => ({
  type: GET_ALLCONTACTS,
  payload: contact,
});

export const getContact = (contact) => ({
  type: GET_CONTACT,
  payload: contact,
});

export const createContact = () => ({
  type: CREATE_CONTACT,
});

export const updateContact = () => ({
  type: UPDATE_CONTACT,
});

export const deleteContact = (contactId) => ({
  type: DELETE_CONTACT,
  payload: contactId,
});

export const addLabel = () => ({
  type: ADD_LABEL,
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
    dispatch(getContact(response.data.data));
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

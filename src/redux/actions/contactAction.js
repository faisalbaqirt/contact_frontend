// Action Types
export const GET_ALLCONTACTS = "GET_ALLCONTACTS";
export const GET_CONTACT = "GET_CONTACT";
export const CREATE_CONTACT = "CREATE_CONTACT";
export const UPDATE_CONTACT = "CONTACT";
export const DELETE_CONTACT = "DELETE_CONTACT";

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

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewContact,
  updateContactById,
} from "../redux/actions/contactAction";
import {
  FaRegUser,
  FaRegEnvelope,
  FaPhone,
  FaLocationDot,
  FaTags,
  FaArrowLeft,
} from "react-icons/fa6";

const ContactForm = ({ isOpen, onClose, contactId }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [contactData, setContactData] = useState({
    name: "",
    telephone: "",
    email: "",
    address: "",
    labels: [],
  });

  const isEditMode = !!contactId;
  const contacts = useSelector((state) => state.contact.allContactData);
  const editedContact = isEditMode
    ? contacts.find((contact) => contact.id === parseInt(contactId))
    : null;

  useEffect(() => {
    if (editedContact) {
      setContactData(editedContact);
    }
  }, [editedContact]);

  const handleSaveClick = () => {
    setIsLoading(true);
    if (isEditMode) {
      dispatch(
        updateContactById(
          contactId,
          contactData.name,
          contactData.telephone,
          contactData.email,
          contactData.address,
          contactData.labels
        )
      );
    } else {
      dispatch(
        createNewContact(
          contactData.name,
          contactData.telephone,
          contactData.email,
          contactData.address,
          contactData.labels
        )
      );
    }
    setIsLoading(false);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        {isLoading && (
          <div className="loader-container">
            <div className="spinner-border text-light" role="status"></div>
          </div>
        )}
        <div className="actions">
          <div className="btn-action mb-3" onClick={onClose}>
            <FaArrowLeft />
          </div>
        </div>
        <h2 className="text-center">
          {isEditMode ? "Edit Contact" : "Add New Contact"}
        </h2>
        <div className="modal-body">
          <div className="mb-3 row">
            <div className="col-auto">
              <FaRegUser />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Name"
                value={contactData.name}
                onChange={(e) =>
                  setContactData({ ...contactData, name: e.target.value })
                }
              />{" "}
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-auto">
              <FaPhone />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                id="telephone"
                className="form-control"
                placeholder="Telephone"
                value={contactData.telephone}
                onChange={(e) =>
                  setContactData({ ...contactData, telephone: e.target.value })
                }
              />{" "}
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-auto">
              <FaRegEnvelope />
            </div>
            <div className="col-md-4">
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Email"
                value={contactData.email}
                onChange={(e) =>
                  setContactData({ ...contactData, email: e.target.value })
                }
              />{" "}
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-auto">
              <FaLocationDot />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                id="address"
                className="form-control"
                placeholder="Address"
                value={contactData.address}
                onChange={(e) =>
                  setContactData({ ...contactData, address: e.target.value })
                }
              />{" "}
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-auto">
              <FaTags />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                id="labels"
                className="form-control"
                placeholder="Label"
                value={contactData.labels.join(", ")}
                onChange={(e) =>
                  setContactData({
                    ...contactData,
                    labels: e.target.value.split(", "),
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={handleSaveClick}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

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
  FaArrowLeft,
  FaCheck,
  FaPlus,
  FaTrash,
} from "react-icons/fa6";
import { PiTagSimpleBold } from "react-icons/pi";
import LabelForm from "./LabelForm";

const ContactForm = ({ isOpen, onClose, contactId }) => {
  const dispatch = useDispatch();
  const labels = useSelector((state) => state.label.labellist);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingLabel, setIsAddingLabel] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
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

  const handleSelectLabel = (label) => {
    setSelectedLabel((prevLabel) => (prevLabel === label ? "" : label));
  };

  const handleAddLabel = () => {
    if (selectedLabel) {
      setContactData((prevData) => ({
        ...prevData,
        labels: [...prevData.labels, selectedLabel],
      }));
    }
  };

  const handleRemoveLabel = (label) => {
    setContactData((prevData) => ({
      ...prevData,
      labels: prevData.labels.filter((item) => item !== label),
    }));
  };

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
    <>
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
                    setContactData({
                      ...contactData,
                      telephone: e.target.value,
                    })
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
            <div className="labels">
              {contactData.labels.map((label) => (
                <div key={label} className="label-item">
                  {label}
                  <button
                    className="btn delete-label"
                    onClick={() => handleRemoveLabel(label)}
                    style={{
                      position: "absolute",
                      right: "0px",
                      zIndex: 1,
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <div className="label-item">
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    id="labelDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaPlus /> Label
                  </button>
                  <ul className="dropdown-menu">
                    {labels.length > 0 ? (
                      labels.map((label) => (
                        <li key={label.id}>
                          <div
                            className={`dropdown-item ${
                              label.name === selectedLabel ? "active" : ""
                            }`}
                            onClick={() => handleSelectLabel(label.name)}
                          >
                            <PiTagSimpleBold />{" "}
                            <span className="ms-3">{label.name} </span>
                            {label.name === selectedLabel && (
                              <span className="float-end">
                                <FaCheck />
                              </span>
                            )}
                          </div>
                        </li>
                      ))
                    ) : (
                      <li>
                        <div className="dropdown-item disabled">No Labels</div>
                      </li>
                    )}
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      {selectedLabel ? (
                        <button
                          className="dropdown-item"
                          onClick={handleAddLabel}
                        >
                          Add Label
                        </button>
                      ) : (
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            setIsAddingLabel(true);
                          }}
                        >
                          <FaPlus /> <span className="ms-3"> New Label </span>
                        </button>
                      )}
                    </li>
                  </ul>
                </div>
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
      <LabelForm
        isOpen={isAddingLabel}
        onClose={() => setIsAddingLabel(false)}
      />
    </>
  );
};

export default ContactForm;

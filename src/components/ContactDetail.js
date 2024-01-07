import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getContactById,
  deleteContactById,
  addLabelToContact,
  removeLabelFromContact,
} from "../redux/actions/contactAction";
import { getAllLabelsByUser } from "../redux/actions/labelAction";
import {
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaTrash,
  FaArrowLeft,
  FaCheck,
  FaPlus,
  FaTag,
} from "react-icons/fa6";
import ContactForm from "./ContactForm";
import LabelForm from "./LabelForm";

function ContactDetail() {
  const { contact_id } = useParams();
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contact.contactDataById);
  const labels = useSelector((state) => state.label.labellist);
  const [isAddingLabel, setIsAddingLabel] = useState(false);
  const [isEditContactModal, setIsEditContactModal] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");

  useEffect(() => {
    dispatch(getContactById(contact_id));
    dispatch(getAllLabelsByUser());
  }, [dispatch, contact_id]);

  const handleEditContact = () => {
    setIsEditContactModal(true);
  };

  const navigate = useNavigate();
  const handleRemoveContact = () => {
    dispatch(deleteContactById(contact_id));
    navigate("/");
  };

  const handleSelectLabel = (label) => {
    setSelectedLabel((prevLabel) => (prevLabel === label ? "" : label));
  };

  const handleAddLabelToContact = () => {
    dispatch(addLabelToContact(contact_id, selectedLabel));
  };

  const handleRemoveLabel = (label) => {
    dispatch(removeLabelFromContact(contact_id, label));
  };

  return (
    <>
      <div className="contact-detail section-container">
        {contacts.map((contact) => (
          <div key={contact.id} className="details">
            <div className="contact-detail-actions">
              <div className="left-action">
                <div className="btn-action">
                  <Link to="/" className="contact-link">
                    <FaArrowLeft />
                  </Link>
                </div>
              </div>
              <div className="right-action">
                <button className="btn btn-primary" onClick={handleEditContact}>
                  Edit
                </button>
                <div className="btn-action ms-3" onClick={handleRemoveContact}>
                  <FaTrash />
                </div>
              </div>
            </div>
            <div className="detail-name mt-3">{contact.name}</div>
            {contact.labels && contact.labels.length > 0 && (
              <div className="labels">
                {contact.labels.map((label, index) => (
                  <div key={index} className="label-item">
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
                              <FaTag />{" "}
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
                          <div className="dropdown-item disabled">
                            No Labels
                          </div>
                        </li>
                      )}
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        {selectedLabel ? (
                          <button
                            className="dropdown-item"
                            onClick={() => {
                              handleAddLabelToContact();
                            }}
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
            )}
            <div className="detail-col col-md-4 mt-3">
              <div className="item">
                {" "}
                <FaEnvelope /> {contact.email}
              </div>
              <div className="item">
                {" "}
                <FaPhone /> {contact.telephone}
              </div>
              <div className="item">
                {" "}
                <FaLocationDot /> {contact.address}
              </div>
            </div>
          </div>
        ))}
      </div>
      <ContactForm
        isOpen={isEditContactModal}
        onClose={() => setIsEditContactModal(false)}
        contactId={contact_id}
      />
      <LabelForm
        isOpen={isAddingLabel}
        onClose={() => setIsAddingLabel(false)}
        contactId={contact_id}
      />
    </>
  );
}

export default ContactDetail;

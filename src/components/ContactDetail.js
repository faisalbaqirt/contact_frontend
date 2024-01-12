import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getContactById,
  deleteContactById,
  updateContactStatus,
  updateContactPhoto,
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
  FaRegStar,
  FaStar,
  FaPen,
} from "react-icons/fa6";
import { PiTagSimpleBold } from "react-icons/pi";
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
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getContactById(contact_id));
    dispatch(getAllLabelsByUser());
  }, [dispatch, contact_id]);

  const handleEditContact = () => {
    setIsEditContactModal(true);
  };

  const handleToggleStatusFavorite = (id, newStatus) => {
    dispatch(updateContactStatus(id, newStatus));
  };

  const handleOpenPhotoModal = () => {
    setIsPhotoModalOpen(true);
  };

  const handleClosePhotoModal = () => {
    setIsPhotoModalOpen(false);
    setPhoto(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdatePhoto = () => {
    if (photo) {
      dispatch(updateContactPhoto(contact_id, photo));
    }
    handleClosePhotoModal();
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
                {contact.status === "favorite" ? (
                  <span
                    className="favorite-icon"
                    onClick={(e) => {
                      e.preventDefault();
                      handleToggleStatusFavorite(contact.id, "not_favorite");
                    }}
                  >
                    <FaStar style={{ color: "blue" }} />
                    <span className="action-text">Unfavorite</span>
                  </span>
                ) : (
                  <span
                    className="unfavorite-icon"
                    onClick={(e) => {
                      e.preventDefault();
                      handleToggleStatusFavorite(contact.id, "favorite");
                    }}
                  >
                    <FaRegStar />
                    <span className="action-text">Favorite</span>
                  </span>
                )}

                <button className="btn btn-primary ms-3" onClick={handleEditContact}>
                  Edit
                </button>
                <div className="btn-action ms-3" onClick={handleRemoveContact}>
                  <FaTrash />
                </div>
              </div>
            </div>
            <div className="row detail-header">
              <div className="photo-col col-md-4 mt-3">
                <img
                  src={
                    contact?.photo ||
                    "https://res.cloudinary.com/dxgjnu4h8/image/upload/v1698433031/users/profile_ccs4ks.jpg"
                  }
                  className="contact-photo"
                  alt=""
                />
                <div
                  className="photo-action btn btn-outline-secondary"
                  onClick={handleOpenPhotoModal}
                >
                  {contact.photo ? <FaPen /> : <FaPlus />}
                </div>
              </div>
              <div className="detail-name col-auto m-3">{contact.name}</div>
            </div>
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
            <div className="detail-col col-md-6 mt-3">
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
            <div className={`modal ${isPhotoModalOpen ? "open" : ""}`}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {contact.photo ? "Edit Photo" : "Add Photo"}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={handleClosePhotoModal}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="photo-preview">
                      <img
                        className=""
                        alt=""
                        src={` ${
                          photoPreview
                            ? photoPreview
                            : contact.photo ||
                              "https://res.cloudinary.com/dxgjnu4h8/image/upload/v1698433031/users/profile_ccs4ks.jpg"
                        }
                        `}
                      />
                    </div>
                    <input type="file" onChange={handleFileChange} />
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-primary"
                      onClick={handleUpdatePhoto}
                    >
                      Save
                    </button>
                  </div>
                </div>
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

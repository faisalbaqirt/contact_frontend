import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getContactById,
  deleteContactById,
  removeLabelFromContact,
} from "../redux/actions/contactAction";
import {
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaTrash,
  FaArrowLeft,
} from "react-icons/fa6";
import ContactForm from "./ContactForm";
import LabelForm from "./LabelForm";

function ContactDetail() {
  const { contact_id } = useParams();
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contact.contactlist);

  useEffect(() => {
    dispatch(getContactById(contact_id));
  }, [dispatch, contact_id]);

  const [isAddingLabel, setIsAddingLabel] = useState(false);
  const [isEditContactModal, setIsEditContactModal] = useState(false);

  const handleEditContact = () => {
    setIsEditContactModal(true);
  };

  const navigate = useNavigate();
  const handleRemoveContact = () => {
    dispatch(deleteContactById(contact_id));
    navigate("/");
  };

  const handleRemoveLabel = (label) => {
    dispatch(removeLabelFromContact(contact_id, label));
  };

  return (
    <>
      <div className="contact-detail">
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
                  <div className="btn" onClick={() => setIsAddingLabel(true)}>
                    Add Label
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

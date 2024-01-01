import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getContactById,
  addLabelToContact,
  removeLabelFromContact,
} from "../redux/actions/contactAction";
import { FaEnvelope, FaPhone, FaLocationDot, FaTrash } from "react-icons/fa6";

function ContactDetail() {
  const { contact_id } = useParams();
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contact.contactlist);

  useEffect(() => {
    dispatch(getContactById(contact_id));
  }, [dispatch, contact_id]);

  const [newLabel, setNewLabel] = useState("");
  const [isAddingLabel, setIsAddingLabel] = useState(false);

  const handleAddLabel = () => {
    dispatch(addLabelToContact(contact_id, newLabel));
    setNewLabel("");
    setIsAddingLabel(false);
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
              <Link to="/" className="contact-link">
                Back
              </Link>
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
                {isAddingLabel ? (
                  <div className="label-item">
                    <input
                      type="text"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      placeholder="Tambah Label"
                    />
                    <button className="btn" onClick={handleAddLabel}>
                      Add
                    </button>
                  </div>
                ) : (
                  <div className="label-item">
                    <div className="btn" onClick={() => setIsAddingLabel(true)}>
                      Add Label
                    </div>
                  </div>
                )}
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
    </>
  );
}

export default ContactDetail;

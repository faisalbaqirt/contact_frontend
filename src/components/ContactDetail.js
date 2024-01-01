import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getContactById } from "../redux/actions/contactAction";
import { FaEnvelope, FaPhone, FaLocationDot } from "react-icons/fa6";

function ContactDetail() {
  const { contact_id } = useParams();
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contact.contactlist);

  useEffect(() => {
    dispatch(getContactById(contact_id));
  }, [dispatch, contact_id]);

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
                  </div>
                ))}
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

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactByLabel } from "../redux/actions/contactAction";
import { Link, useParams } from "react-router-dom";

const ContactByLabel = () => {
  const { label_name } = useParams();
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contact.contactlist);

  useEffect(() => {
    dispatch(getContactByLabel(label_name));
  }, [dispatch, label_name]);

  return (
    <>
      <div>
        <h2 className="text-center m-3">{label_name}</h2>
        {contacts && contacts.length > 0 ? (
          <div className="contact-list">
            <div className="contact-header row">
              <div className="header-item col">Name</div>
              <div className="header-item col">Email</div>
              <div className="header-item col">Telephone</div>
              <div className="header-item col">Address</div>
            </div>
            {contacts.map((contact) => (
              <Link
                to={`/person/${contact.id}`}
                className="contact-link"
                key={contact.id}
              >
                <div className="contact-item row">
                  <div className="item col">{contact.name}</div>
                  <div className="item col">{contact.email}</div>
                  <div className="item col">{contact.telephone}</div>
                  <div className="item col">{contact.address}</div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center">Tidak ada kontak dengan label ini.</p>
        )}
      </div>
    </>
  );
};

export default ContactByLabel;

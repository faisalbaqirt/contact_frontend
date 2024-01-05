import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllContactsByUser } from "../redux/actions/contactAction";
import { FaPlus } from "react-icons/fa6";
import ContactForm from "./ContactForm";

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contact.contactlist);
  const [isNewContactModalOpen, setIsNewContactModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllContactsByUser());
  }, [dispatch]);

  const handleNewContact = () => {
    setIsNewContactModalOpen(true);
  };

  return (
    <>
      <div>
        <h2 className="text-center m-3">Contact List</h2>
        <div className="mb-3 ms-3">
          <button className="btn btn-primary" onClick={handleNewContact}>
            <FaPlus /> New Contact
          </button>
        </div>
        <div className="contact-list">
          <div className="contact-header row">
            <div className="header-item col">Name</div>
            <div className="header-item col">Email</div>
            <div className="header-item col">Telephone</div>
            <div className="header-item col">Address</div>
          </div>
          {contacts && contacts.map((contact) => (
            <Link to={`/person/${contact.id}`} className="contact-link">
              <div key={contact.id} className="contact-item row">
                <div className="item col">{contact.name}</div>
                <div className="item col">{contact.email}</div>
                <div className="item col">{contact.telephone}</div>
                <div className="item col">{contact.address}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <ContactForm
        isOpen={isNewContactModalOpen}
        onClose={() => setIsNewContactModalOpen(false)}
      />
    </>
  );
}

export default ContactList;

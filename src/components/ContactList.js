import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllContactsByUser } from "../redux/actions/contactAction";

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contact.contactlist);

  useEffect(() => {
    dispatch(getAllContactsByUser());
  }, [dispatch]);

  return (
    <>
      <div>
        <h2 className="text-center m-3">Contact List</h2>
        <div className="contact-list">
          <div className="contact-header row">
            <div className="header-item col">Name</div>
            <div className="header-item col">Email</div>
            <div className="header-item col">Telephone</div>
            <div className="header-item col">Address</div>
          </div>
          {contacts.map((contact) => (
            <div key={contact.id} className="contact-item row">
              <div className="item col">{contact.name}</div>
              <div className="item col">{contact.email}</div>
              <div className="item col">{contact.telephone}</div>
              <div className="item col">{contact.address}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ContactList;
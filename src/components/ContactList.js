import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllContactsByUser,
  updateContactStatus,
} from "../redux/actions/contactAction";
import { FaRegStar, FaStar } from "react-icons/fa6";

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contact.allContactData);

  useEffect(() => {
    dispatch(getAllContactsByUser());
  }, [dispatch]);

  const handleToggleStatusFavorite = (id, newStatus) => {
    dispatch(updateContactStatus(id, newStatus));
  };

  return (
    <>
      <div className="section-container">
        <h2 className="text-center m-3">Contact List</h2>
        <div className="contact-list">
          <div className="contact-header row">
            <div className="header-item col">Name</div>
            <div className="header-item col">Email</div>
            <div className="header-item col">Telephone</div>
            <div className="header-item col">Address</div>
          </div>
          <div className="contact-data">
            {contacts &&
              contacts.map((contact) => (
                <Link to={`/person/${contact.id}`} className="contact-link">
                  <div key={contact.id} className="contact-item row">
                    <div className="item col">{contact.name}</div>
                    <div className="item col">{contact.email}</div>
                    <div className="item col">{contact.telephone}</div>
                    <div className="item col">{contact.address}</div>
                    <div className="status-action">
                      {contact.status === "favorite" ? (
                        <span
                          className="favorite-icon"
                          onClick={(e) => {
                            e.preventDefault();
                            handleToggleStatusFavorite(
                              contact.id,
                              "not_favorite"
                            );
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
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactList;

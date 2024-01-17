import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getContactByLabel,
  updateContactStatus,
} from "../redux/actions/contactAction";
import { Link, useParams } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa6";

const ContactByLabel = () => {
  const { label_name } = useParams();
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contact.contactDataByLabel);

  useEffect(() => {
    dispatch(getContactByLabel(label_name));
  }, [dispatch, label_name]);

  const handleToggleStatusFavorite = (id, newStatus) => {
    dispatch(updateContactStatus(id, newStatus));
  };

  return (
    <>
      <div className="section-container">
        <h2 className="text-center m-3">{label_name}</h2>
        {contacts && contacts.length > 0 ? (
          <div className="contact-list">
            <div className="contact-header row">
              <div className="header-item col">Name</div>
              <div className="header-item col">Email</div>
              <div className="header-item col">Telephone</div>
              <div className="header-item col">Address</div>
            </div>
            <div className="contact-data">
              {contacts.map((contact) => (
                <Link
                  to={`/person/${contact.id}`}
                  className="contact-link"
                  key={contact.id}
                >
                  <div className="contact-item row">
                    <div className="item col">
                      <span className="avatar-photo">
                        <img
                          src={
                            contact.photo ||
                            "https://res.cloudinary.com/dxgjnu4h8/image/upload/v1698433031/users/profile_ccs4ks.jpg"
                          }
                          alt=""
                        />
                      </span>
                      <span className="ms-2">{contact.name}</span>
                    </div>
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
        ) : (
          <p className="text-center">Tidak ada kontak dengan label ini.</p>
        )}
      </div>
    </>
  );
};

export default ContactByLabel;

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const SearchResults = () => {
  const contacts = useSelector((state) => state.contact.contactlist);
  const [searchQuery, setSearchQuery] = useState("");
  
  const location = useLocation();
  const urlSearchQuery = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    setSearchQuery(urlSearchQuery);
  }, [urlSearchQuery]);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="section-container">
      <h2 className="text-center m-3">Search Results</h2>
      {filteredContacts.length > 0 ? (
        <div className="contact-list">
          <div className="contact-header row">
            <div className="header-item col">Name</div>
            <div className="header-item col">Email</div>
            <div className="header-item col">Telephone</div>
            <div className="header-item col">Address</div>
          </div>
          {filteredContacts.map((contact) => (
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
        <p className="text-center">No results found for "{searchQuery}".</p>
      )}
    </div>
  );
};

export default SearchResults;

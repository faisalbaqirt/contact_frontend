import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaBars } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
  const isAuthenticated = localStorage.getItem("token");
  const contacts = useSelector((state) => state.contact.contactlist);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowResults(query.trim() !== "");
  };

  const navigate = useNavigate();
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      return;
    }
    navigate(`/search?q=${searchQuery}`);

    setSearchQuery("");
    setShowResults(false);
  };

  const renderSuggestions = () => {
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredContacts.length === 0) {
      return null;
    }

    return (
      <div className="suggestions">
        {filteredContacts.map((contact) => (
          <Link
            key={contact.id}
            to={`/person/${contact.id}`}
            onClick={() => setShowResults(false)}
            className="text-center"
          >
            {contact.name}
          </Link>
        ))}
      </div>
    );
  };

  return (
    <>
      <nav className="navbar fixed-top navbar-expand">
        <div className="container-fluid">
          {isAuthenticated && (
            <>
              <button className="toggle-btn" onClick={toggleSidebar}>
                <FaBars />
              </button>
              <form
                className="search-form col-md-6"
                onSubmit={handleSearchSubmit}
              >
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button type="submit" className="btn btn-outline-secondary">
                    <FaSearch />
                  </button>
                  {showResults && <>{renderSuggestions()}</>}
                </div>
              </form>
            </>
          )}
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">
                    Register
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

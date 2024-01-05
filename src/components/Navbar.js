import { FaBars } from "react-icons/fa6";

const Navbar = ({ toggleSidebar }) => {
  const isAuthenticated = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <nav className="navbar fixed-top navbar-expand">
        <div className="container-fluid">
          <button className="toggle-btn" onClick={toggleSidebar}>
            <FaBars />
          </button>
          <div className="navbar-collapse justify-content-end" id="navbarNav">
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
        </div>
      </nav>
    </>
  );
};

export default Navbar;

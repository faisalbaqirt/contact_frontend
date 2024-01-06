import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLabelsByUser } from "../redux/actions/labelAction";
import { Link, useLocation } from "react-router-dom";
import { FaTag, FaUserGroup } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import ContactForm from "./ContactForm";

const Sidebar = ({ isSidebarOpen }) => {
  const dispatch = useDispatch();
  const labels = useSelector((state) => state.label.labellist);
  const location = useLocation();
  const [isNewContactModalOpen, setIsNewContactModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllLabelsByUser());
  }, [dispatch]);

  const handleNewContact = () => {
    setIsNewContactModalOpen(true);
  };

  return (
    <>
      <div className={`sidebar  ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-content mt-5">
          <div className="mb-3 ms-3">
            <button className="btn add-btn" onClick={handleNewContact}>
              <FaPlus /> New Contact
            </button>
          </div>
          <ul className="nav-list">
            <li className="nav-item">
              <Link
                to="/"
                className={`sidebar-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                <FaUserGroup /> <span className="ms-3">All</span>
              </Link>
            </li>
          </ul>
          <div className="label-heading">Label</div>
          <ul className="nav-list">
            {labels.map((label) => (
              <li className="nav-item" key={label.id}>
                <Link
                  to={`/label/${label.name}`}
                  className={`sidebar-link ${
                    location.pathname === `/label/${label.name}` ? "active" : ""
                  }`}
                >
                  <FaTag /> <span className="ms-3">{label.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ContactForm
        isOpen={isNewContactModalOpen}
        onClose={() => setIsNewContactModalOpen(false)}
      />
    </>
  );
};

export default Sidebar;

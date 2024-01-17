import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllLabelsByUser,
  deleteLabelById,
} from "../redux/actions/labelAction";
import { removeLabelFromAllContact } from "../redux/actions/contactAction";
import { Link, useLocation } from "react-router-dom";
import { FaPlus, FaTrash, FaUserGroup } from "react-icons/fa6";
import { PiTagSimpleBold } from "react-icons/pi";
import ContactForm from "./ContactForm";
import LabelForm from "./LabelForm";

const Sidebar = ({ isSidebarOpen }) => {
  const dispatch = useDispatch();
  const labels = useSelector((state) => state.label.labellist);
  const location = useLocation();
  const [isNewContactModalOpen, setIsNewContactModalOpen] = useState(false);
  const [isAddNewLabel, setIsAddNewLabel] = useState(false);

  useEffect(() => {
    dispatch(getAllLabelsByUser());
  }, [dispatch]);

  const handleNewContact = () => {
    setIsNewContactModalOpen(true);
  };

  const handleDeleteLabel = (label) => {
    dispatch(removeLabelFromAllContact(label.name));
    dispatch(deleteLabelById(label.id));
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
          <div className="label-heading">
            <span>Label</span>
            <div className="btn-action" onClick={() => setIsAddNewLabel(true)}>
              <FaPlus />
            </div>
          </div>
          <ul className="nav-list">
            {labels.map((label) => (
              <li className="nav-item" key={label.id}>
                <Link
                  to={`/label/${label.name}`}
                  className={`sidebar-link ${
                    location.pathname === `/label/${label.name}` ? "active" : ""
                  }`}
                >
                  <PiTagSimpleBold /> <span className="ms-3">{label.name}</span>
                  <button
                    className="btn delete-label"
                    onClick={() => handleDeleteLabel(label)}
                    style={{
                      position: "absolute",
                      right: "0px",
                      top: "0px",
                      zIndex: 1,
                    }}
                  >
                    <FaTrash />
                  </button>
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
      <LabelForm
        isOpen={isAddNewLabel}
        onClose={() => setIsAddNewLabel(false)}
      />
    </>
  );
};

export default Sidebar;

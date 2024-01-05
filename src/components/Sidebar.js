import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLabelsByUser } from "../redux/actions/labelAction";
import { Link, useLocation } from "react-router-dom";
import { FaTag, FaUserGroup } from "react-icons/fa6";

const Sidebar = ({ isSidebarOpen }) => {
  const dispatch = useDispatch();
  const labels = useSelector((state) => state.label.labellist);
  const location = useLocation();

  useEffect(() => {
    dispatch(getAllLabelsByUser());
  }, [dispatch]);

  return (
    <div className={`sidebar  ${isSidebarOpen ? "open" : "closed"}`}>
      <div className="sidebar-content mt-5">
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
  );
};

export default Sidebar;

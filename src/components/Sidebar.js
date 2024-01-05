import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLabelsByUser } from "../redux/actions/labelAction";
import { Link } from "react-router-dom";

const Sidebar = ({ isSidebarOpen }) => {
  const dispatch = useDispatch();
  const labels = useSelector((state) => state.label.labellist);

  useEffect(() => {
    dispatch(getAllLabelsByUser());
  }, [dispatch]);

  return (
    <div className={`sidebar  ${isSidebarOpen ? "open" : "closed"}`}>
      <div className="sidebar-content mt-5">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/all" className="sidebar-link">
              All
            </Link>
          </li>
        </ul>
        <div className="label-heading">Label</div>
        <ul className="nav-list">
          {labels.map((label) => (
            <li className="nav-item" key={label.id}>
              <Link to={`/label/${label.name}`} className="sidebar-link">
                {label.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

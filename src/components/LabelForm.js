import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewLabel } from "../redux/actions/labelAction";
import { addLabelToContact } from "../redux/actions/contactAction";
import { PiTagSimpleBold } from "react-icons/pi";

const ContactForm = ({ isOpen, onClose, contactId }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [newLabel, setNewLabel] = useState("");

  const handleSave = () => {
    setIsLoading(true);
    if (contactId) {
      dispatch(addLabelToContact(contactId, newLabel));
      dispatch(createNewLabel(newLabel));
    } else {
      dispatch(createNewLabel(newLabel));
    }
    setIsLoading(false);
    setNewLabel("");
    onClose();
  };

  return (
    <div
      className={`modal ${isOpen ? "open" : ""}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          {isLoading && (
            <div className="loader-container">
              <div className="spinner-border text-light" role="status"></div>
            </div>
          )}
          <div className="modal-header">
            <h5 className="modal-title">New Label</h5>
            <button
              type="button"
              className="btn-close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="m-2 row">
              <div className="col-auto">
                <PiTagSimpleBold />
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="New Label"
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

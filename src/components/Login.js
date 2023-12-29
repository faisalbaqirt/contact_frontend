import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/authAction";
import ModalDialog from "./ModalDialog";

const Login = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
  });

  const handleModalClose = () => {
    setModalShow(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await dispatch(loginUser(formData));

      if (response && response.payload && response.payload.token) {
        setIsLoading(false)
        setModalContent({
            title: "Success",
            message: `${formData.username} logged in successfully`,
          });
        setModalShow(true);
        localStorage.setItem("token", response.payload.token);
      } else {
        setIsLoading(false)
        setModalContent({
            title: "Error",
            message: response.payload.message,
          });
        setModalShow(true);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="container auth-container">
        <h2 className="text-center mb-3">Login</h2>
        {isLoading && (
            <div className="loader-container">
              <div className="spinner-border text-light" role="status"></div>
            </div>
          )}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <div className="auth-footer text-center mt-3">
          New user? <a href="/register">Create an account</a>
        </div>
      </div>
      <ModalDialog
        show={modalShow}
        onHide={handleModalClose}
        title={modalContent.title}
        message={modalContent.message}
      />
    </>
  );
};

export default Login;
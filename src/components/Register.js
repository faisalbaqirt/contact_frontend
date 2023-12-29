import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/actions/authAction";

const Register = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await dispatch(registerUser(formData));
      if (response.payload.message === "This username is already registered") {
        setIsLoading(false)
        alert(response.payload.message);
      } else {
        setIsLoading(false)
        alert("Successfully created an account");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="container auth-container">
        <h2 className="text-center mb-3">Create an account</h2>
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
            Register
          </button>
        </form>
        <div className="auth-footer text-center mt-3">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </>
  );
};

export default Register;

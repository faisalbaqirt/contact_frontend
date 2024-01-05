import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Register from "./components/Register";
import Login from "./components/Login";
import ContactDetail from "./components/ContactDetail";
import ContactList from "./components/ContactList";
import ContactByLabel from "./components/ContactByLabel";
import "./App.css";

const App = () => {
  const isAuthenticated = localStorage.getItem("token");
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/" /> : <Register />}
          />
          {isAuthenticated ? (
            <Route path="/" element={<Home />}>
              <Route index element={<Navigate to="/all" />} />
              <Route path="/all" element={<ContactList />} />
              <Route path="/person/:contact_id" element={<ContactDetail />} />
              <Route path="/label/:label_name" element={<ContactByLabel />} />
            </Route>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

import Intro from "../components/Intro";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactList from "../components/ContactList";

const Home = () => {
  const isAuthenticated = localStorage.getItem("token");
  return (
    <>
      <div className="home-page">
        <Navbar />
        {isAuthenticated ? <ContactList /> : <Intro />}
        <Footer />
      </div>
    </>
  );
};

export default Home;

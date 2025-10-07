import { Link } from "react-router-dom";
import "../css/navbar.css";

function NavBar() {
  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/weather">Weather</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

export default NavBar;

import { Link } from "react-router-dom";
import '../assets/css/NavBar.css'

function NavBar() {
  return (
    <nav className="nav-bar">
      <h1 className="nav-header">Gratitude</h1>
      <div>
        <Link className="nav-link" to="/">My Gratitutes</Link>
        {" | "}
        <Link className="nav-link" to="/new">+</Link>
      </div>
    </nav>
  );
}

export default NavBar;

import { Link } from "react-router-dom";
import '../assets/css/NavBar.css'

function NavBar() {
  return (
    <nav className="nav-bar">
      <h1 className="nav-header">Gratitude</h1>
      <div>
        <Link className="link" to="/">Gratitutes List</Link>
        {" | "}
        <Link className="link" to="/new">Add Gratitude</Link>
      </div>
    </nav>
  );
}

export default NavBar;
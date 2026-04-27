import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">Pokédex</Link>
      </div>

      <div className="nav-links">
        {/*<Link to="/">Hjem</Link> */}
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}
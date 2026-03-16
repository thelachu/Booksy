import { LogOut, BookOpen } from "lucide-react";
import "./Navbar.css";

const Navbar = ({ username, onLogout }) => {
  return (
    <nav className="navbar glass-strong">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <BookOpen className="navbar-brand-icon" />
          <span className="navbar-brand-name">BOOKSY</span>
        </div>
        <div className="navbar-actions">
          <span className="navbar-username">{username}</span>
          <button onClick={onLogout} className="navbar-logout">
            <LogOut className="navbar-logout-icon" />
            <span className="navbar-logout-text">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

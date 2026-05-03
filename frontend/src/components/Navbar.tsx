import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const navLinks = [
  { to: "/", label: "Board", icon: "⊞" },
  { to: "/dashboard", label: "Dashboard", icon: "◈" },
  { to: "/profile", label: "Profile", icon: "◉" },
  { to: "/about", label: "About", icon: "◎" },
  { to: "/settings", label: "Settings", icon: "◌" },
];

export default function Navbar({ onLogout }: { onLogout: () => void }) {
  const location = useLocation();
  const { user } = useAuth();

  const initials = user?.name
    ? user.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">⬡</span>
        <span className="navbar-title">TaskFlow</span>
      </div>

      <div className="navbar-links">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={"nav-link" + (location.pathname === link.to ? " nav-link-active" : "")}
          >
            <span className="nav-icon">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </div>

      <div className="navbar-right">
        <div className="user-avatar">{initials}</div>
        <button className="btn-logout" onClick={onLogout}>
          Sign out
        </button>
      </div>
    </nav>
  );
}

import { Link } from "react-router-dom";

export default function Navbar({ onLogout }: { onLogout: () => void }) {
  return (
    <div style={styles.nav}>
      <Link to="/">Tasks</Link>
      <Link to="/about">About</Link>
      <Link to="/settings">Settings</Link>

      <button onClick={onLogout} style={{ marginLeft: "auto" }}>
        Logout
      </button>
    </div>
  );
}

const styles: any = {
  nav: {
    display: "flex",
    gap: "20px",
    padding: "15px",
    background: "#0f172a",
    borderBottom: "1px solid #1e293b",
    color: "white",
  },
};
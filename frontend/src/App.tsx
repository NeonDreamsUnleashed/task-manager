import { useState } from "react";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return token ? (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <Tasks />
    </div>
  ) : (
    <Login onLogin={handleLogin} />
  );
}
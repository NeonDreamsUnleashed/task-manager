import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import About from "./pages/About";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";

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

  return (
    <>
      {token && <Navbar onLogout={handleLogout} />}

      <Routes>
        {/* LOGIN */}
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/"
          element={token ? <Tasks /> : <Navigate to="/login" />}
        />

        <Route
          path="/about"
          element={token ? <About /> : <Navigate to="/login" />}
        />

        <Route
          path="/settings"
          element={token ? <Settings /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ToastContainer } from "./components/Toast";

import Navbar from "./components/Navbar";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import About from "./pages/About";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

function AppInner() {
  const { token, logout } = useAuth();

  return (
    <>
      {token && <Navbar onLogout={logout} />}
      <ToastContainer />

      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/"          element={token ? <Tasks />     : <Navigate to="/login" />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/profile"   element={token ? <Profile />   : <Navigate to="/login" />} />
        <Route path="/about"     element={token ? <About />     : <Navigate to="/login" />} />
        <Route path="/settings"  element={token ? <Settings />  : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}

import { Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ToastContainer } from "./components/Toast";

import Navbar from "./components/Navbar";
import Tasks from "./pages/Tasks";
import About from "./pages/About";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

function AppInner() {
  const { logout } = useAuth();

  return (
    <>
      <Navbar onLogout={logout} />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<Settings />} />
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
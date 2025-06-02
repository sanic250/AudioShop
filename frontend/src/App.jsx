import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import "./App.css";
import Navbar from "./components/NavBar.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import useAuthStore from "./services/authStore.js";
function App() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const role = useAuthStore((state) => state.user?.role);
  return (
    <>
      <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />}  />
      <Route path="/signup" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={isLoggedIn && <Profile/>} />
      <Route path="/dashboard" element={isLoggedIn && role === "admin" && <Dashboard />} />
    </Routes>
    </>
  );
}

export default App;

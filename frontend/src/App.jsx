import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import "./App.css";
import Navbar from "./components/NavBar.jsx";

function App() {
  return (
    <>
      <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />}  />
      
    </Routes>
    </>
  );
}

export default App;

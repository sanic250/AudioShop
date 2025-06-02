import React from "react";
import styles from "../styles/register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Lock, Mail, UserRound } from "lucide-react";
import axios from "axios";
import useAuthStore from "../services/authStore.js";
const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  const [error, setError] = useState('');
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const [ loading, setLoading ] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    setError("Please fill in all fields");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const response = await axios.post(
      "http://localhost:5000/api/users/login",
      formData
    );
    login({
      token: response.data.token,
      user: {
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
        role: response.data.user.role
      }
    });
    navigate("/");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Login failed";
    console.error("Login error:", errorMessage);
    setError(errorMessage);
    // Remove the alert or keep it separately if needed
    // alert(errorMessage); 
  } finally {
    setLoading(false);
  }
};
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3 className={styles.title}>Login</h3>
         {error && <div className={styles.error}>{error}</div>}
        <label className={styles.label} htmlFor="email">
          <Mail />
          <input
            onChange={handleChange}
            className={styles.input}
            placeholder="example@example.com"
            type="email"
            id="email"
            name="email"
            value={formData.email}
          />
        </label>

        <label className={styles.label} htmlFor="password">
          <Lock />
          <input
            onChange={handleChange}
            className={styles.input}
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            value={formData.password}
          />
        </label>

        <button className={styles.btnSubmit} type="submit">
          Login
        </button>
        <p>
          Do you have an account? Please{" "}
          <Link className={styles.navLink} to="/signup">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

import React from "react";
import styles from "../styles/register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Lock, Mail, UserRound } from "lucide-react";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        formData
      );
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3 className={styles.title}>Create an account</h3>
        <label className={styles.label} htmlFor="name">
          <UserRound />
          <input
            onChange={handleChange}
            className={styles.input}
            placeholder="Username"
            type="text"
            id="name"
            name="name"
            value={formData.name}
          />
        </label>

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
          Register
        </button>
        <p>
          Do you have an account? Please{" "}
          <Link className={styles.navLink} to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

import React from "react";
import styles from "../../styles/dashboard/users.module.css";
import { useState, useEffect } from "react";
import useAuthStore from "../../services/authStore.js";
const DashboardUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthStore();

  return (
    <div>Users</div>

  )
}
export default DashboardUsers;

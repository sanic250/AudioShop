import React from "react";
import styles from "../../styles/dashboard/users.module.css";
import { useState, useEffect } from "react";
import useAuthStore from "../../services/authStore.js";
const DashboardUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users/dashboard", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) throw new Error("Błąd pobierania danych");

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "admin") {
      fetchUsers();
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {users.map((user) => (
          <div key={user.id} className={styles.user}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DashboardUsers;

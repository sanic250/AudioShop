import React from "react";
import styles from "../styles/dashboard.module.css";
import { useState } from "react";
import DashboardUsers from "../components/dashboard/DashboardUsers.jsx";
import {
  Users,
  Speaker,
  CalendarArrowDown,
  ChartBarIncreasing,
  Folder,
} from "lucide-react";
const Dashboard = () => {
  const [categorySwitch, setCategorySwitch] = useState("Products");
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1 className={styles.h1}>
          Dashboard <Folder />
        </h1>
        <div className={styles.btnSwitch}>
          <button
            onClick={() => setCategorySwitch("Users")}
            className={styles.btnCategory}
          >
            Users <Users className={styles.iconsCategory} />{" "}
          </button>
          <button
            onClick={() => setCategorySwitch("Products")}
            className={styles.btnCategory}
          >
            Products <Speaker className={styles.iconsCategory} />
          </button>
          <button
            onClick={() => setCategorySwitch("Orders")}
            className={styles.btnCategory}
          >
            Orders <CalendarArrowDown className={styles.iconsCategory} />
          </button>
          <button
            onClick={() => setCategorySwitch("Analytics")}
            className={styles.btnCategory}
          >
            Analytics <ChartBarIncreasing className={styles.iconsCategory} />
          </button>
        </div>
      </div>
      {categorySwitch === "Users" && <DashboardUsers />}
    </div>
  );
};

export default Dashboard;

import React from "react";
import styles from "../styles/profile.module.css";
import useAuthStore from "../services/authStore.js";
import {Camera, Pen} from 'lucide-react'
const Profile = () => {
  const { user } = useAuthStore();
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <h1>Hello , {user.name}</h1>
        <div className={styles.profileImg}>
        <img src="/roshi.jpg" className={styles.avatar} alt="avatar" />
        <Camera className={styles.camera}/>
        </div>
        <p>Name: {user.name}</p>
      
        <p>Email: {user.email}</p>
         <button className={styles.changeBtn}> <Pen /> Edit profile</button>
      </div>
    </div>
  );
};

export default Profile;

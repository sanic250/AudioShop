import React from "react";
import styles from "../styles/navbar.module.css";
import { useState } from "react";
import {
  Search,
  ShoppingBasket,
  Heart,
  KeyRound,
  UserRoundPen,
  LogOut,
  Menu
} from "lucide-react";
import { Link } from "react-router-dom";
import useAuthStore from "../services/authStore.js";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.user?.role);  

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
   
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src="/logoaudio3.png" alt="logo" className={styles.logo} />
        <div className={styles.search}>
          <form className={styles.form}>
            <input
              className={styles.input}
              type="text"
              placeholder="Search products..."
            />
            <button className={styles.btnSearch} type="submit">
              <Search className={styles.iconSearch} />
            </button>
          </form>
        </div>
      </div>
      <div className={styles.profile}>
        <div className={styles.cart}>
          <ShoppingBasket className={`${styles.cartIcon} ${styles.icons}`} />
        </div>
        <div className={styles.favorites}>
          <Heart className={`${styles.hearth} ${styles.icons}`} />
        </div>
        <div className={styles.loginProfile}>
          {isLoggedIn ? (
            <div className={styles.authContent}>
            <p className={styles.username}>{user.name}</p>
              <img src="/roshi.jpg" alt="avatar" className={styles.avatar} />
              <Menu onClick={handleToggleMenu} className={styles.icons} />
              <LogOut onClick={() => useAuthStore.getState().logout()} className={styles.icons} />
            </div>
          ) : (
            <div className={styles.loginProfile}>
              <button className={`${styles.login} ${styles.buttons}`}>
                <KeyRound />
                <Link className={styles.navLink} to="/login">
                  Login
                </Link>
              </button>
              <button className={`${styles.register} ${styles.buttons}`}>
                <UserRoundPen />
                <Link className={styles.navLink1} to="/signup">
                  Register
                </Link>
              </button>
            </div>
          )}
          {toggleMenu && isLoggedIn && (
            <div className={styles.menu}>
             
              <Link to="/profile" className={styles.menuLink}>
               Profile
              </Link>
              <Link className={styles.menuLink}>
               Settings
              </Link>
              <Link className={styles.menuLink}>Orders</Link>
              {role === "admin" && (<Link className={styles.menuLink} to="/dashboard">Dashboard</Link>)}
            
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

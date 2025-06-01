import React from "react";
import styles from "../styles/navbar.module.css";
import { Search, ShoppingBasket, Heart, KeyRound, UserRoundPen} from "lucide-react";
const Navbar = () => {
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
        <button className={`${styles.login} ${styles.buttons}`}><KeyRound /> Login</button>
        <button className={`${styles.register} ${styles.buttons}`}><UserRoundPen /> Register</button>
      </div>
      </div>
    </div>
  );
};

export default Navbar;

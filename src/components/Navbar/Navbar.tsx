import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <h2 className={styles.logo}>Practica API</h2>

      <ul className={styles.navList}>
        <li>
          <Link to="/">Inicio</Link>
        </li>

        <li className={styles.dropdown}>
          <span>APIs ▼</span>
          <ul className={styles.dropdownMenu}>
            <li>
              <Link to="/cat-facts">Cat Facts</Link>
            </li>
            <li>
              <Link to="/dog-facts">Dog Facts</Link>
            </li>
            <li>
              <Link to="/crypto">Crypto Prices</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

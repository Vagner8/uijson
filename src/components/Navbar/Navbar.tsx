import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

interface NavbarProps {
  isConfigValue: boolean
  clickApply: () => void
}

export function Navbar({isConfigValue, clickApply}: NavbarProps) {
  return (
    <nav className={styles.Navbar}>
      <Link to="/">Config</Link>
      {isConfigValue ? <Link onClick={clickApply} to="/result">Result</Link> : null}
    </nav>
  );
}

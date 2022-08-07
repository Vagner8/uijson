import { Button } from "components/Button/Button";
import { Link, useLocation } from "react-router-dom";
import styles from "./navbar.module.css";

interface NavbarProps {
  isConfigValue: boolean;
  clickApply: () => void;
}

export function Navbar({ isConfigValue, clickApply }: NavbarProps) {
  const location = useLocation();
  return (
    <nav className={`${styles.Navbar} ${styles[location.pathname.slice(1)]}`}>
      <Link to="/">
        <Button title="Config" />
      </Link>
      {isConfigValue ? <Button title="Result" onClick={clickApply} /> : null}
    </nav>
  );
}

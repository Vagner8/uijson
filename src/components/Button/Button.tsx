import { MouseEvent } from "react";
import styles from "./button.module.css";

interface ButtonProps {
  title: string;
  type?: "button" | "submit";
  onClick: (e: MouseEvent) => void
}

export function Button({ title, type = "button", onClick }: ButtonProps) {
  return (
    <button onClick={onClick} type={type} className={styles.Button}>
      {title}
    </button>
  );
}

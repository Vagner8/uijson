import { ReactNode } from "react";
import styles from "./form.module.css";

interface FormProps {
  children: (() => ReactNode[]) | ReactNode;
}

export function Form({ children }: FormProps) {
  return (
    <form id='formId' className={styles.Form}>
      {typeof children === "function" ? children() : children}
    </form>
  );
}

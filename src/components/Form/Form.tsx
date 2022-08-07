import { ReactNode } from "react";
import styles from "./form.module.css";

interface FormProps {
  children: ReactNode;
}

export function Form({ children }: FormProps) {
  return (
    <form id='formId' className={styles.Form}>
      {children}
    </form>
  );
}

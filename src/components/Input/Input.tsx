import { OnChangeType } from "App";
import { HTMLInputTypeAttribute } from "react";
import styles from "./input.module.css";

interface InputProps {
  id: string;
  type: HTMLInputTypeAttribute;
  value?: string;
  label: string;
  checked?: boolean;
  onChange: OnChangeType;
}

export function Input({id, value = "", label, type, checked, onChange }: InputProps) {
  return (
    <div className={styles.Input}>
      <label htmlFor={label}>{label}</label>
      <input id={id} value={value} type={type} onChange={onChange} checked={checked} />
    </div>
  );
}

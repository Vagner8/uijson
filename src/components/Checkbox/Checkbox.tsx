import { OnChangeType } from "App";
import styles from "./checkbox.module.css";

interface CheckboxProps {
  id: string;
  checked?: boolean;
  label: string;
  onChange: OnChangeType;
}

export function Checkbox({id, checked = false, label, onChange }: CheckboxProps) {
  return (
    <div className={styles.Checkbox}>
      <label htmlFor={label}>{label}</label>
      <input
          id={id}
          checked={checked}
          type="checkbox"
          onChange={onChange}
        />
    </div>
  );
}

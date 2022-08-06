import { OnChangeType } from "App";
import styles from "./textarea.module.css";

interface TextareaProps {
  id: string;
  value?: string;
  label: string;
  rows?: number;
  onChange: OnChangeType;
}

export function Textarea({ id, value = '', label, rows = 5, onChange }: TextareaProps) {
  return (
    <div className={styles.Textarea}>
      <label htmlFor={label}>{label}</label>
      <textarea id={id} value={value} rows={rows} onChange={onChange} />
    </div>
  );
}

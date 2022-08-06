import styles from './alert.module.css'

interface AlertProps {
  message: string
}

export function Alert({message}: AlertProps) {
  return (
    <div className={styles.Alert}>{message}</div>
  )
} 
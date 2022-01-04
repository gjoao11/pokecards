import { ReactNode } from 'react'
import styles from './styles.module.scss'

interface SetListProps {
  children: ReactNode;
}

export function SetList({ children }: SetListProps) {
  return (
    <div className={styles.setListContainer}>
      {children}
    </div>
  )
}

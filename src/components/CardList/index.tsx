import { ReactNode } from 'react'
import styles from './styles.module.scss'

interface SetListProps {
  children: ReactNode;
}

export function CardList({ children }: SetListProps) {
  return (
    <div className={styles.cardListContainer}>
      {children}
    </div>
  )
}

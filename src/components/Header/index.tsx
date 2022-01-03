import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <strong className={styles.logo}>PokéCards</strong>
      </div>
    </header>
  )
}

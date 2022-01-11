import Image from 'next/image'
import styles from './styles.module.scss'

interface Set {
  id: string;
  name: string;
  series: string;
  total: number;
  images: {
    logo: string;
  }
}

interface SetItemProps {
  set: Set;
}

export function SetItem({ set }: SetItemProps) {
  return (
    <div className={styles.setItemContainer}>
      <div className={styles.leftSideContainer}>
        <div className={styles.setLogoContainer}>
          <Image
            src={set.images.logo}
            alt={set.name}
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className={styles.setInfo}>
          <strong>{set.name}</strong>

          <span>{set.series} Series</span>
        </div>
      </div>

      <div className={styles.rightSideContainer}>
        <span>{set.total} cards total</span>
      </div>
    </div>
  )
}

import Image from 'next/image'
import styles from './styles.module.scss'

interface Set {
  id: string;
  name: string;
  series: string;
  total: number;
  images: {
    symbol: string;
  }
}

interface SetItemProps {
  set: Set;
}

export function SetItem({ set }: SetItemProps) {
  return (
    <section className={styles.setItemContainer}>
      <div className={styles.symbolContainer}>
        <Image
          src={set.images.symbol}
          alt={set.name}
          width="100%"
          height="100%"
          objectFit="contain"
        />
      </div>

      {set.name}
    </section>
  )
}

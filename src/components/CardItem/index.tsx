import Image from 'next/image'
import styles from './styles.module.scss'

interface Card {
  id: string;
  name: string;
  supertype: string;
  images: {
    small: string;
  }
}

interface CardItemProps {
  card: Card;
}

export function CardItem({ card }: CardItemProps) {
  return (
    <div className={styles.cardItemContainer}>
      <Image
        src={card.images.small}
        alt={card.name}
        width="100%"
        height="120%"
        layout="responsive"
      />
    </div>
  )
}

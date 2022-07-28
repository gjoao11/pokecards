import Image from 'next/image';
import { Card as CardType } from 'src/types';
import styles from './styles.module.scss';

interface CardItemProps {
  card: CardType;
}

export function CardItem({ card }: CardItemProps) {
  const mainType = !!card.types ? card.types[0] : '';

  return (
    <div className={`${styles.cardItemContainer} ${styles[mainType]}`}>
      <Image src={card.images.small} alt={card.name} width="100%" height="140%" layout="responsive" />
    </div>
  );
}

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Card as CardType } from 'src/types';
import { CardDetailsBody } from './CardDetailsBody';
import { CardDetailsFooter } from './CardDetailsFooter';
import { CardDetailsHeader } from './CardDetailsHeader';
import { CardLegalities } from './CardLegalities';
import styles from './styles.module.scss';

interface PokemonCardProps {
  card: CardType;
}

export function PokemonCardDetails({ card }: PokemonCardProps) {
  const [isBasicEnergy, setIsBasicEnergy] = useState(false);

  useEffect(() => {
    if (card.supertype === 'Energy') {
      if (typeof card?.subtypes === 'object') {
        if (card.subtypes[0] === 'Basic') {
          setIsBasicEnergy(true);
        }
      } else {
        setIsBasicEnergy(true);
      }
    }
  }, [card]);

  return (
    <div className={styles.cardDetailsContainer}>
      <div className={styles.cardImage}>
        <Image
          src={card.images.large}
          alt={card.name}
          width="100%"
          height="140%"
          layout="responsive"
          priority
        />
      </div>

      <div className={styles.cardData}>
        <CardDetailsHeader card={card} />
        {!isBasicEnergy && <CardDetailsBody card={card} />}
        <CardDetailsFooter card={card} />
        {!!card.legalities && <CardLegalities card={card} />}
      </div>
    </div>
  );
}

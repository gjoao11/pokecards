import { useImageShimmer } from '@/hooks/useImageShimmer';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Card as CardType } from 'src/types';
import { CardDetailsBody } from './CardDetailsBody';
import { CardDetailsFooter } from './CardDetailsFooter';
import { CardDetailsHeader } from './CardDetailsHeader';
import { CardFormats } from './CardFormats';
import { CardDataContainer, CardDetailsContainer, CardImageContainer } from './styles';

interface CardDetailsProps {
  card: CardType;
}

export const CardDetails: React.FC<CardDetailsProps> = ({ card }) => {
  const imageShimmer = useImageShimmer(734, 1024);

  const [isBasicEnergy, setIsBasicEnergy] = useState(false);

  function verifyIfCardEnergyIsBasic(card: CardType) {
    if (typeof card.subtypes !== 'object') {
      return true;
    }

    if (card.subtypes[0] === 'Basic') {
      return true;
    }

    return false;
  }

  useEffect(() => {
    if (card.supertype === 'Energy') {
      setIsBasicEnergy(verifyIfCardEnergyIsBasic(card));
    }
  }, [card]);

  return (
    <CardDetailsContainer>
      <CardImageContainer>
        <Image
          src={card.images.large}
          alt={card.name}
          width={734}
          height={1024}
          layout="responsive"
          priority
          placeholder="blur"
          blurDataURL={imageShimmer}
        />
      </CardImageContainer>

      <CardDataContainer>
        <CardDetailsHeader card={card} />
        {!isBasicEnergy && <CardDetailsBody card={card} />}
        <CardDetailsFooter card={card} />
        {!!card.legalities && <CardFormats card={card} />}
      </CardDataContainer>
    </CardDetailsContainer>
  );
};

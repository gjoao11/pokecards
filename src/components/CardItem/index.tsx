import { useImageShimmer } from '@/hooks/useImageShimmer';
import Image from 'next/image';
import { Card as CardType } from 'src/types';
import { CardItemContainer } from './styles';

interface CardItemProps {
  card: CardType;
}

export function CardItem({ card }: CardItemProps) {
  const cardShimmer = useImageShimmer(245, 342);

  return (
    <CardItemContainer>
      <Image
        src={card.images.small}
        alt={card.name}
        width={245}
        height={342}
        layout="responsive"
        loading="lazy"
        placeholder="blur"
        blurDataURL={cardShimmer}
      />
    </CardItemContainer>
  );
}

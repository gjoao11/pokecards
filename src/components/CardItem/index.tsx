import Image from 'next/image'

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
    <div>
      <Image
        src={card.images.small}
        alt={card.name}
        width="100%"
        height="140%"
        layout="responsive"
      />
    </div>
  )
}

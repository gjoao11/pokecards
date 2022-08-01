import Image from 'next/image';
import Link from 'next/link';
import {
  CardDetailsFooterContainer,
  CardExpansion,
  DetailsGrid,
  DetailsGridItem,
  PokemonCardStat,
  PokemonCardStats,
} from './styles';

interface CardDetailsFooterProps {
  card: {
    supertype: string;
    weaknesses: {
      type: string;
      value: string;
    }[];
    resistances: {
      type: string;
      value: string;
    }[];
    retreatCost: string[];
    number: string;
    artist: string;
    rarity: string;
    set: {
      id: string;
      name: string;
      printedTotal: number;
      images: {
        symbol: string;
      };
    };
  };
}

export const CardDetailsFooter: React.FC<CardDetailsFooterProps> = ({ card }) => {
  return (
    <CardDetailsFooterContainer>
      {card.supertype === 'Pokémon' && (
        <PokemonCardStats>
          {!!card.weaknesses &&
            card.weaknesses.map(weakness => (
              <PokemonCardStat key={weakness.type}>
                <p>Weakness</p>
                <span>
                  <Image
                    src={`/images/energy-types/${weakness.type}.png`}
                    alt={weakness.type}
                    width={25}
                    height={25}
                    loading="lazy"
                    title={weakness.type}
                  />
                  {weakness.value}
                </span>
              </PokemonCardStat>
            ))}

          {!!card.resistances &&
            card.resistances.map(resistance => (
              <PokemonCardStat key={resistance.type}>
                <p>Resistance</p>
                <span>
                  <Image
                    src={`/images/energy-types/${resistance.type}.png`}
                    alt={resistance.type}
                    width={25}
                    height={25}
                    loading="lazy"
                    title={resistance.type}
                  />
                  {resistance.value}
                </span>
              </PokemonCardStat>
            ))}

          {!!card.retreatCost && (
            <PokemonCardStat>
              <p>Retreat</p>
              <span>
                {card.retreatCost.map((energyType, index) => (
                  <Image
                    key={index}
                    src={`/images/energy-types/${energyType}.png`}
                    alt={energyType}
                    width={25}
                    height={25}
                    loading="lazy"
                    title={energyType}
                  />
                ))}
              </span>
            </PokemonCardStat>
          )}
        </PokemonCardStats>
      )}

      <CardExpansion>
        <h3>Expansion</h3>
        <p>
          <Link href={`/sets/${card.set.id}`}>
            <a>
              <Image
                src={card.set.images.symbol}
                alt={card.set.name}
                width={16}
                height={16}
                objectFit="contain"
                loading="lazy"
              />
              {card.set.name}
            </a>
          </Link>
        </p>
      </CardExpansion>

      <DetailsGrid>
        <DetailsGridItem>
          <h3>Illustrator</h3>
          <p>{card.artist}</p>
        </DetailsGridItem>

        <DetailsGridItem>
          <h3>Number</h3>
          <p>
            {card.number.padStart(3, '0')}/{card.set.printedTotal.toString().padStart(3, '0')}
          </p>
        </DetailsGridItem>

        <DetailsGridItem>
          <h3>Rarity</h3>
          <p>{card.rarity}</p>
        </DetailsGridItem>
      </DetailsGrid>
    </CardDetailsFooterContainer>
  );
};

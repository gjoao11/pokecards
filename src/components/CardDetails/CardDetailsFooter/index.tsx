import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';

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
    regulationMark: string;
  };
}

export function CardDetailsFooter({ card }: CardDetailsFooterProps) {
  return (
    <div className={styles.container}>
      {card.supertype === 'Pokémon' && (
        <div className={styles.stats}>
          {!!card.weaknesses &&
            card.weaknesses.map(weakness => (
              <div key={weakness.type} className={styles.stat}>
                <span>Weakness</span>
                <span>
                  <Image
                    src={`/images/energy-types/${weakness.type}.png`}
                    alt={weakness.type}
                    width="25px"
                    height="25px"
                  />
                  {weakness.value}
                </span>
              </div>
            ))}

          {!!card.resistances &&
            card.resistances.map(resistance => (
              <div key={resistance.type} className={styles.stat}>
                <span>Resistance</span>
                <span>
                  <Image
                    src={`/images/energy-types/${resistance.type}.png`}
                    alt={resistance.type}
                    width="25px"
                    height="25px"
                  />
                  {resistance.value}
                </span>
              </div>
            ))}

          {!!card.retreatCost && (
            <div className={styles.stat}>
              <span>Retreat</span>
              <span>
                {card.retreatCost.map((energyType, index) => (
                  <Image
                    key={index}
                    src={`/images/energy-types/${energyType}.png`}
                    alt={energyType}
                    width="25px"
                    height="25px"
                  />
                ))}
              </span>
            </div>
          )}
        </div>
      )}

      <div className={styles.info}>
        <div>
          <span>Expansion</span>
          <span>
            <Link href={`/sets/${card.set.id}`}>
              <a>
                <Image
                  src={card.set.images.symbol}
                  alt={card.set.name}
                  width={16}
                  height={16}
                  objectFit="scale-down"
                />
                {card.set.name}
              </a>
            </Link>
          </span>
        </div>

        <div>
          <span>Number</span>
          <span>
            {card.number.padStart(3, '0')}/
            {card.set.printedTotal.toString().padStart(3, '0')}
          </span>
        </div>

        <div>
          <span>Rarity</span>
          <span>{card.rarity}</span>
        </div>

        <div>
          <span>Illustrator</span>
          <span>{card.artist}</span>
        </div>

        {!!card.regulationMark && (
          <div>
            <span>Mark</span>
            <span>{card.regulationMark}</span>
          </div>
        )}
      </div>
    </div>
  );
}

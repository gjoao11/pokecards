import Image from 'next/image';
import styles from './styles.module.scss';

interface CardDetailsHeaderProps {
  card: {
    name: string;
    supertype: string;
    subtypes: string[];
    hp: string;
    types: string[];
  };
}

export function CardDetailsHeader({ card }: CardDetailsHeaderProps) {
  return (
    <div className={styles.container}>
      <div className={styles.cardTitle}>
        <h1>{card.name}</h1>
        <div>
          <span>{card.supertype}</span>
          {!!card.subtypes && <span>&nbsp;-&nbsp;</span>}
          {card.subtypes?.map((subtype, index) => (
            <span key={subtype}>
              {subtype}
              {card.subtypes.length - 1 !== index && <>,&nbsp;</>}
            </span>
          ))}
        </div>
      </div>

      {card.supertype === 'Pokémon' && (
        <div className={styles.cardHP}>
          <span>
            HP <span>{card.hp}</span>
          </span>

          {card.types?.map(type => (
            <Image
              key={type}
              src={`/images/energy-types/${type}.png`}
              alt={type}
              width="25px"
              height="25px"
            />
          ))}
        </div>
      )}
    </div>
  );
}

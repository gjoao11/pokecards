import Image from 'next/image';
import styles from './styles.module.scss';

interface CardDetailsBodyProps {
  card: {
    rules: string[];
    abilities: {
      name: string;
      text: string;
      type: string;
    }[];
    attacks: {
      name: string;
      cost: string[];
      damage: string;
      text: string;
    }[];
  };
}

export function CardDetailsBody({ card }: CardDetailsBodyProps) {
  return (
    <div className={styles.container}>
      {!!card.rules &&
        card.rules?.map((rule, index) => (
          <div key={index}>
            <span className={styles.text}>{rule}</span>
          </div>
        ))}

      {!!card.abilities &&
        card.abilities?.map((ability, index) => (
          <div key={index}>
            <div className={styles.title}>
              <span className={styles.abilityTag}>{`[ ${ability.type} ]`}</span>
              <span>{ability.name}</span>
            </div>
            <span className={styles.text}>{ability.text}</span>
          </div>
        ))}

      {!!card.attacks &&
        card.attacks?.map((attack, index) => (
          <div key={index}>
            <div className={styles.title}>
              <span className={styles.cost}>
                {attack?.cost.map((energy, index) => (
                  <Image
                    key={index}
                    src={`/images/energy-types/${energy}.png`}
                    alt={energy}
                    width="25px"
                    height="25px"
                  />
                ))}
              </span>
              <span>{attack?.name}</span>
              <span className={styles.damage}>{attack?.damage}</span>
            </div>
            {!!attack.text && (
              <span className={styles.text}>{attack?.text}</span>
            )}
          </div>
        ))}
    </div>
  );
}

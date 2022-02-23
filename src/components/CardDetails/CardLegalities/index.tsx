import { MdOutlineCancel, MdOutlineCheckCircle } from 'react-icons/md';
import styles from './styles.module.scss';

interface CardLegalitiesProps {
  card: {
    legalities: {
      unlimited: string;
      standard: string;
      expanded: string;
    };
  };
}

export function CardLegalities({ card }: CardLegalitiesProps) {
  return (
    <div className={styles.container}>
      <span>Legalities:</span>
      <div>
        <span>
          {card.legalities.standard === 'Legal' ? (
            <MdOutlineCheckCircle size={24} color="#1be436" />
          ) : (
            <MdOutlineCancel size={24} color="#e41b43" />
          )}
          Standard
        </span>
        <span>
          {card.legalities.expanded === 'Legal' ? (
            <MdOutlineCheckCircle size={24} color="#1be436" />
          ) : (
            <MdOutlineCancel size={24} color="#e41b43" />
          )}
          Expanded
        </span>
        <span>
          {card.legalities.unlimited === 'Legal' ? (
            <MdOutlineCheckCircle size={24} color="#1be436" />
          ) : (
            <MdOutlineCancel size={24} color="#e41b43" />
          )}
          Unlimited
        </span>
      </div>
    </div>
  );
}

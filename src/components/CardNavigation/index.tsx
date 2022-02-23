import Link from 'next/link';
import styles from './styles.module.scss';

interface CardNavigationProps {
  previousCard: {
    id: string;
    name: string;
    number: string;
    set: {
      name: string;
    };
  };
  nextCard: {
    id: string;
    name: string;
    number: string;
    set: {
      name: string;
    };
  };
}

export function CardNavigation({
  previousCard,
  nextCard,
}: CardNavigationProps) {
  const previousCardLink = previousCard ? `/cards/${previousCard.id}` : null;
  const nextCardLink = !!nextCard ? `/cards/${nextCard.id}` : null;

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {!!previousCardLink && (
          <Link href={previousCardLink}>
            <a>
              <div className={styles.cardLink}>
                <span>{previousCard.name}</span>
              </div>
            </a>
          </Link>
        )}
      </div>

      <div className={styles.right}>
        {!!nextCardLink && (
          <Link href={nextCardLink}>
            <a>
              <div className={styles.cardLink}>
                <span>{nextCard.name}</span>
              </div>
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}

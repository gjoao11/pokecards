import { BackPageButton } from '@/components/BackPageButton';
import { CardItem } from '@/components/CardItem';
import { CardList } from '@/components/CardList';
import { api } from '@/services/api';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Card as CardType, Set as SetType } from 'src/types';
import styles from './Set.module.scss';

interface SetProps {
  set: SetType;
  cards?: CardType[];
}

export default function Set({ set, cards }: SetProps) {
  return (
    <>
      <Head>
        <title>{set.name} - PokéCards</title>
      </Head>

      <div className={styles.container}>
        <div>
          <BackPageButton />
        </div>

        <main className={styles.contentContainer}>
          <h1>
            {set.series} - {set.name}
          </h1>

          <CardList>
            {cards?.map(card => (
              <Link key={card.id} href={`/cards/${card.id}`} prefetch={false}>
                <a>
                  <CardItem card={card} />
                </a>
              </Link>
            ))}
          </CardList>
        </main>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const setID = params?.setID;

  try {
    const { data: setResponse } = await api.get(`sets/${String(setID)}`);
    const set: SetType = await setResponse.data;

    const { data: cardsResponse } = await api.get('cards', {
      params: {
        q: `set.id:${set.id}`,
        orderBy: 'number',
        page: 1,
      },
    });
    let cards: CardType[] = await cardsResponse.data;

    if (cards.length < set.total) {
      const restOfCardsResponse = await api.get('cards', {
        params: {
          q: `set.id:${set.id}`,
          orderBy: 'number',
          page: 2,
        },
      });

      const { data: restOfCards } = await restOfCardsResponse.data;

      cards = [...cards, ...restOfCards];
    }

    return {
      props: {
        set,
        cards,
      },
      revalidate: 60 * 60 * 48, // 48 hours
    };
  } catch {
    return {
      notFound: true,
      revalidate: 60, // 1 minute
    };
  }
};

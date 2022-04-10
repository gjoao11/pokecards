import { BackPageButton } from '@components/BackPageButton';
import { PokemonCardDetails } from '@components/CardDetails/PokemonCardDetails';
import { api } from '@services/api';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { Card as CardType } from 'src/types';
import styles from './Card.module.scss';

interface CardPageProps {
  card: CardType;
}

export default function CardPage({ card }: CardPageProps) {
  return (
    <>
      <Head>
        <title>
          {card.name} - {card.set.name} - PokéCards
        </title>
      </Head>

      <div className={styles.container}>
        <div>
          <BackPageButton />
        </div>

        <main className={styles.contentContainer}>
          <PokemonCardDetails card={card} />
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
  const cardID = params?.cardID;

  try {
    const { data: response } = await api.get(`cards/${String(cardID)}`);
    const card: CardType = await response.data;

    return {
      props: {
        card,
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

import { CardItem } from '@components/CardItem';
import { CardList } from '@components/CardList';
import { api } from '@services/api';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';
import styles from './Set.module.scss';

interface Set {
  id: string;
  name: string;
  series: string;
  total: number;
  images: {
    logo: string;
  };
}

interface Card {
  id: string;
  name: string;
  supertype: string;
  types: string;
  images: {
    small: string;
  };
}

interface SetProps {
  set: Set;
  cards?: Card[];
}

export default function Set({ set, cards }: SetProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{set.name} - PokéCards</title>
      </Head>

      <div className={styles.container}>
        <button className={styles.returnButton} onClick={router.back}>
          <FiArrowLeft size={20} color="#b4b4b6" />
          <span>Home</span>
        </button>

        <main className={styles.contentContainer}>
          <h1>
            {set.series} - {set.name}
          </h1>

          <CardList>
            {cards?.map(card => (
              <CardItem key={card.id} card={card} />
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
  const setId = params?.setId;

  try {
    const setResponse = await api.get(`/sets/${String(setId)}`);

    const { data: set } = await setResponse.data;

    const cardsResponse = await api.get('cards', {
      params: { q: `set.id:${set.id}` },
    });
    const { data: cards } = await cardsResponse.data;

    return {
      props: {
        set,
        cards,
      },
      revalidate: 60 * 60 * 24, // 24 hours
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

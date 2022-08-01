import { BackPageButton } from '@/components/common/BackPageButton';
import { Container } from '@/components/common/Container';
import { Text } from '@/components/common/Text';
import { CardItem } from '@/components/pages/sets/CardItem';
import { CardList } from '@/components/pages/sets/CardList';
import { api } from '@/services/api';
import { Card as CardType, PokemonTCGAPIRes, Set as SetType } from '@/types';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

interface SetProps {
  set: SetType;
  cards?: CardType[];
}

const Set: NextPage<SetProps> = ({ set, cards }) => {
  return (
    <>
      <Head>
        <title>{`${set.name} - PokéCards`}</title>
      </Head>

      <Container css={{ display: 'flex', flexDirection: 'column', gap: '$8' }}>
        <div>
          <BackPageButton />
        </div>

        <Text as="h1" size="4">
          {set.series} - {set.name}
        </Text>

        <CardList>
          {cards?.map(card => (
            <Link key={card.id} href={`/cards/${card.id}`} prefetch={false}>
              <a>
                <CardItem card={card} />
              </a>
            </Link>
          ))}
        </CardList>
      </Container>
    </>
  );
};

export default Set;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const setID = params?.setID;

  try {
    const { data: setResponse } = await api.get<{ data: SetType }>(`sets/${String(setID)}`);
    const set = setResponse.data;

    const cards: CardType[] = [];

    for (let i = 1; i >= 1; i += 1) {
      const { data: cardsResponse } = await api.get<PokemonTCGAPIRes<CardType[]>>('cards', {
        params: {
          q: `set.id:${set.id}`,
          orderBy: 'number',
          page: i,
        },
      });

      cards.push(...cardsResponse.data);

      if (cards.length >= cardsResponse.totalCount) {
        i = -1;
      }
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
      revalidate: 10, // 10 seconds
    };
  }
};

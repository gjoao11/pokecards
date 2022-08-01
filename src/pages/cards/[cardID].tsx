import { CardDetails } from '@/components/CardDetails';
import { BackPageButton } from '@/components/common/BackPageButton';
import { Container } from '@/components/common/Container';
import { api } from '@/services/api';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Card as CardType } from 'src/types';

interface CardPageProps {
  card: CardType;
}

const Card: NextPage<CardPageProps> = ({ card }) => {
  return (
    <>
      <Head>
        <title>{`${card.name} - ${card.set.name} - PokéCards`}</title>
        <meta
          name="description"
          content={`Pokémon TCG ${card.name} ${card.supertype} card.${card.flavorText ? ` ${card.flavorText}` : ''}`}
        />
      </Head>

      <Container css={{ display: 'flex', flexDirection: 'column', gap: '$8' }}>
        <div>
          <BackPageButton />
        </div>

        <CardDetails card={card} />
      </Container>
    </>
  );
};

export default Card;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const cardID = params?.cardID;

  try {
    const { data: response } = await api.get<{ data: CardType }>(`cards/${String(cardID)}`);
    const card = response.data;

    return {
      props: {
        card,
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

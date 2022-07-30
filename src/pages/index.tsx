import { Container } from '@/components/common/Container';
import { LoadMoreButton } from '@/components/common/LoadMoreButton';
import { Text } from '@/components/common/Text';
import { SetList } from '@/components/pages/home/SetList';
import { SetItem } from '@/components/pages/home/SetItem';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { api, apiRoutes } from '@/services/api';
import { PokemonTCGAPIRes, Set as SetType } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useMemo, useRef } from 'react';

type PageData = PokemonTCGAPIRes<SetType[]>;

interface HomeProps {
  initialSets: PageData;
}

const Home: NextPage<HomeProps> = ({ initialSets }) => {
  const numberOfPages = Math.ceil(initialSets.totalCount / 12);

  const fetchSets = async ({ pageParam = 1 }): Promise<PageData> => {
    const response = await apiRoutes.get<PokemonTCGAPIRes<SetType[]>>('/api/sets', {
      params: {
        page: pageParam,
      },
    });

    return response.data;
  };

  const { data, isError, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(['sets'], fetchSets, {
    getNextPageParam: lastPage => (lastPage.page < numberOfPages ? lastPage.page + 1 : null),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    initialData: { pages: [initialSets], pageParams: [1] },
  });

  const updatedSets = useMemo(() => {
    const formattedArray = data?.pages?.map(page => page.data).flat();

    return formattedArray;
  }, [data]);

  const infiniteScrollRef = useRef(null);

  useIntersectionObserver({
    target: infiniteScrollRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  if (isError) {
    return <span>There&apos;s something wrong.</span>;
  }

  return (
    <>
      <Head>
        <title>Expansions - PokéCards</title>
        <meta name="description" content="List of Pokémon TCG expansions and sets." />
      </Head>

      <Container css={{ display: 'flex', flexDirection: 'column', gap: '$8' }}>
        <Text as="h1" size="4">
          Pokémon TCG expansions
        </Text>

        <SetList>
          {updatedSets?.map(set => (
            <Link key={set.id} href={`/sets/${set.id}`} prefetch={false}>
              <a>
                <SetItem set={set} />
              </a>
            </Link>
          ))}
        </SetList>

        <div>
          <LoadMoreButton
            ref={infiniteScrollRef}
            type="button"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load Newer' : 'Nothing more to load'}
          </LoadMoreButton>
        </div>
      </Container>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get<PokemonTCGAPIRes<SetType[]>>('sets', {
    params: {
      pageSize: 12,
      page: 1,
      orderBy: '-releaseDate',
    },
  });

  const { data: initialSets } = response;

  return {
    props: {
      initialSets,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

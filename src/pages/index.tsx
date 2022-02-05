import { SetItem } from '@components/SetItem';
import { SetList } from '@components/SetList';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';
import { api } from '@services/api';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useMemo, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import styles from './Home.module.scss';

interface Set {
  id: string;
  name: string;
  series: string;
  total: number;
  images: {
    logo: string;
  };
}

interface PageData {
  data: Set[];
  page: number;
  totalCount: number;
}

interface HomeProps {
  initialSets: Set[];
}

export default function Home({ initialSets }: HomeProps) {
  const fetchSets = async ({ pageParam = 1 }): Promise<PageData> => {
    const response = await api.get('/sets', {
      params: {
        pageSize: 12,
        page: pageParam,
        orderBy: '-releaseDate',
      },
    });

    return response.data;
  };

  const { data, isError, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery('sets', fetchSets, {
      getNextPageParam: lastPage => {
        const numberOfPages = Math.ceil(lastPage.totalCount / 12);
        return lastPage.page < numberOfPages ? lastPage.page + 1 : null;
      },
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
    });

  const updatedSets = useMemo(() => {
    if (!data) {
      return initialSets;
    }

    const formattedArray = data?.pages?.map(page => page.data).flat();

    return formattedArray;
  }, [data, initialSets]);

  const infiniteScrollDivRef = useRef(null);

  useIntersectionObserver({
    target: infiniteScrollDivRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  if (isError) {
    return <span>There&apos;s something wrong.</span>;
  }

  return (
    <>
      <Head>
        <title>Sets - PokéCards</title>
      </Head>

      <div className={styles.container}>
        <main className={styles.contentContainer}>
          <h1>Pokémon TCG sets</h1>

          <SetList>
            {updatedSets?.map(set => (
              <Link key={set.id} href={`/sets/${set.id}`}>
                <a>
                  <SetItem set={set} />
                </a>
              </Link>
            ))}
          </SetList>

          <div ref={infiniteScrollDivRef}>
            {isFetchingNextPage && <span>Loading...</span>}
          </div>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get('/sets', {
    params: {
      pageSize: 12,
      page: 1,
      orderBy: '-releaseDate',
    },
  });

  const { data: initialSets } = await response.data;

  return {
    props: {
      initialSets,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

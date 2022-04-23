import { SetItem } from '@components/SetItem';
import { SetList } from '@components/SetList';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';
import { api } from '@services/api';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useMemo, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { Set as SetType } from 'src/types';
import styles from './Home.module.scss';

interface PageData {
  data: SetType[];
  page: number;
  totalCount: number;
}

interface HomeProps {
  initialSets: PageData;
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
      initialData: { pages: [initialSets], pageParams: [1] },
    });

  const updatedSets = useMemo(() => {
    const formattedArray = data?.pages?.map(page => page.data).flat();

    return formattedArray;
  }, [data]);

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
              <Link key={set.id} href={`/sets/${set.id}`} prefetch={false}>
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

  const { data: initialSets } = response;

  return {
    props: {
      initialSets,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

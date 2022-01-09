import Head from 'next/head'
import Link from 'next/link'
import { useMemo, useRef } from 'react'
import { useInfiniteQuery } from 'react-query'

import { SetItem } from '../components/SetItem'
import { SetList } from '../components/SetList'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { api } from '../services/api'

import styles from './Home.module.scss'

interface Set {
  id: string;
  name: string;
  series: string;
  total: number;
  images: {
    logo: string;
  }
}

interface PageData {
  data: Set[];
  page: number;
  totalCount: number;
}

export default function Home() {
  const fetchSets = async ({ pageParam = 1 }): Promise<PageData> => {
    const response = await api.get('/sets', {
      params: {
        pageSize: 12,
        page: pageParam,
        orderBy: '-releaseDate',
      },
    });

    return response.data;
  }

  const {
    data,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('sets', fetchSets, {
    getNextPageParam: lastPage => {
      const numberOfPages = Math.ceil(lastPage.totalCount / 12)

      return lastPage.page < numberOfPages ? lastPage.page + 1 : null
    },
    refetchInterval: 1000 * 60 * 60 * 24, // 24 hours
  })

  const updatedSets = useMemo(() => {
    const formattedArray = data?.pages.map(page => page.data).flat();

    return formattedArray;
  }, [data]);

  const infiniteScrollDivRef = useRef(null)

  useIntersectionObserver({
    target: infiniteScrollDivRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  })

  if (isError) {
    return <span>There&apos;s something wrong.</span>
  }

  return (
    <>
      <Head>
        <title>Sets - PokéCards</title>
      </Head>

      <main className={styles.contentContainer}>
        <h1>Pokémon TCG sets</h1>

        <SetList>
          {updatedSets?.map((set) => (
            <Link key={set.id} href={`/sets/${set.id}`} >
              <a><SetItem set={set} /></a>
            </Link>
          ))}
        </SetList>

        <div ref={infiniteScrollDivRef}>
          {isFetchingNextPage && <span>Loading...</span>}
        </div>
      </main>
    </>
  )
}

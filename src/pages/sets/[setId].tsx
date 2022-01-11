import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useMemo, useRef } from 'react'
import { useInfiniteQuery } from 'react-query'
import { FiArrowLeft } from 'react-icons/fi'

import { CardList } from '../../components/CardList'
import { CardItem } from '../../components/CardItem'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { api } from '../../services/api'

import styles from './Set.module.scss'
import { useRouter } from 'next/router'

interface Set {
  id: string;
  name: string;
  series: string;
  total: number;
  images: {
    logo: string;
  }
}

interface Card {
  id: string;
  name: string;
  supertype: string;
  images: {
    small: string;
  }
}

interface PageData {
  data: Card[];
  page: number;
  totalCount: number;
}

interface SetProps {
  set: Set;
}

export default function Set({ set }: SetProps) {
  const router = useRouter()

  const fetchSets = async ({ pageParam = 1 }): Promise<PageData> => {
    const response = await api.get('/cards', {
      params: {
        q: `set.id:${set.id}`,
        pageSize: 12,
        page: pageParam,
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

  const updatedCards = useMemo(() => {
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
        <title>{set.name} - PokéCards</title>
      </Head>

      <div className={styles.container}>
        <button className={styles.returnButton} onClick={router.back}>
          <FiArrowLeft size={20} color="#b4b4b6" />
          <span>Home</span>
        </button>

        <main className={styles.contentContainer}>
          <h1>{set.series} - {set.name}</h1>

          <CardList>
            {updatedCards?.map(card => (
              <CardItem key={card.id} card={card} />
            ))}
          </CardList>

          <div ref={infiniteScrollDivRef}>
            {isFetchingNextPage && <span>Loading...</span>}
          </div>
        </main>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const setId = params?.setId

  const response = await api.get(`/sets/${String(setId)}`)
  const { data: set } = await response.data

  return {
    props: {
      set,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}

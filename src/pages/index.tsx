import type { GetStaticProps } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import useInView from 'react-cool-inview'
import { Header } from '../components/Header'
import { SetItem } from '../components/SetItem'
import { SetList } from '../components/SetList'
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

interface HomeProps {
  sets: Set[];
  pageSize: number;
  lastPage: number;
}

export default function Home({ sets, pageSize, lastPage }: HomeProps) {
  const [updatedSets, setUpdatedSets] = useState(sets.reverse())
  const [currentPage, setCurrentPage] = useState(lastPage - 1)

  const { observe } = useInView({
    rootMargin: "400px 0px",
    onEnter: ({ unobserve }) => {
      unobserve();

      setCurrentPage(currentPage - 1)

      if (currentPage <= 0) {
        return
      }

      api.get('/sets', {
        params: {
          page: currentPage,
          pageSize,
          orderBy: 'releaseDate',
        }
      }).then(response => {
        const { data: newSets } = response.data
        setUpdatedSets([...updatedSets, ...newSets.reverse()])
      })
    },
  })

  return (
    <>
      <Head>
        <title>Sets - PokéCards</title>
      </Head>

      <Header />

      <main className={styles.contentContainer}>
        <h1>Pokémon TCG sets</h1>

        <SetList>
          {updatedSets.map((set) => (
            <div
              ref={currentPage > 0 ? observe : null}
              key={set.id}>
              <SetItem set={set} />
            </div>
          ))}
        </SetList>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: { totalCount } } = await api.get('/sets', {
    params: { pageSize: 12 }
  })

  const pageSize = 12
  const lastPage = Math.ceil(totalCount / pageSize)

  const response = await api.get('/sets', {
    params: {
      page: lastPage,
      pageSize,
      orderBy: 'releaseDate',
    }
  })

  const { data: sets } = await response.data

  return {
    props: {
      sets,
      pageSize,
      lastPage,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}

import type { GetStaticProps } from 'next'
import { Header } from '../components/Header'
import { SetList } from '../components/SetList'
import { api } from '../services/api'
import styles from './Home.module.scss'

interface Set {
  id: string;
  name: string;
  series: string;
  total: number;
  images: {
    symbol: string;
  }
}

interface HomeProps {
  sets: Set[];
}

export default function Home({ sets }: HomeProps) {
  return (
    <>
      <Header />

      <main className={styles.contentContainer}>
        <h1>Pokémon TCG expansions</h1>

        <SetList sets={sets} />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get('/sets')

  const sets = await response.data.data

  return {
    props: {
      sets,
    }
  }
}

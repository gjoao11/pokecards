import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import { api } from '../../services/api'

interface Set {
  id: string;
  name: string;
  series: string;
  total: number;
  images: {
    logo: string;
  }
}

interface SetProps {
  set: Set;
}

export default function Set({ set }: SetProps) {

  return (
    <>
      <Head>
        <title>{set.name} - PokéCards</title>
      </Head>

      <div>
        <h1>{set.name}</h1>
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

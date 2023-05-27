import Head from "next/head"
import { getSession } from "next-auth/react"
import useMovieList from "@/hooks/useMovieList"

// components
import Navbar from "@/components/Navbar"
import BillBoard from "@/components/BillBoard"
import MovieList from "@/components/MovieList"

export default function Home() {
  const { data: movies } = useMovieList()
  console.log('data (NEXT SSR: /): >>>>>>>>>>', movies)

  return (
    <>
      <Head>
        <title>Home | Netflix</title>
      </Head>

      <>
        <Navbar />
        <BillBoard />
        <div className="pb-40">
          <MovieList title="Trending Now" data={movies} />
        </div>
      </>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  console.log('session (NEXT SSR: /): >>>>>>>>>>', session)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

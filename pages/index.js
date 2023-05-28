import Head from "next/head"
import { getSession } from "next-auth/react"
import useMovieList from "@/hooks/useMovieList"
import useInfoModalStore from '@/hooks/useInfoModalStore'

// components
import Navbar from "@/components/Navbar"
import BillBoard from "@/components/BillBoard"
import MovieList from "@/components/MovieList"
import InfoModal from "@/components/InfoModal"

export default function Home() {
  const { data: movies } = useMovieList()
  const { isOpen, closeModal } = useInfoModalStore()

  return (
    <>
      <Head>
        <title>Home | Netflix</title>
      </Head>

      <>
        <InfoModal visible={isOpen} onClose={closeModal} />
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

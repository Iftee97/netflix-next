import Head from "next/head"
import { useRouter } from "next/router"
import useMovie from "@/hooks/useMovie"
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function movieId() {
  const router = useRouter()
  const { movieId } = router.query

  const { data } = useMovie(movieId)

  return (
    <>
      <Head>
        <title>
          Watch {data?.title} | Netflix
        </title>
      </Head>

      <div className="h-screen w-screen bg-black">
        <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
          <ArrowLeftIcon
            className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition"
            onClick={() => router.push('/')}
          />
          <p className="text-white text-xl md:text-3xl font-bold">
            <span className="font-light">
              Watching: {' '}
            </span>
            {data?.title}
          </p>
        </nav>
        <video
          src={data?.videoUrl}
          className="h-full w-full"
          autoPlay
          controls
        />
      </div>
    </>
  )
}
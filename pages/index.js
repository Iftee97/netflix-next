import Head from "next/head"
import Link from "next/link"
import { useEffect } from "react"
import { signOut, getSession } from "next-auth/react"
import useCurrentUser from "@/hooks/useCurrentUser"

import movies from "@/movies.json"

// components
import Navbar from "@/components/Navbar"

export default function Home() {
  const { data: user, isLoading } = useCurrentUser()
  console.log('user: >>>>>>>>>>', user)

  async function addMoviesToDb() {
    const response = await fetch('/api/add-movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movies),
    })
    if (response.ok) {
      const data = await response.json()
      console.log('data: >>>>>>>>>>', data);
    }
  }

  async function deleteMoviesFromDb() {
    const response = await fetch('/api/delete-movies', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if (response.ok) {
      const data = await response.json()
      console.log('data: >>>>>>>>>>', data);
    }
  }

  return (
    <>
      <Head>
        <title>Home | Netflix</title>
      </Head>

      <>
        <Navbar />

        <>
          {/* <div className="flex items-center gap-4 mt-[100px] ml-[100px]">
            <button onClick={addMoviesToDb} className="text-white">
              add movies to db
            </button>
            <button onClick={deleteMoviesFromDb} className="text-red-500">
              delete movies from db
            </button>
          </div> */}
        </>

        <>
          {/* <h1 className="text-5xl font-semibold text-red-700 text-center">
            Netflix
          </h1>
          {isLoading && (
            <h3 className="mt-4 text-2xl font-medium text-blue-500 text-center">
              Loading...
            </h3>
          )}
          {!isLoading && user && (
            <h3 className="mt-4 text-2xl font-medium text-blue-500 text-center">
              Welcome to Netflix, {user?.name}
            </h3>
          )}
          <div className="flex items-center justify-center gap-6 mt-6">
            {user && (
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2"
                onClick={() => signOut()}
              >
                Logout
              </button>
            )}
            <button className="text-blue-500 underline">
              <Link href="/auth">
                Auth
              </Link>
            </button>
          </div> */}
        </>
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

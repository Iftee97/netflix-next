import Head from "next/head"
import Link from "next/link"
import { signOut, getSession } from "next-auth/react"
import useCurrentUser from "@/hooks/useCurrentUser"

// components
import Navbar from "@/components/Navbar"

export default function Home() {
  const { data: user, isLoading } = useCurrentUser()
  console.log('user: >>>>>>>>>>', user)

  return (
    <>
      <Head>
        <title>Home | Netflix</title>
      </Head>

      <main>
        <Navbar />

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
      </main>
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

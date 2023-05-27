import Head from "next/head"
import Link from "next/link"
import { signOut, getSession, useSession } from "next-auth/react"

export default function Home() {
  const { data: session, status } = useSession()
  console.log('session: >>>>>>>>>>', session)
  console.log('status: >>>>>>>>>>', status)

  return (
    <>
      <Head>
        <title>Home | Netflix</title>
      </Head>

      <main>
        <h1 className="text-5xl font-semibold text-red-700 text-center">
          Netflix
        </h1>
        {session?.user && (
          <h3 className="mt-4 text-2xl font-medium text-blue-500 text-center">
            Welcome to Netflix, {session?.user?.name}
          </h3>
        )}
        <div className="flex items-center justify-center gap-6 mt-6">
          {session?.user && (
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
        </div>
      </main>
    </>
  )
}

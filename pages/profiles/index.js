import Link from 'next/link'
import { getSession } from 'next-auth/react'
import useCurrentUser from '@/hooks/useCurrentUser'
import Loading from '@/components/Loading'

export default function Profiles() {
  const { data: currentUser, isLoading } = useCurrentUser()

  const images = [
    '/images/default-blue.png',
    '/images/default-red.png',
    '/images/default-slate.png',
    '/images/default-green.png'
  ]
  const imgSrc = images[Math.floor(Math.random() * 4)]

  return (
    <div className="flex items-center justify-center h-full">
      <div className='flex flex-col'>
        <h1 className='text-3xl md:text-6xl text-white text-center'>
          Who is watching?
        </h1>
        <div className='flex items-center justify-center gap-8 mt-10'>
          <Link href='/'>
            <div className="group flex-row w-44 mx-auto">
              <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                <img
                  src={imgSrc}
                  alt={`${currentUser?.name} profile image}`}
                  draggable={false}
                  className="w-max h-max object-contain"
                />
              </div>
              <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                {isLoading ? (
                  <div className='flex items-center justify-center'>
                    <Loading />
                  </div>
                ) : `${currentUser?.name}`}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  const session = await getSession(context)
  console.log('session (NEXT SSR: /profiles): >>>>>>>>>>', session)

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

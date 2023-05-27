import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { getSession, signIn } from 'next-auth/react'

// components
import Input from "@/components/Input"
import Loading from "@/components/Loading"

// icons
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

export default function Auth() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [variant, setVariant] = useState("login")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  function toggleVariant() {
    setVariant(variant === "login" ? "register" : "login")
  }

  async function register() {
    try {
      setLoading(true)
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password
        }),
      })
      if (response.ok) {
        const data = await response.json()
        console.log('data: >>>>>>>>>', data)
        await login()
      }
      setLoading(false)
    } catch (error) {
      console.log('error: >>>>>>>>>', error)
      setError(error.message)
      setLoading(false)
    } finally {
      setName('')
      setEmail('')
      setPassword('')
    }
  }

  async function login() {
    try {
      setLoading(true)
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/' // redirect to / page after login
      })
      // router.push('/') // redirect to / page after login
      setLoading(false)
    } catch (error) {
      console.log('error: >>>>>>>>>', error)
      setError(error.message)
      setLoading(false)
    } finally {
      setEmail('')
      setPassword('')
    }
  }

  return (
    <>
      <Head>
        <title>Auth | Netflix</title>
      </Head>

      <div className="relative h-full w-full bg-[url('../public/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-black w-full h-full lg:bg-opacity-50">
          <nav className="px-12 py-5">
            <Link href='/'>
              <img src="/images/logo.png" className="h-12" alt="Logo" />
            </Link>
          </nav>
          <div className="flex justify-center">
            <div className="bg-black bg-opacity-90 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
              <h2 className="text-white text-4xl mb-8 font-semibold">
                {variant === "login" ? "Sign In" : "Sign Up"}
              </h2>
              <div className="flex flex-col gap-4">
                {variant === 'register' && (
                  <Input
                    id="name"
                    type="text"
                    label="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                )}
                <Input
                  id="email"
                  type="email"
                  label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  id="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition duration-200 ease-in-out"
                onClick={variant === 'login' ? login : register}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loading />
                  </span>
                ) : (
                  <span>
                    {variant === 'login' ? 'Login' : 'Sign up'}
                  </span>
                )}
              </button>
              <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                <button
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                  onClick={() => signIn('google', {
                    callbackUrl: '/'
                  })}
                >
                  <FcGoogle size={32} />
                </button>
                <button
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                  onClick={() => signIn('github', {
                    callbackUrl: '/'
                  })}
                >
                  <FaGithub size={32} />
                </button>
              </div>
              <p className="text-neutral-500 mt-12">
                {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
                <span
                  className="text-white ml-1 hover:underline cursor-pointer"
                  onClick={toggleVariant}
                >
                  {variant === 'login' ? 'Create an account' : 'Login'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context)
//   console.log('session: >>>>>>>>>>', session)

//   // uncomment later
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       }
//     }
//   }

//   return {
//     props: {
//       session: session || null
//     }
//   }
// }

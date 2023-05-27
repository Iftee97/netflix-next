import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { getSession, signIn } from 'next-auth/react'

import Input from "@/components/Input"
import Loading from "@/components/Loading"

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
        redirect: false,
        // callbackUrl: '/profiles'
      })
      // router.push('/profiles') // redirect to profiles page after login
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
        <title>Netflix | Auth</title>
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

import TextInput from '@/components/form/TextInput'
import Loading from '@/components/Loading'
import { auth } from '@/services/firebase'
import { AuthError, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { FormEventHandler, useEffect, useState } from 'react'
import { RiLoginBoxLine } from 'react-icons/ri'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/dashboard')
      } else {
        setIsLoading(false)
      }
    })
  }, [router])

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push('/dashboard')
      })
      .catch((err: AuthError) => {
        setError(err.message)
        setIsLoading(false)
      })
  }

  if (isLoading) return <Loading />

  return (
    <>
      <Head>
        <title>Sasja Admin | Login</title>
      </Head>
      <main className="flex h-screen">
        <h1 className="sr-only">Sasja Admin Login</h1>
        <figure className="relative flex-auto">
          <Image src="/handball-field.jpg" alt="Handball field." layout="fill" objectFit="cover" />
        </figure>
        <section className="flex max-w-xl flex-1 flex-col justify-center bg-white px-8">
          <h2 className="text-5xl">Sasja Admin</h2>
          <p className="mt-8 leading-relaxed text-dark">
            Meld je hier aan om de website van Sasja HC te beheren. Indien je niet beschikt over de
            juiste gegevens beschikt om aan te melden, neem dan contact op met{' '}
            <a href="mailto:website@sasja-antwerpen.beschikt" className="font-bold">
              website@sasja-antwerpen.be
            </a>
            .
          </p>
          <form onSubmit={submitHandler} className="mt-8 border-t-2 border-primary pt-8">
            <TextInput name="email" type="email" value={email} onChange={setEmail} />
            <TextInput
              name="password"
              type="password"
              value={password}
              onChange={setPassword}
              className="mt-4"
            />
            <button type="submit" className="btn btn-primary btn-text-icon mt-8 w-full">
              <span>Aanmelden</span>
              <RiLoginBoxLine />
            </button>
            {error && <p className="mt-4 text-center text-sm text-error">{error}</p>}
          </form>
        </section>
      </main>
    </>
  )
}

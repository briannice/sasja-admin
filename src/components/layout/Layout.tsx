import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import Loading from '@/components/Loading'
import { auth } from '@/services/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'
import React, { ReactNode, useEffect, useState } from 'react'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoading(false)
      } else {
        router.replace('/login')
      }
    })
  }, [router])

  if (isLoading) return <Loading />

  return (
    <div className="grid h-screen grid-cols-layout grid-rows-layout gap-4 bg-light p-4">
      <Header />
      <Sidebar />
      <main className="no-scrollbar overflow-y-scroll rounded-lg bg-white p-8 shadow">
        <div className="relative mx-auto max-w-screen-2xl">{children}</div>
      </main>
    </div>
  )
}

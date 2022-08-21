import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
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

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="grid h-screen grid-cols-layout grid-rows-layout gap-4 bg-light p-4">
      <Header />
      <Sidebar />
      <main className="overflow-y-scroll rounded-lg bg-white p-8 shadow">{children}</main>
    </div>
  )
}

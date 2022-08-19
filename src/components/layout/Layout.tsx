import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className="grid h-screen grid-cols-layout grid-rows-layout gap-4 bg-light p-4">
      <Header />
      <Sidebar />
      <main className="overflow-y-scroll rounded-lg bg-white p-8 shadow">{children}</main>
    </div>
  )
}

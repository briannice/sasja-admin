import React, { ReactNode } from 'react'
import Header from '~/components/layouts/Header'
import Sidebar from '~/components/layouts/Sidebar'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className="grid h-screen grid-cols-layout grid-rows-layout gap-4 bg-light p-4">
      <Header />
      <Sidebar />
      <main className="rounded-lg bg-white p-8 shadow">{children}</main>
    </div>
  )
}

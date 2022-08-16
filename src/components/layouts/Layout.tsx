import React, { ReactNode } from 'react'
import Header from '~/components/layouts/Header'
import Sidebar from '~/components/layouts/Sidebar'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}

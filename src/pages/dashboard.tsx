import Head from 'next/head'
import React from 'react'

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Sasja Admin | Dashboard</title>
      </Head>
      <h1>Dashboard</h1>
    </>
  )
}

DashboardPage.Layout = 'root'

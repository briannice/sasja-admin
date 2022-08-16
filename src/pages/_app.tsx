import { NextPage } from 'next'
import { AppProps } from 'next/app'
import React from 'react'
import Layout from '~/components/layout/Layout'

import '~/styles/main.css'

type NextPageWithLayout = NextPage & {
  Layout: string | undefined
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  if (Component.Layout === 'root') {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }

  return <Component {...pageProps} />
}

export default App

import 'antd/dist/antd.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import AuthProvider from '../contexts/auth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <title>Marque Saúde</title>
        <meta name="description" content="Marque Saúde Dashboard app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
export default MyApp

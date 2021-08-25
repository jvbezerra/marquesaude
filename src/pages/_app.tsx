import 'antd/dist/antd.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>Marque Saúde</title>
        <meta name="description" content="Marque Saúde Dashboard app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}
export default MyApp

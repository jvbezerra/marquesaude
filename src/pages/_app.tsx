import 'antd/dist/antd.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import { SWRConfig } from 'swr'
import api from '../services/api'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{
      revalidateOnFocus: false,
      fetcher: async (url: string) => {
        const { data } = await api.get(url)
        return data
      },
    }}>
      <Provider session={pageProps.session}>
        <Head>
          <title>Marque Saúde</title>
          <meta name="description" content="Marque Saúde dashboard app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </Provider>
    </SWRConfig>
  )
}
export default MyApp

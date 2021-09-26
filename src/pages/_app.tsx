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
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"/>
        </Head>
        <Component {...pageProps} />
      </Provider>
    </SWRConfig>
  )
}
export default MyApp

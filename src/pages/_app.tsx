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
        <Component {...pageProps} />
      </Provider>
    </SWRConfig>
  )
}
export default MyApp

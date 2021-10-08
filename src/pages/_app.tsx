import Head from 'next/head'
import type { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { SWRConfig } from 'swr'
import api from '../services/api'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';

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
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' />
        </Head>
        <ThemeProvider theme={createTheme({})}>
          <Component {...pageProps} />
          <ToastContainer/>
        </ThemeProvider>
      </Provider>
    </SWRConfig>
  )
}
export default MyApp

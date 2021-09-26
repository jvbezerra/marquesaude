import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-br">
        <Head>
          <meta name="description" content="Marque Saúde app"/>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body style={{ margin: 'unset' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
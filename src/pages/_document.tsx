import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-br" style={{ overflow: 'overlay' }}>
        <Head>
          <meta name="description" content="Marque Saúde app"/>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"/>

          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/favicon.icon"></link>
          <meta name="theme-color" content="#fff" />
        </Head>
        <body style={{ margin: 'unset' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
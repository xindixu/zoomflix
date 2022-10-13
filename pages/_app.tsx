import type { AppProps } from "next/app"
import Head from "next/head"
import "../styles/globals.css"
import "antd/dist/antd.css"

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>Zoomflex</Head>
      <Component {...pageProps} />
    </>
  )
}

export default App

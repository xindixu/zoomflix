import type { AppProps } from "next/app"
import Head from "next/head"
import "../styles/globals.css"
import "antd/dist/antd.css"
import { AuthContextProvider } from "../context/auth"

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>Zoomflex</Head>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  )
}

export default App

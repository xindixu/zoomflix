import type { AppProps } from "next/app"
import Head from "next/head"
import "../styles/globals.css"
import "antd/dist/reset.css"

import { AuthContextProvider } from "../context/auth"
import { Layout, Menu } from "antd"
import { useRouter } from "next/router"

const { Header, Content, Footer } = Layout

const ROUTES = {
  home: "/",
  meeting: "/meetings",
  signIn: "/sign-in",
}

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <>
      <Head>Zoomflex</Head>
      <AuthContextProvider>
        <Layout className="layout" style={{ height: "100vh" }}>
          <Header>
            <Menu
              theme="dark"
              mode="horizontal"
              onClick={({ key }) => router.push(ROUTES[key])}
              items={[
                { key: "home", label: "Home" },
                { key: "meeting", label: "Meeting" },
                { key: "signIn", label: "Sign In" },
              ]}
            />
          </Header>
          <Content style={{ padding: "48px", color: "black" }}>
            <div className="site-layout-content">
              <Component {...pageProps} />
            </div>
          </Content>
        </Layout>
      </AuthContextProvider>
    </>
  )
}

export default App

import React, { useContext } from "react"
import { useRouter } from "next/router"
import { Button, Menu } from "antd"
import AuthContext from "../context/auth"

const ROUTES = {
  home: "/",
  meetings: "/meetings/new",
  signIn: "/sign-in",
  signOut: "/sign-out",
}

const DEFAULT_ITEMS = [
  { key: "home", label: "Home" },
  { key: "meetings", label: "Meetings" },
]

const Nav = () => {
  const router = useRouter()
  const { currentUser, loaded } = useContext(AuthContext)

  const sessionItem =
    loaded && currentUser?.name
      ? { key: "signOut", label: currentUser?.name }
      : {
          key: "signIn",
          label: "Sign In",
        }

  return (
    <>
      <Menu
        theme="dark"
        mode="horizontal"
        onClick={({ key }) => {
          if (ROUTES[key]) {
            router.push(ROUTES[key], ROUTES[key])
          }
        }}
        items={DEFAULT_ITEMS}
      />
      <Button
        onClick={() => router.push(ROUTES[sessionItem.key])}
        style={{
          position: "absolute",
          top: 16,
          right: 16,
        }}
      >
        {sessionItem.label}
      </Button>
    </>
  )
}

export default Nav

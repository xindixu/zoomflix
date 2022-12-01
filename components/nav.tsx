import React, { useContext } from "react"
import { useRouter } from "next/router"
import { Menu } from "antd"
import AuthContext from "../context/auth"

const ROUTES = {
  home: "/",
  meeting: "/meetings",
  signIn: "/sign-in",
  signOut: "/sign-out",
}

const Nav = () => {
  const router = useRouter()
  const { currentUser } = useContext(AuthContext)
  const items = [
    { key: "home", label: "Home" },
    { key: "meeting", label: "Meeting" },
    { key: "signIn", label: "Sign In" },
  ]

  if (currentUser?.username) {
    items.push({
      key: "subMenu",
      label: currentUser.username,
      children: [{ key: "signOut", label: "Sign Out" }],
    })
  }
  return (
    <>
      <Menu
        theme="dark"
        mode="horizontal"
        onClick={({ key }) => router.push(ROUTES[key])}
        items={items}
      />
    </>
  )
}

export default Nav

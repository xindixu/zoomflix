import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Button, Menu } from "antd"
import AuthContext from "../context/auth"

const ROUTES = {
  home: "/",
  meetings: "/new-meeting",
  rooms: "/rooms",
  videos: "/videos",
  signIn: "/sign-in",
  signOut: "/sign-out",
}

const DEFAULT_ITEMS = [
  { key: "home", label: "Home" },
  { key: "meetings", label: "Meetings" },
  { key: "rooms", label: "Rooms" },
  { key: "videos", label: "Videos" },
]

const Nav = () => {
  const router = useRouter()
  const { currentUser, loaded } = useContext(AuthContext)

  const sessionItem =
    loaded && currentUser?.email
      ? { key: "signOut", label: currentUser?.email }
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

      <Button
        onClick={() => router.push("/meetings/1")}
        style={{
          position: "absolute",
          top: 16,
          right: 300,
        }}
      >
        Current meeting
      </Button>
    </>
  )
}

export default Nav

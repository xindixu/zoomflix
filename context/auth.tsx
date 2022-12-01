import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { CLIENT_ID } from "../lib/auth"

type TAuthContext = {
  currentUser?: {
    username: string
    accessToken: string
  }
  setCurrentUser: (user: any) => void
}

const AuthContext = React.createContext<TAuthContext>({
  setCurrentUser: () => {},
})

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const router = useRouter()

  useEffect(() => {
    if (window?.google) {
      const { google } = window
      google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: (res) => {
          setCurrentUser(res)
          router.push(
            {
              pathname: "/",
              query: {
                hint: "Welcome back",
                type: "success",
              },
            },
            "/"
          )
        },
      })
      // google.accounts.id.prompt()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser: (res) => {
          console.log(res)
          setCurrentUser(res)
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

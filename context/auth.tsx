import React, { useEffect, useState } from "react"

export type TUser = {
  email: string
  name: string
  uid: string
}

type TAuthContext = {
  currentUser?: TUser
  loaded?: boolean
  setCurrentUser: (user?: any) => void
}

const AuthContext = React.createContext<TAuthContext>({
  setCurrentUser: () => {},
})

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<TUser>()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const rawUser = localStorage?.getItem("user")
      if (rawUser) {
        const user = JSON.parse(rawUser)
        if (user) {
          setCurrentUser({
            email: user.email,
            name: user.name,
            uid: user.uid,
          })
        }
      }
    } catch (e) {
      console.error("Failed to parse user from local storage", e)
    }
    setLoaded(true)
  }, [])

  console.log(currentUser)
  return (
    <AuthContext.Provider
      value={{
        loaded,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

import React, { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import Session from "../components/session"
import { SIGNIN } from "../components/session/form"
import AuthContext from "../context/auth"
import { getCurrentUser } from "../lib/auth"

function SignIn() {
  const router = useRouter()
  // @ts-ignore
  const { setCurrentUser, isLoggedIn, userLoaded } = useContext(AuthContext)

  useEffect(() => {
    if (isLoggedIn) {
      router.push(
        {
          pathname: "/",
          query: {
            hint: "You've already logged in",
            type: "warning",
          },
        },
        "/"
      )
    }
  }, [])

  const onSuccess = async () => {
    await getCurrentUser().then(setCurrentUser)

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
  }

  return <Session type={SIGNIN} onSuccess={onSuccess} />
}

export default SignIn

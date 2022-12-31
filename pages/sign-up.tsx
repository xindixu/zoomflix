import React, { useContext } from "react"
import { useRouter } from "next/router"
import Session from "../components/session"
import { SIGNUP } from "../components/session"
import AuthContext from "../context/auth"

function SignUp() {
  const router = useRouter()
  const { setCurrentUser } = useContext(AuthContext)

  const onSuccess = async (res) => {
    const user = {
      email: res.email,
      uid: res.uid,
    }

    setCurrentUser(user)

    if (localStorage) {
      localStorage.setItem("user", JSON.stringify(user))
    }
    router.push(
      {
        pathname: "/",
        query: {
          hint: "Welcome!",
          type: "success",
        },
      },
      "/"
    )
  }
  return <Session type={SIGNUP} onSuccess={onSuccess} />
}

export default SignUp

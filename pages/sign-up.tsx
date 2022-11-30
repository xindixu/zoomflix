import React from "react"
import { useRouter } from "next/router"
import Session from "../components/session"
import { SIGNUP } from "../components/session"

function SignUp() {
  const router = useRouter()

  const onSuccess = () => {
    router.push("/")
  }
  return <Session type={SIGNUP} onSuccess={onSuccess} />
}

export default SignUp

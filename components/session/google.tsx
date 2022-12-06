import React, { useLayoutEffect } from "react"
import { SIGNIN, SIGNUP } from "./index"

type Props = {
  type: typeof SIGNIN | typeof SIGNUP
  onSuccess: (user: any) => void
}

const GOOGLE_LOGIN_BUTTON_ID = "google-login-button"

const Google = ({}: Props) => {
  useLayoutEffect(() => {
    // @ts-ignore

    window?.google.accounts.id.renderButton(
      document.getElementById(GOOGLE_LOGIN_BUTTON_ID),
      { theme: "outline", size: "large" }
    )
  }, [])

  return <div id={GOOGLE_LOGIN_BUTTON_ID}></div>
}

export default Google

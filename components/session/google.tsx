import React, { useEffect } from "react"

import { GoogleLogin } from "react-google-login"
import { SIGNIN, SIGNUP, BUTTON_TEXT } from "./index"

const CLIENT_ID =
  "763700428974-p8k77625c1vf43vm68260hoqouoocaef.apps.googleusercontent.com"

type Props = {
  type: typeof SIGNIN | typeof SIGNUP
  onSuccess: (user: any) => void
}

const Google = ({ type, onSuccess }: Props) => {
  useEffect(() => {
    const init = async () => {
      const gapi = await import("gapi-script").then((pack) => pack.gapi)
      const initClient = () => {
        gapi.client.init({
          clientId: CLIENT_ID,
          scope: "",
        })
      }

      gapi.load("client:auth2", initClient)
    }
    init()
  }, [])

  return (
    <GoogleLogin
      clientId={CLIENT_ID}
      buttonText={`${BUTTON_TEXT[type]} with Google`}
      onSuccess={(res) => {
        console.log(res)
        onSuccess(res)
      }}
      onFailure={(res) => {
        console.log("failed", res)
      }}
      cookiePolicy={"single_host_origin"}
      isSignedIn={true}
    />
  )
}

export default Google

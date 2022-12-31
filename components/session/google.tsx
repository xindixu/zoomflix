import { Button } from "antd"
import React, { useCallback } from "react"
import { BUTTON_TEXT, SIGNIN, SIGNUP } from "./index"
import { signInWithGoogle } from "../../lib/auth"

type Props = {
  type: typeof SIGNIN | typeof SIGNUP
  onSuccess: (user: any) => void
  setIsSubmitting: (isSubmitting: boolean) => void
}

const Google = ({ onSuccess, type, setIsSubmitting }: Props) => {
  const onClick = useCallback(async () => {
    setIsSubmitting(true)
    const user = await signInWithGoogle()
    onSuccess(user)
    setIsSubmitting(false)
  }, [onSuccess, setIsSubmitting])

  return <Button onClick={onClick}>{BUTTON_TEXT[type]} with Google</Button>
}

export default Google

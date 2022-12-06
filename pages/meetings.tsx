import React, { useContext } from "react"
import dynamic from "next/dynamic"

import AuthContext from "../context/auth"
import { useRouter } from "next/router"

const Call = dynamic(() => import("../components/call"), { ssr: false })

const Meetings = () => {
  const { currentUser } = useContext(AuthContext)
  const { query } = useRouter()
  console.log(currentUser?.email, currentUser?.username)
  return (
    <div>
      {query.roomId}
      <Call />
    </div>
  )
}

export default Meetings

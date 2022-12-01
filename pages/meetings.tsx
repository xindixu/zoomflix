import React, { useContext } from "react"
import dynamic from "next/dynamic"

import AuthContext from "../context/auth"

const Call = dynamic(() => import("../components/call"), { ssr: false })

const Meetings = () => {
  const { currentUser } = useContext(AuthContext)

  return (
    <div>
      <Call />
    </div>
  )
}

export default Meetings

import React from "react"
import dynamic from "next/dynamic"

const Call = dynamic(() => import("../../components/call"), { ssr: false })

type Props = {}

const Meetings = () => {
  return (
    <div>
      <Call />
    </div>
  )
}

export default Meetings

import React, { useContext, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import AuthContext from "../../context/auth"
import withProtectedRoute from "../../components/protected-routes"
import { getMeeting } from "../../lib/meetings"

const Call = dynamic(() => import("../../components/call"), { ssr: false })
const Video = dynamic(() => import("../../components/video"), { ssr: false })

const Meeting = () => {
  const router = useRouter()
  const { query } = router
  const { id } = query

  const { currentUser } = useContext(AuthContext)
  const { uid } = currentUser || {}
  const [url, setUrl] = useState("")
  const [hostId, setHostId] = useState("")

  useEffect(() => {
    if (!id || Array.isArray(id) || !uid) {
      return
    }
    const start = async () => {
      const meeting = await getMeeting(id)

      if (!meeting) {
        return router.push(
          {
            pathname: "/meetings/new",
            query: {
              hint: "Meeting not found",
              type: "warning",
            },
          },
          "/meetings/new"
        )
      }

      if (!meeting.participantIds?.includes(uid) && meeting.hostId !== uid) {
        return router.push(
          {
            pathname: "/meetings/new",
            query: {
              hint: "You are not invited to this meeting",
              type: "warning",
            },
          },
          "/meetings/new"
        )
      }
      setHostId(meeting.hostId)
      setUrl(meeting.videoUrl)
    }

    try {
      start()
    } catch (error) {
      console.error(error)
    }
  }, [id, uid])

  return (
    <div>
      {id && !Array.isArray(id) && uid && (
        <Call id={id} isHost={hostId === uid} />
      )}
      {id && !Array.isArray(id) && url && <Video url={url} id={id} />}
    </div>
  )
}

export default withProtectedRoute(Meeting)

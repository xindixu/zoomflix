import React, { useContext, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Button, Typography } from "antd"

import AuthContext from "../../context/auth"
import { useRouter } from "next/router"
import withProtectedRoute from "../../components/protected-routes"
import NextLink from "next/link"
import { getRoom, getVideo, getVideoUrlByRoomId } from "../../lib/api"

const Call = dynamic(() => import("../../components/call"), { ssr: false })
const Video = dynamic(() => import("../../components/video"), { ssr: false })

const Meeting = () => {
  const { currentUser } = useContext(AuthContext)
  const router = useRouter()
  const { query } = router
  const { id } = query

  const [url, setUrl] = useState("")
  const [hostId, setHostId] = useState(-1)

  useEffect(() => {
    if (id) {
      setHostId(window.localStorage.getItem("hostId"))
      setUrl("https://youtu.be/q80UL3FV5H0")

      //   const start = async () => {
      //     const room = await getRoom(id)
      //     const videoId = room.video_id
      //     setHostId(room.host_id)

      //     const video = await getVideo(videoId)
      //     setUrl(video.video_url)
      //   }
      //   try {
      //     start()
      //   } catch (error) {
      //     console.error(error)
      //   }
    }
  }, [id])

  return (
    <div>
      {id && hostId && <Call id={id} isHost={hostId === "1"} />}
      {url && <Video url={url} />}
    </div>
  )
}

// export default withProtectedRoute(Meeting)
export default Meeting

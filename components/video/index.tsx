import { Button } from "antd"
import React, { useCallback, useEffect, useRef, useState } from "react"
import videojs, { VideoJsPlayer } from "video.js"
import "video.js/dist/video-js.css"
import "videojs-youtube/dist/Youtube.min.js"
import useSyncVideos from "../../hooks/use-sync-videos"
import { updateVideo } from "../../lib/videos"

import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../../lib/firebase"

type Props = {
  id: string
  url: string
}

const DEFAULT_OPTIONS = {
  autoplay: false,
  controls: true,
  responsive: true,
  fluid: true,
}

const Video = ({ id, url }: Props) => {
  const videoWrapperRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<VideoJsPlayer | null>(null)
  const [shouldSkip, setShouldSkip] = useState(false)

  const options = {
    ...DEFAULT_OPTIONS,
    sources: [
      {
        type: "video/youtube",
        src: url,
      },
    ],
  }

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js")

      videoElement.classList.add("vjs-big-play-centered")
      videoWrapperRef?.current?.appendChild(videoElement)

      playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready")
      })
    }
  }, [])

  useEffect(() => {
    const player = playerRef.current

    return () => {
      // Dispose the Video.js player when the functional component unmounts
      if (player && !player.isDisposed()) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [playerRef])

  const sync = useCallback(
    async (video) => {
      if (shouldSkip) {
        return
      }

      await updateVideo(id, video)

      console.log("write to db")
    },
    [shouldSkip]
  )

  useEffect(() => {
    if (!shouldSkip) {
      return
    }

    const timer = setTimeout(() => {
      setShouldSkip(false)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [shouldSkip])

  useEffect(() => {
    const player = playerRef.current
    if (!player) {
      return
    }

    const onTimeUpdate = () => {
      // console.log("onTimeUpdate", player.currentTime())
    }

    const onSeeked = () => {
      console.log("onSeeked", player.currentTime())
      sync({
        paused: false,
        currentTime: player.currentTime(),
      })
    }

    const onPause = () => {
      console.log("onPause")
      sync({
        paused: true,
        currentTime: player.currentTime(),
      })
    }

    const onPlay = () => {
      console.log("onPlay")
      sync({
        paused: false,
        currentTime: player.currentTime(),
      })
    }

    player.on("timeupdate", onTimeUpdate)
    player.on("seeked", onSeeked)
    player.on("pause", onPause)
    player.on("play", onPlay)

    return () => {
      if (player) {
        player.off("timeupdate", onTimeUpdate)
        player.off("seeked", onSeeked)
        player.off("pause", onPause)
        player.off("play", onPlay)
      }
    }
  }, [playerRef.current, id, sync])

  useEffect(() => {
    const player = playerRef.current
    if (!player) {
      return
    }
    const videoRef = doc(db, `/videos/${id}`)

    // listen to changes in the database
    const unsubscribe = onSnapshot(videoRef, (doc) => {
      const data = doc.data()
      if (!data) {
        return
      }
      const { paused, currentTime } = data
      if (paused && !player.paused()) {
        player.pause()
        setShouldSkip(true)
      }
      if (!paused && player.paused()) {
        player.play()
        setShouldSkip(true)
      }
      if (player.currentTime() !== currentTime) {
        player.currentTime(currentTime)
        setShouldSkip(true)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [playerRef.current, id])

  return (
    <div>
      <div ref={videoWrapperRef} />
      <Button
        onClick={() => {
          playerRef.current?.currentTime(100)
        }}
      >
        go to 100
      </Button>
    </div>
  )
}

export default Video

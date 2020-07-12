import React, { useRef, useEffect, useState } from "react"

const Video = ({ source, currentSlide, position, currentPercentage }) => {
  const [play, setPlay] = useState(false)
  const videoEl = useRef(null)

  useEffect(() => {
    currentPercentage(0)
  }, [])

  useEffect(() => {
    if (position === currentSlide) {
      setPlay(true)
      videoEl.current.play()
    }
    if (position !== currentSlide) {
      videoEl.current.pause()
      videoEl.current.currentTime = 0
      setPlay(false)
    }
  }, [currentSlide, position])

  useEffect(() => {
    let interval = null
    if (play) {
      interval = setInterval(() => {
        currentPercentage(
          (videoEl.current.currentTime / videoEl.current.duration) * 100
        )
      }, 10)
    } else if (!play) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [play, currentPercentage])

  return (
    <>
      <video
        playsInline
        muted
        ref={videoEl}
        src={source}
        crossOrigin="anonymous"
      ></video>
    </>
  )
}

export default Video

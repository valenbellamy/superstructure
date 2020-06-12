import React, { useRef, useEffect, useState } from "react"
import ProgressBar from "./progressBar"

const Video = ({
  source,
  currentSlide,
  position,
  increment,
  currentPercentage,
  limit,
}) => {
  const [play, setPlay] = useState(false)
  const [percentage, setPercentage] = useState(0)
  const [readyState, setReadyState] = useState()
  const videoEl = useRef(null)

  useEffect(() => {
    videoEl.current.addEventListener("loadeddata", checkforVideo)
    if (position === currentSlide && readyState > 3) {
      setPlay(true)
      videoEl.current.play()
    }
    if (position !== currentSlide) {
      videoEl.current.pause()
      videoEl.current.currentTime = 0
      setPlay(false)
    }
  }, [currentSlide, position, readyState])

  useEffect(() => {
    let interval = null
    if (play) {
      interval = setInterval(() => {
        setPercentage(
          (videoEl.current.currentTime / videoEl.current.duration) * 100
        )
        currentPercentage(percentage)
      }, 10)
    } else if (!play) {
      clearInterval(interval)
    }
    if (percentage === 100) {
      videoEl.current.currentTime = 0
      setPercentage(0)
      currentPercentage(0)
      increment()
    }
    return () => clearInterval(interval)
  }, [percentage, play])

  const checkforVideo = () => {
    if (videoEl.current !== "null") {
      setReadyState(videoEl.current.readyState)
    }
  }

  return (
    <>
      <video
        playsInline
        //loop
        muted
        preload="auto"
        // poster={poster ? poster.file.url : placeholder}
        ref={videoEl}
      >
        <source src={require(`../assets/video/${source}`)} type="video/mp4" />
        {/* {system === "iOS" || browser === "Safari" ? (
          <source src={videoMp4.file.url} type={videoMp4.file.contentType} />
        ) : (
          <source src={videoWebm.file.url} type={videoWebm.file.contentType} />
        )} */}
        <p>Sorry, the video can't be displayed with your browser.</p>
      </video>
    </>
  )
}

export default Video

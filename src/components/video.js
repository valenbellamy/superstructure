import React, { useRef, useEffect, useState } from "react"
import ProgressBar from "./progressBar"

const Video = ({
  source,
  currentSlide,
  position,
  increment,
  currentPercentage,
}) => {
  const [play, setPlay] = useState(false)
  const [percentage, setPercentage] = useState(0)
  const videoEl = useRef(null)

  //const percentage = 40

  useEffect(() => {
    if (position === currentSlide) {
      setPlay(true)
      videoEl.current.play()
      //setPercentage()
    }
    if (play && position !== currentSlide) {
      videoEl.current.pause()
      videoEl.current.currentTime = 0
      setPlay(false)
    }
  }, [currentSlide, play, position])

  useEffect(() => {
    let interval = null
    if (play) {
      interval = setInterval(() => {
        setPercentage(
          (videoEl.current.currentTime / videoEl.current.duration) * 100
        )
        currentPercentage(
          (videoEl.current.currentTime / videoEl.current.duration) * 100
        )
      }, 10)
    } else if (!play && percentage !== 0) {
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

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
      <video playsInline preload="none" muted ref={videoEl}>
        <source src={source.file.url} type={source.file.contentType} />
        <p>Sorry, the video can't be displayed with your browser.</p>
      </video>
      {/* <video
        playsInline
        //loop
        muted
        //preload="auto"
        // poster={poster ? poster.file.url : placeholder}
        ref={videoEl}
      >
        <source src={require(`../assets/video/${source}`)} type="video/mp4" />
        {system === "iOS" || browser === "Safari" ? (
          <source src={videoMp4.file.url} type={videoMp4.file.contentType} />
        ) : (
          <source src={videoWebm.file.url} type={videoWebm.file.contentType} />
        )} 
        <p>Sorry, the video can't be displayed with your browser.</p>
      </video> */}
    </>
  )
}

export default Video

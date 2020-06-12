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
  const [readyState, setReadyState] = useState(0)
  const videoEl = useRef(null)

  // useEffect(() => {
  //   console.log("useEffect")
  //   videoEl.current.addEventListener("loadeddata", function () {
  //     console.log("ici")
  //     if (videoEl.current !== "null") {
  //       setReadyState(videoEl.current.readyState)
  //       console.log(readyState)
  //     }
  //   })
  // }, [])

  useEffect(() => {
    setPercentage(0)
    currentPercentage(0)
    if (position === currentSlide) {
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

  // const checkforVideo = () => {
  //   console.log("ici")
  //   if (videoEl.current !== "null") {
  //     setReadyState(videoEl.current.readyState)
  //     console.log(readyState)
  //   }
  // }

  const onLoadedData = () => {
    console.log(videoEl.current)
    setTimeout(() => {
      setReadyState(videoEl.current.readyState)
    }, 10)
  }

  return (
    <>
      <video playsInline muted ref={videoEl}>
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

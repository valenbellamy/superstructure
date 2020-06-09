import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Slider from "../components/slider"
import Nav from "../components/nav"
import Header from "../components/header"
import Modal from "../components/modal"
import useModal from "../components/hooks/useModal"

//context
import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from "../context/globalContext"

const navRoutes = [
  {
    id: 0,
    title: "not humble",
    path: "/not-humble",
    video: "featured-video.mp4",
    color: "#00ff00",
  },
  {
    id: 1,
    title: "bleeping easy",
    path: "/bleeping-easy",
    video: "video.mp4",
    color: "#0000ff",
  },
  {
    id: 2,
    title: "make it zero",
    path: "/make-it-zero",
    video: "featured-video.mp4",
    color: "#ff0000",
  },
  {
    id: 3,
    title: "it takes an island",
    path: "/it-takes-an-island",
    video: "video.mp4",
    color: "#00ffff",
  },
  {
    id: 4,
    title: "50 beaches",
    path: "/50-beaches",
    video: "featured-video.mp4",
    color: "#ff00ff",
  },
]

const IndexPage = ({ location }) => {
  const { isShowing, toggle } = useModal()
  const { currentColor, currentIndex } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()
  const [visible, setVisible] = useState(false)
  const [move, setMove] = useState(false)
  //console.log({ currentColor, currentIndex })
  useEffect(() => {
    if (currentIndex === 1000 || currentColor === "#000") {
      dispatch({
        type: "CHANGE_COLOR",
        color: `${navRoutes[0].color}`,
        index: 0,
      })
    }
  }, [currentIndex, currentColor])

  // useEffect(() => {
  //   console.log("ici")
  //   if (move) {
  //     setVisible(true)
  //     const timer = setTimeout(() => {
  //       setVisible(false)
  //       setMove(false)
  //     }, 3000)
  //     return () => clearTimeout(timer)
  //   }
  // }, [move])

  // useEffect(() => {

  // }, [])

  // var timeDelay = 0
  // var timer = setInterval(delayCheck, 1000)

  // const delayCheck = () => {
  //   if (timeDelay == 3) {
  //     setVisible(false)
  //     timeDelay = 0
  //   }
  //   timeDelay += 1
  // }

  const switchVisible = () => {
    //console.log("move")
    //e.preventDefault()
    // setVisible(true)
    // timeDelay = 0
    // clearInterval(timer)
    // var timer = setInterval(delayCheck, 1000)
    //return () => clearInterval(interval)
    //setMove(true)

    if (!isShowing) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
    //console.log("bouge")
    // let interval
    // let time = 0
    // if (!isShowing) {
    //   setVisible(true)
    //   let interval = setInterval(() => {
    //     time += 1
    //     //console.log(time)
    //   }, 1000)
    // }
    // if (time == 3) {
    //   clearInterval(interval)
    //   setVisible(false)
    //   time = 0
    // }
    // return () => clearInterval(interval)
  }

  return (
    <Layout>
      <SEO title="Home" />
      <div
        onMouseMove={() => {
          //e.persist()
          switchVisible()
        }}
      >
        <Header
          isShowingModal={isShowing}
          toggleModal={toggle}
          backUrl={location.pathname}
          currentColor={currentColor}
          isVisible={visible}
        />
        <Slider
          slides={navRoutes}
          isShowingModal={isShowing}
          currentColor={currentColor}
          currentIndex={currentIndex}
          nextSlug="projet"
          nextColor="#00ff00"
          isVisible={visible}
        />
        <Nav
          isShowingModal={isShowing}
          currentColor={currentColor}
          nextSlug="projet"
          nextColor="#00ff00"
          isVisible={visible}
        />
        <Modal
          isShowingModal={isShowing}
          toggleModal={toggle}
          currentColor={currentColor}
          content={
            currentIndex === 1000
              ? navRoutes[0].title
              : navRoutes[currentIndex].title
          }
          backUrl={location.pathname}
          //content="test"
        />
      </div>
    </Layout>
  )
}

export default IndexPage

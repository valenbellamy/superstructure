import React, { useEffect } from "react"
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

  useEffect(() => {
    if (currentIndex === null || currentColor === null) {
      dispatch({
        type: "CHANGE_COLOR",
        color: `${navRoutes[0].color}`,
        index: 0,
      })
    }
  }, [])

  return (
    <Layout>
      <SEO title="Home" />
      <Header
        isShowingModal={isShowing}
        toggleModal={toggle}
        backUrl={location.pathname}
      />
      <Slider
        slides={navRoutes}
        isShowingModal={isShowing}
        currentColor={currentColor}
        currentIndex={currentIndex}
        nextSlug="projet"
        nextColor="#00ff00"
      />
      <Nav currentColor={currentColor} nextSlug="projet" nextColor="#00ff00" />
      <Modal
        isShowingModal={isShowing}
        toggleModal={toggle}
        currentColor={currentColor}
        content={
          currentIndex === null
            ? navRoutes[0].title
            : navRoutes[currentIndex].title
        }
        backUrl={location.pathname}
        //content="test"
      />
    </Layout>
  )
}

export default IndexPage

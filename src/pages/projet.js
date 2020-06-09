import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
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
    title: "it takes an island",
    path: "/it-takes-an-island",
    video: "video.mp4",
    color: "#00ffff",
  },
]

const ProjetPage = ({ location }) => {
  const { isShowing, toggle } = useModal()
  const { currentColor, currentIndex } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (currentIndex === 1000 || currentColor === "#000") {
      dispatch({
        type: "CHANGE_COLOR",
        color: `${navRoutes[0].color}`,
        index: 0,
      })
    }
  }, [currentIndex, currentColor])

  const switchVisible = e => {
    e.preventDefault()
    if (!isShowing) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }
  return (
    <Layout>
      <SEO title="Projet" />
      <div
        onMouseMove={e => {
          e.persist()
          switchVisible(e)
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
          nextSlug=""
          nextColor="#00ff00"
          isVisible={visible}
        />
        <Nav currentColor={currentColor} nextSlug="" nextColor="#00ff00" />
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
        />
      </div>
    </Layout>
  )
}

export default ProjetPage

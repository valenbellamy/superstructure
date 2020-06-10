import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"

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
    title: "Projet video 1",
    path: "/not-humble",
    video: "featured-video.mp4",
    color: "#00ff00",
  },
  {
    id: 1,
    title: "Projet video 2",
    path: "/it-takes-an-island",
    video: "video.mp4",
    color: "#00ffff",
  },
]

const ProjetPage = ({ location, data }) => {
  const { isShowing, toggle } = useModal()
  const { currentColor, currentIndex } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (currentIndex === 1000 || currentColor === "#000") {
      dispatch({
        type: "CHANGE_COLOR",
        color: `${navRoutes[0].color}`,
        index: 0,
      })
    }
  }, [currentIndex, currentColor])

  let timer = null

  const handleMouseMove = () => {
    setVisible(true)
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      setVisible(false)
    }, 3000)
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (timer) clearTimeout(timer)
    }
  }, [])

  return (
    <Layout>
      <SEO title="Projet" />
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
      <Nav
        isShowingModal={isShowing}
        currentColor={currentColor}
        nextSlug=""
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
        imgTest={data.file.childImageSharp.fluid}
      />
    </Layout>
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "Canal-logo-logotype-1024x768-bleu.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default ProjetPage

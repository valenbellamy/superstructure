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
    title: "not humble",
    path: "/not-humble",
    video: "50-beaches.mp4",
    color: "#FFB27B",
  },
  {
    id: 1,
    title: "bleeping easy",
    path: "/bleeping-easy",
    video: "easy.mp4",
    color: "#0000ff",
  },
]

const IndexPage = ({ location, data }) => {
  const { isShowing, toggle } = useModal()
  const { currentColor, currentIndex } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

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
    const timer = setTimeout(() => {
      setMounted(true)
    }, 10)
    return () => clearTimeout(timer)
  })

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (timer) clearTimeout(timer)
    }
  }, [])

  return (
    <Layout>
      <SEO title="Home" />

      <div
      // style={{ opacity: mounted ? 1 : 0, transition: `opacity 0.3s` }}
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
          toggleModal={toggle}
        />
        <Nav
          isShowingModal={isShowing}
          currentColor={currentColor}
          nextSlug="projet"
          nextColor="#00ff00"
          isVisible={visible}
          toggleModal={toggle}
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
          imgTest={data.file.childImageSharp.fluid}
          backUrl={location.pathname}
          //content="test"
        />
      </div>
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

export default IndexPage

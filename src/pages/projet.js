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
  {
    id: 2,
    title: "make it zero",
    path: "/make-it-zero",
    video: "it-takes-an-island.mp4",
    color: "#ff0000",
  },
  {
    id: 3,
    title: "it takes an island",
    path: "/it-takes-an-island",
    video: "make-it-zero.mp4",
    color: "#00ffff",
  },
]

export const query = graphql`
  query {
    contentfulProjet(accueil: { eq: false }) {
      titre
      slider {
        id
        titre
        couleur
        video {
          file {
            url
            contentType
          }
        }
        logo {
          fluid(quality: 70) {
            ...GatsbyContentfulFluid_withWebp_noBase64
          }
        }
        logoGauche {
          fluid(quality: 70) {
            ...GatsbyContentfulFluid_withWebp_noBase64
          }
        }
        logoDroite {
          id
          fluid(quality: 70) {
            ...GatsbyContentfulFluid_withWebp_noBase64
          }
        }
        contenu {
          json
        }
      }
    }
    allContentfulProjet(filter: { accueil: { eq: true } }) {
      edges {
        node {
          slider {
            couleur
          }
        }
      }
    }
  }
`

const ProjetPage = ({ location, data }) => {
  const { isShowing, toggle } = useModal()
  const { currentColor, currentIndex } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()
  const [visible, setVisible] = useState(true)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    if (currentIndex === 1000 || currentColor === "#000") {
      dispatch({
        type: "CHANGE_COLOR",
        color: `${data.contentfulProjet.slider[0].couleur}`,
        index: 0,
      })
    }
  }, [currentIndex, currentColor])

  let timer = null
  const nextColor = data.allContentfulProjet.edges[0].node.slider[0].couleur
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
      {!isHidden && (
        <Slider
          slider={data.contentfulProjet.slider}
          slides={navRoutes}
          isShowingModal={isShowing}
          currentColor={currentColor}
          currentIndex={currentIndex}
          nextSlug=""
          nextColor={nextColor}
          isVisible={visible}
          toggleModal={toggle}
          isHidden={isHidden}
          setIsHidden={setIsHidden}
        />
      )}
      <Nav
        isShowingModal={isShowing}
        currentColor={currentColor}
        nextSlug=""
        nextColor={nextColor}
        isVisible={visible}
        toggleModal={toggle}
        isHidden={isHidden}
        setIsHidden={setIsHidden}
      />
      <Modal
        isShowingModal={isShowing}
        toggleModal={toggle}
        currentColor={currentColor}
        titre={
          currentIndex === 1000
            ? data.contentfulProjet.slider[0].titre
            : data.contentfulProjet.slider[currentIndex].titre
        }
        contenu={
          currentIndex === 1000
            ? data.contentfulProjet.slider[0].contenu
            : data.contentfulProjet.slider[currentIndex].contenu
        }
        logoGauche={
          currentIndex === 1000
            ? data.contentfulProjet.slider[0].logoGauche.fluid
            : data.contentfulProjet.slider[currentIndex].logoGauche.fluid
        }
        logoDroite={
          currentIndex === 1000
            ? data.contentfulProjet.slider[0].logoDroite
            : data.contentfulProjet.slider[currentIndex].logoDroite
        }
        backUrl={location.pathname}
      />
    </Layout>
  )
}

export default ProjetPage

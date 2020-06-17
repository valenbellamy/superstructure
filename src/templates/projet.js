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

export const query = graphql`
  query($slug: String!) {
    contentfulProjet(slug: { eq: $slug }) {
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

const Projet = ({ location, data, pageContext }) => {
  const { isShowing, toggle } = useModal()
  const { currentColor, currentIndex } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()
  const [visible, setVisible] = useState(true)
  const [hiddenSlider, setHiddenSlider] = useState(false)

  useEffect(() => {
    if (currentIndex === 1000 || currentColor === "#000") {
      initState()
    }
  }, [currentIndex, currentColor])

  const initState = () => {
    dispatch({
      type: "CHANGE_COLOR",
      color: `${data.contentfulProjet.slider[0].couleur}`,
      index: 0,
    })
  }

  const { prevSlug, nextSlug, prevColor, nextColor } = pageContext

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
  }, [timer])

  return (
    <Layout>
      <SEO title="Projet" />
      <Header
        isShowingModal={isShowing}
        toggleModal={toggle}
        currentColor={currentColor}
        isVisible={visible}
        backUrl={location.pathname}
      />
      {!hiddenSlider && (
        <Slider
          isShowingModal={isShowing}
          toggleModal={toggle}
          slider={data.contentfulProjet.slider}
          currentColor={currentColor}
          currentIndex={currentIndex}
          prevSlug={prevSlug === "" ? "" : `/projet/${prevSlug}`}
          prevColor={prevColor}
          nextSlug={nextSlug === "" ? "" : `/projet/${nextSlug}`}
          nextColor={nextColor}
          isVisible={visible}
          setHiddenSlider={setHiddenSlider}
        />
      )}
      <Nav
        isShowingModal={isShowing}
        currentColor={currentColor}
        prevSlug={prevSlug === "" ? "" : `/projet/${prevSlug}`}
        prevColor={prevColor}
        nextSlug={nextSlug === "" ? "" : `/projet/${nextSlug}`}
        nextColor={nextColor}
        isVisible={visible}
        toggleModal={toggle}
        setHiddenSlider={setHiddenSlider}
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

export default Projet

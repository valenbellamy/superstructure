import React, { useEffect, useState, useCallback } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Slider from "../components/slider"
import Nav from "../components/nav"
import Header from "../components/header"
import Modal from "../components/modal"
import useModal from "../components/hooks/useModal"
import useMouseMove from "../components/hooks/useMouseMove"

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
        lienVimeo
        video {
          file {
            url
            contentType
          }
        }
        logoGauche {
          fluid(quality: 50) {
            ...GatsbyContentfulFluid_withWebp_noBase64
          }
        }
        logoDroite {
          id
          fluid(quality: 50) {
            ...GatsbyContentfulFluid_withWebp_noBase64
          }
        }
        logoDroiteSmartphone {
          id
          fluid(quality: 50) {
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
  //const [visible, setVisible] = useState(true)
  const visible = useMouseMove(true)
  const [hiddenSlider, setHiddenSlider] = useState(false)

  useEffect(() => {
    if (currentIndex === null || currentColor === "#000") {
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

  const setLogoGauche = useCallback(() => {
    if (currentIndex === null) {
      if (data.contentfulProjet.slider[0].logoGauche !== null) {
        return data.contentfulProjet.slider[0].logoGauche.fluid
      } else {
        return null
      }
    } else {
      if (data.contentfulProjet.slider[currentIndex].logoGauche !== null) {
        return data.contentfulProjet.slider[currentIndex].logoGauche.fluid
      } else {
        return null
      }
    }
  }, [currentIndex])

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
          titre={data.contentfulProjet.titre}
          currentColor={currentColor}
          currentIndex={currentIndex}
          prevSlug={prevSlug === "" ? "" : `/projet/${prevSlug}`}
          prevColor={prevColor}
          nextSlug={nextSlug === "" ? "" : `/projet/${nextSlug}`}
          nextColor={nextColor}
          isVisible={visible}
          setHiddenSlider={setHiddenSlider}
          backUrl={location.pathname}
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
          currentIndex === null
            ? data.contentfulProjet.slider[0].titre
            : data.contentfulProjet.slider[currentIndex].titre
        }
        contenu={
          currentIndex === null
            ? data.contentfulProjet.slider[0].contenu
            : data.contentfulProjet.slider[currentIndex].contenu
        }
        logoGauche={setLogoGauche()}
        logoDroite={
          currentIndex === null
            ? data.contentfulProjet.slider[0].logoDroite
            : data.contentfulProjet.slider[currentIndex].logoDroite
        }
        logoDroiteSmartphone={
          currentIndex === null
            ? data.contentfulProjet.slider[0].logoDroiteSmartphone
            : data.contentfulProjet.slider[currentIndex].logoDroiteSmartphone
        }
        backUrl={location.pathname}
      />
    </Layout>
  )
}

export default Projet

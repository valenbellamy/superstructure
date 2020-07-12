import React, { useEffect, useState, useCallback } from "react"
import { graphql, navigate } from "gatsby"

import { isLoggedIn } from "../services/auth"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SliderPrivate from "../components/sliderPrivate"
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
    contentfulProjetPrive(slug: { eq: $slug }) {
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
  }
`

const Private = ({ location, data, pageContext }) => {
  const { isShowing, toggle } = useModal()
  const { currentColor, currentIndex } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()
  const visible = useMouseMove(true)
  const [hiddenSlider, setHiddenSlider] = useState(false)
  const [logged, setLogged] = useState(false)

  useEffect(() => {
    if (currentIndex === null || currentColor === "#000") {
      initState()
    }
  }, [currentIndex, currentColor])

  const initState = () => {
    dispatch({
      type: "CHANGE_COLOR",
      color: `${data.contentfulProjetPrive.slider[0].couleur}`,
      index: 0,
    })
  }

  const { prevSlug, nextSlug, prevColor, nextColor } = pageContext

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate(`/prive`)
    } else {
      setLogged(true)
    }
  }, [])

  const setLogoGauche = useCallback(() => {
    if (currentIndex === null) {
      if (data.contentfulProjetPrive.slider[0].logoGauche !== null) {
        return data.contentfulProjetPrive.slider[0].logoGauche.fluid
      } else {
        return null
      }
    } else {
      if (data.contentfulProjetPrive.slider[currentIndex].logoGauche !== null) {
        return data.contentfulProjetPrive.slider[currentIndex].logoGauche.fluid
      } else {
        return null
      }
    }
  }, [currentIndex])

  return (
    <Layout>
      <SEO title="Projet" />
      {logged && (
        <>
          <Header
            isShowingModal={isShowing}
            toggleModal={toggle}
            currentColor={currentColor}
            isVisible={visible}
            backUrl={location.pathname}
          />
          {!hiddenSlider && (
            <SliderPrivate
              isShowingModal={isShowing}
              toggleModal={toggle}
              slider={data.contentfulProjetPrive.slider}
              titre={data.contentfulProjetPrive.titre}
              currentColor={currentColor}
              currentIndex={currentIndex}
              prevSlug={`/prive/${prevSlug}`}
              prevColor={prevColor}
              nextSlug={`/prive/${nextSlug}`}
              nextColor={nextColor}
              isVisible={visible}
              setHiddenSlider={setHiddenSlider}
              backUrl={location.pathname}
            />
          )}
          <Nav
            isShowingModal={isShowing}
            currentColor={currentColor}
            prevSlug={`/prive/${prevSlug}`}
            prevColor={prevColor}
            nextSlug={`/prive/${nextSlug}`}
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
                ? data.contentfulProjetPrive.slider[0].titre
                : data.contentfulProjetPrive.slider[currentIndex].titre
            }
            contenu={
              currentIndex === null
                ? data.contentfulProjetPrive.slider[0].contenu
                : data.contentfulProjetPrive.slider[currentIndex].contenu
            }
            logoGauche={setLogoGauche()}
            logoDroite={
              currentIndex === null
                ? data.contentfulProjetPrive.slider[0].logoDroite
                : data.contentfulProjetPrive.slider[currentIndex].logoDroite
            }
            logoDroiteSmartphone={
              currentIndex === null
                ? data.contentfulProjetPrive.slider[0].logoDroiteSmartphone
                : data.contentfulProjetPrive.slider[currentIndex]
                    .logoDroiteSmartphone
            }
            backUrl={location.pathname}
          />
        </>
      )}
    </Layout>
  )
}

export default Private

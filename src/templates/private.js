import React, { useEffect, useState } from "react"
import { graphql, navigate } from "gatsby"

import { isLoggedIn } from "../services/auth"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SliderPrivate from "../components/sliderPrivate"
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
    contentfulProjetPrive(slug: { eq: $slug }) {
      titre
      slider {
        id
        titre
        couleur
        lienVimeo
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
  const [visible, setVisible] = useState(true)
  const [hiddenSlider, setHiddenSlider] = useState(false)
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [logged, setLogged] = useState(false)

  useEffect(() => {
    if (currentIndex === 1000 || currentColor === "#000") {
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

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate(`/prive`)
    } else {
      setLogged(true)
    }
  }, [])

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
              currentIndex === 1000
                ? data.contentfulProjetPrive.slider[0].titre
                : data.contentfulProjetPrive.slider[currentIndex].titre
            }
            contenu={
              currentIndex === 1000
                ? data.contentfulProjetPrive.slider[0].contenu
                : data.contentfulProjetPrive.slider[currentIndex].contenu
            }
            logoGauche={
              currentIndex === 1000
                ? data.contentfulProjetPrive.slider[0].logoGauche.fluid
                : data.contentfulProjetPrive.slider[currentIndex].logoGauche
                    .fluid
            }
            logoDroite={
              currentIndex === 1000
                ? data.contentfulProjetPrive.slider[0].logoDroite
                : data.contentfulProjetPrive.slider[currentIndex].logoDroite
            }
            backUrl={location.pathname}
          />
        </>
      )}
    </Layout>
  )
}

export default Private

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
  query {
    contentfulProjet(accueil: { eq: true }) {
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
    allContentfulProjet(
      filter: { accueil: { ne: true } }
      sort: { fields: ordre, order: ASC }
    ) {
      edges {
        node {
          slider {
            couleur
          }
          slug
        }
      }
    }
  }
`

const IndexPage = ({ location, data }) => {
  const { isShowing, toggle } = useModal()
  const { currentColor, currentIndex } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()
  const [visible, setVisible] = useState(false)
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

  const projectLength = data.allContentfulProjet.edges.length
  const nextColor = data.allContentfulProjet.edges[0].node.slider[0].couleur
  const prevColor =
    data.allContentfulProjet.edges[projectLength - 1].node.slider[0].couleur
  const prevSlug =
    data.allContentfulProjet.edges[projectLength - 1].node.slug === ""
      ? ""
      : `/projet/${data.allContentfulProjet.edges[projectLength - 1].node.slug}`
  const nextSlug =
    data.allContentfulProjet.edges[0].node.slug === ""
      ? ""
      : `/projet/${data.allContentfulProjet.edges[0].node.slug}`

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
      <SEO title="Home" />
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
          prevSlug={prevSlug}
          prevColor={prevColor}
          nextSlug={nextSlug}
          nextColor={nextColor}
          isVisible={visible}
          setHiddenSlider={setHiddenSlider}
        />
      )}

      <Nav
        isShowingModal={isShowing}
        toggleModal={toggle}
        currentColor={currentColor}
        prevSlug={prevSlug}
        prevColor={prevColor}
        nextSlug={nextSlug}
        nextColor={nextColor}
        isVisible={visible}
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

export default IndexPage

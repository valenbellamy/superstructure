import React, { useEffect, useState } from "react"
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
          fluid(quality: 50) {
            ...GatsbyContentfulFluid_withWebp_noBase64
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
  //const [visible, setVisible] = useState(false)
  const visible = useMouseMove(false)
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
          titre={data.contentfulProjet.titre}
          currentColor={currentColor}
          currentIndex={currentIndex}
          prevSlug={prevSlug}
          prevColor={prevColor}
          nextSlug={nextSlug}
          nextColor={nextColor}
          isVisible={visible}
          setHiddenSlider={setHiddenSlider}
          backUrl={location.pathname}
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
          currentIndex === null
            ? data.contentfulProjet.slider[0].titre
            : data.contentfulProjet.slider[currentIndex].titre
        }
        contenu={
          currentIndex === null
            ? data.contentfulProjet.slider[0].contenu
            : data.contentfulProjet.slider[currentIndex].contenu
        }
        logoGauche={
          currentIndex === null
            ? data.contentfulProjet.slider[0].logoGauche.fluid
            : data.contentfulProjet.slider[currentIndex].logoGauche.fluid
        }
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

export default IndexPage

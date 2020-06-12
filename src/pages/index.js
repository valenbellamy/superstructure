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
          contenu
        }
      }
    }
    allContentfulProjet(filter: { ordre: { eq: 1 } }) {
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

const IndexPage = ({ location, data }) => {
  const { isShowing, toggle } = useModal()
  const { currentColor, currentIndex } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()
  const [visible, setVisible] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  useEffect(() => {
    if (currentIndex === 1000 || currentColor === "#000") {
      dispatch({
        type: "CHANGE_COLOR",
        //color: `${navRoutes[0].color}`,
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
      <SEO title="Home" />
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
          nextSlug="projet"
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
        nextSlug="projet"
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
        content={
          currentIndex === 1000
            ? data.contentfulProjet.slider[0].titre
            : data.contentfulProjet.slider[currentIndex].titre
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

// export const query = graphql`
//   query {
//     file(relativePath: { eq: "Canal-logo-logotype-1024x768-bleu.png" }) {
//       childImageSharp {
//         fluid {
//           ...GatsbyImageSharpFluid
//         }
//       }
//     }
//   }
// `

export default IndexPage

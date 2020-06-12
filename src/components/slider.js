import React, { useEffect, useState } from "react"
import Video from "./video"
import { navigate } from "gatsby"
import ProgressBar from "./progressBar"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

//context
import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from "../context/globalContext"

const Slider = ({
  slides,
  isShowingModal,
  currentColor,
  currentIndex,
  nextSlug,
  nextColor,
  isVisible,
  toggleModal,
}) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "logo-test.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const limit = slides.length
  const dispatch = useGlobalDispatchContext()
  const [percentage, setPercentage] = useState(0)
  const [isHidden, setIsHidden] = useState(false)

  const indexClick = i => {
    changeLocalStorage(i)
  }

  const increment = () => {
    if (currentIndex === limit - 1) {
      if (isShowingModal) {
        toggleModal()
      }
      setIsHidden(true)
      navigate(`${nextSlug}`)
      dispatch({
        type: "CHANGE_COLOR",
        color: `${nextColor}`,
        index: 0,
      })
    } else {
      changeLocalStorage(currentIndex + 1)
    }
  }

  const changeLocalStorage = current => {
    dispatch({
      type: "CHANGE_COLOR",
      color: `${slides[current].color}`,
      index: current,
    })
  }

  const setCurrentPercentage = value => {
    setPercentage(value)
  }

  const indicatorsClasses = () => {
    if (isShowingModal) {
      return "--centered"
    } else {
      if (isVisible) {
        return ""
      } else {
        return "--hidden"
      }
    }
  }

  return (
    <>
      {!isHidden && (
        <>
          <section className="slider">
            <div className="slider__container">
              {slides.map((route, i) => (
                <div
                  className={`slider__item ${currentIndex === i ? "--on" : ""}`}
                  key={route.id}
                >
                  <Video
                    source={route.video}
                    currentSlide={currentIndex}
                    position={i}
                    increment={increment}
                    currentPercentage={setCurrentPercentage}
                    limit={limit}
                  />
                  {!isShowingModal && (
                    <div
                      className="slider__item__content"
                      style={{ opacity: isVisible ? 1 : 0 }}
                    >
                      {/* <h2 style={{ color: currentColor }}>{route.title}</h2> */}
                      <Img fluid={data.file.childImageSharp.fluid} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
          <ol className={`slider__indicators ${indicatorsClasses()} `}>
            {slides.map((route, i) => (
              <li
                className={currentIndex === i ? "--active" : ""}
                key={route.id}
                onClick={() => indexClick(i)}
              >
                <button type="button" style={{ color: currentColor }}>
                  {route.id + 1}
                </button>
              </li>
            ))}
          </ol>
          <ProgressBar color={currentColor} percentage={percentage} />
        </>
      )}
    </>
  )
}

export default Slider

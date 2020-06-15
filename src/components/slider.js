import React, { useState } from "react"
import Video from "./video"
import { navigate } from "gatsby"
import ProgressBar from "./progressBar"
import Img from "gatsby-image"

//context
import { useGlobalDispatchContext } from "../context/globalContext"

const Slider = ({
  isShowingModal,
  toggleModal,
  slider,
  currentColor,
  currentIndex,
  nextSlug,
  nextColor,
  isVisible,
  setHiddenSlider,
}) => {
  const limit = slider.length
  const dispatch = useGlobalDispatchContext()
  const [percentage, setPercentage] = useState(0)

  const indexClick = i => {
    changeLocalStorage(i)
  }

  const increment = () => {
    if (currentIndex === limit - 1) {
      if (isShowingModal) {
        toggleModal()
      }
      setHiddenSlider(true)
      if (nextSlug === "") {
        navigate("")
      } else {
        navigate(`${nextSlug}`)
      }

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
      color: `${slider[current].couleur}`,
      index: current,
    })
  }

  const setCurrentPercentage = value => {
    setPercentage(value)
    if (value === 100) {
      //increment()
    }
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
      <section className="slider">
        <div className="slider__container">
          {slider.map((slide, i) => (
            <div
              className={`slider__item ${currentIndex === i ? "--on" : ""}`}
              key={slide.id}
            >
              <Video
                source={slide.video}
                currentSlide={currentIndex}
                position={i}
                currentPercentage={setCurrentPercentage}
              />
              {!isShowingModal && (
                <div
                  className="slider__item__content"
                  style={{ opacity: isVisible ? 1 : 0 }}
                >
                  <Img fluid={slide.logo.fluid} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      <ol className={`slider__indicators ${indicatorsClasses()} `}>
        {slider.map((route, i) => (
          <li className={currentIndex === i ? "--active" : ""} key={route.id}>
            <button
              type="button"
              onClick={() => indexClick(i)}
              style={{ color: currentColor }}
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ol>
      <ProgressBar color={currentColor} percentage={percentage} />
    </>
  )
}

export default Slider

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
  prevSlug,
  prevColor,
  nextSlug,
  nextColor,
  isVisible,
  setHiddenSlider,
}) => {
  const limit = slider.length
  const dispatch = useGlobalDispatchContext()
  const [percentage, setPercentage] = useState(0)
  const [isSwiping, setSwiping] = useState(false)
  const [x, setX] = useState(null)

  const indexClick = i => {
    changeLocalStorage(i)
  }

  const increment = () => {
    if (currentIndex === limit - 1) {
      // if (isShowingModal) {
      //   toggleModal()
      // }
      setHiddenSlider(true)
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
      color: `${slider[current].couleur}`,
      index: current,
    })
  }

  const setCurrentPercentage = value => {
    setPercentage(value)
    if (value === 100) {
      increment()
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

  var initialX = null

  const onTouchStart = e => {
    initialX = e.touches[0].clientX
    setX(initialX)
  }

  const onTouchEnd = e => {
    if (isSwiping) {
      var currentX = e.changedTouches[0].clientX
      var diffX = x - currentX
      if (Math.abs(diffX) > 50) {
        if (diffX < 0) {
          navigate(`${nextSlug}`)
          dispatch({
            type: "CHANGE_COLOR",
            color: `${nextColor}`,
            index: 0,
          })
        } else {
          navigate(`${prevSlug}`)
          dispatch({
            type: "CHANGE_COLOR",
            color: `${prevColor}`,
            index: 0,
          })
        }
      }
    }
  }

  return (
    <>
      <section
        className="slider"
        onTouchStart={e => {
          setSwiping(false)
          onTouchStart(e)
        }}
        onTouchMove={e => {
          setSwiping(true)
        }}
        onTouchEnd={e => {
          onTouchEnd(e)
          setSwiping(false)
        }}
      >
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
      {slider.length > 1 && (
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
      )}

      <ProgressBar color={currentColor} percentage={percentage} />
    </>
  )
}

export default Slider

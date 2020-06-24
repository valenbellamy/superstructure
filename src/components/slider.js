import React, { useState } from "react"
import Video from "./video"
import { navigate, Link } from "gatsby"
import ProgressBar from "./progressBar"
import Logo from "./logo"
import Logo2 from "./logo2"
import useWindowSize from "./hooks/useWindowSize"

//context
import { useGlobalDispatchContext } from "../context/globalContext"

const Slider = ({
  isShowingModal,
  toggleModal,
  slider,
  titre,
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
  const [width, height] = useWindowSize()

  const indexClick = i => {
    changeLocalStorage(i)
  }

  const increment = () => {
    if (currentIndex === limit - 1) {
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
            </div>
          ))}
        </div>
      </section>
      {!isShowingModal && (
        <>
          <div className="slider__title" style={{ opacity: isVisible ? 1 : 0 }}>
            <h1 style={{ color: currentColor }}>{titre}</h1>
          </div>
          <Link
            to="/contact"
            className={`slider__logo ${isVisible ? "" : "--hidden"}`}
          >
            {width > 575 ? (
              <Logo currentColor={currentColor} />
            ) : (
              <Logo2 currentColor={currentColor} />
            )}
          </Link>
        </>
      )}
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

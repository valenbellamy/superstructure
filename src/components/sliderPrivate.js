import React, { useState } from "react"
import VideoPrivate from "./videoPrivate"
import { navigate, Link } from "gatsby"
import ProgressBar from "./progressBar"
import Logo from "./logo"

//context
import { useGlobalDispatchContext } from "../context/globalContext"

const SliderPrivate = ({
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
  backUrl,
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
              <VideoPrivate
                source={
                  slide.video !== null ? slide.video.file.url : slide.lienVimeo
                }
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
          <button
            type="button"
            onClick={toggleModal}
            className="slider__title"
            style={{ opacity: isVisible ? 1 : 0 }}
          >
            <h1 style={{ color: currentColor }}>{titre}</h1>
          </button>
          <Link
            to="/contact"
            state={{ backUrl: backUrl }}
            className={`slider__logo ${isVisible ? "" : "--hidden"}`}
          >
            <Logo currentColor={currentColor} />
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

export default SliderPrivate

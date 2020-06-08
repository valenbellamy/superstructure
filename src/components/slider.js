import React, { useEffect, useState } from "react"
import Video from "./video"
import { navigate } from "gatsby"
import ProgressBar from "./progressBar"

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
}) => {
  const limit = slides.length
  const dispatch = useGlobalDispatchContext()
  const [percentage, setPercentage] = useState(0)

  const indexClick = i => {
    changeLocalStorage(i)
  }

  const increment = () => {
    if (currentIndex === limit - 1) {
      dispatch({
        type: "CHANGE_COLOR",
        color: `${nextColor}`,
        index: 0,
      })
      navigate(`${nextSlug}`)
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

  return (
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
              />
              {!isShowingModal && (
                <h2 style={{ color: currentColor }}>{route.title}</h2>
              )}
            </div>
          ))}
        </div>
      </section>
      <ol
        className={`slider__indicators ${isShowingModal ? "--centered" : ""}`}
      >
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
  )
}

export default Slider

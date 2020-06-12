import React from "react"
import { navigate, Link } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"

//context
import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from "../context/globalContext"

const Nav = ({
  isShowingModal,
  currentColor,
  nextSlug,
  nextColor,
  isVisible,
  toggleModal,
  setIsHidden,
}) => {
  //const { currentColor } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()

  const nextProject = () => {
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
  }

  const navClasses = () => {
    if (!isVisible && !isShowingModal) {
      return "--hidden"
    } else {
      return ""
    }
  }

  return (
    <>
      {/* <button type="button" className="slider__controls --prev">
        <svg viewBox="0 0 187 374">
          <polygon points="605,1231.6 605,1204.4 591.4,1218 " />
          <g>
            <polygon
              fill={currentColor}
              points="65.9,187 187,65.9 187,-0.1 -0.1,187 187,374.1 187,308.1 	"
            />
          </g>
        </svg>
      </button> */}
      <button
        type="button"
        className={`slider__controls --next ${navClasses()}`}
        onClick={nextProject}
      >
        <svg viewBox="0 0 187 374">
          <polygon points="605,1231.6 605,1204.4 591.4,1218 " />
          <g>
            <polygon
              fill={currentColor}
              points="121,187 -0.1,308.1 -0.1,374.1 187,187 -0.1,-0.1 -0.1,65.8 	"
            />
          </g>
        </svg>
      </button>
      {/* <AniLink
        fade
        duration={1}
        className={`slider__controls --next ${navClasses()}`}
        onClick={nextProject}
        to={`${nextSlug}`}
      >
        <svg viewBox="0 0 187 374">
          <polygon points="605,1231.6 605,1204.4 591.4,1218 " />
          <g>
            <polygon
              fill={currentColor}
              points="121,187 -0.1,308.1 -0.1,374.1 187,187 -0.1,-0.1 -0.1,65.8 	"
            />
          </g>
        </svg>
      </AniLink> */}
    </>
  )
}

export default Nav

import React from "react"
import { navigate } from "gatsby"

//context
import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from "../context/globalContext"

const Nav = ({ currentColor, nextSlug, nextColor }) => {
  //const { currentColor } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()

  const nextProject = () => {
    dispatch({
      type: "CHANGE_COLOR",
      color: `${nextColor}`,
      index: 0,
    })
    navigate(`${nextSlug}`)
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
        className="slider__controls --next"
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
    </>
  )
}

export default Nav

import React from "react"

const ProgressBar = ({ color, percentage }) => {
  return (
    <div className="slider__progress">
      <div style={{ width: `${percentage}%`, backgroundColor: color }}></div>
    </div>
  )
}

export default ProgressBar

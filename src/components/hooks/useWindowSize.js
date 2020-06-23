import React, { useState, useLayoutEffect } from "react"

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0])

  function updateSize() {
    setSize([window.innerWidth, window.innerHeight])
  }

  useLayoutEffect(() => {
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])
  return size
}

export default useWindowSize

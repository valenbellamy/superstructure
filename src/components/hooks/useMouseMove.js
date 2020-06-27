import { useEffect, useState } from "react"

export const useMouseMove = initial => {
  const [visible, setVisible] = useState(initial ? initial : false)

  let timer = null

  const handleMouseMove = () => {
    setVisible(true)
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      setVisible(false)
    }, 3000)
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (timer) clearTimeout(timer)
    }
  }, [timer])

  return visible
}

export default useMouseMove

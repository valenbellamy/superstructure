import { useState } from "react"

//context
import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from "../../context/globalContext"

const useModal = () => {
  const { modalOpen } = useGlobalStateContext()
  // const [isShowing, setIsShowing] = useState(false)
  const [isShowing, setIsShowing] = useState(modalOpen)
  const dispatch = useGlobalDispatchContext()

  function toggle() {
    setIsShowing(!isShowing)
    dispatch({
      type: "TOGGLE_MODAL",
      modalOpen: !modalOpen,
    })
  }

  return {
    isShowing,
    toggle,
  }
}

export default useModal

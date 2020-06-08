import React, { useReducer, useContext, createContext } from "react"

const GlobalStateContext = createContext()
const GlobalDispatchContext = createContext()

const globalReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_COLOR": {
      return {
        ...state,
        currentColor: action.color,
        currentIndex: action.index,
        //backUrl: action.backUrl,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, {
    currentColor: null,
    currentIndex: null,
    //backUrl: null,
    //backUrl: '/'
    // currentColor:
    //   window.localStorage.getItem("color") === null
    //     ? ""
    //     : window.localStorage.getItem("color"),
    // currentIndex:
    //   window.localStorage.getItem("index") === null
    //     ? 0
    //     : parseInt(window.localStorage.getItem("index")),
  })

  return (
    <GlobalDispatchContext.Provider value={dispatch}>
      <GlobalStateContext.Provider value={state}>
        {children}
      </GlobalStateContext.Provider>
    </GlobalDispatchContext.Provider>
  )
}

//custom hooks for when we want to use our global state
export const useGlobalStateContext = () => useContext(GlobalStateContext)

export const useGlobalDispatchContext = () => useContext(GlobalDispatchContext)

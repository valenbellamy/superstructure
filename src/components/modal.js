import React, { useState, useEffect } from "react"
import Img from "gatsby-image"
import Logo from "./logo"
import RichContent from "./richContent"
import TransitionLink from "gatsby-plugin-transition-link"
import { TransitionState } from "gatsby-plugin-transition-link"
import useWindowSize from "./hooks/useWindowSize"

const TRANSITION_LENGTH = 1

const exitTransition = {
  length: TRANSITION_LENGTH,
  trigger: () => {
    if (document) {
      document.body.style.overflow = "hidden"
    }
  },
}

const entryTransition = {
  delay: TRANSITION_LENGTH,
  trigger: () => {
    if (document && window) {
      window.scrollTo(0, 0)
      document.body.style.overflow = "visible"
    }
  },
}

const Modal = ({
  isShowingModal,
  toggleModal,
  titre,
  currentColor,
  contenu,
  logoGauche,
  logoDroite,
  logoDroiteSmartphone,
  backUrl,
}) => {
  const [transition, setTransition] = useState(false)

  const [width, height] = useWindowSize()

  return (
    <TransitionState>
      {({ transitionStatus }) => (
        <>
          {isShowingModal && (
            <>
              <div
                className={`transition__wrapper ${
                  transition ? "--transition" : ""
                }`}
              ></div>
              <div className="modal">
                <div
                  className={`modal__overlay ${
                    isShowingModal ? "--visible" : ""
                  }`}
                />
                <div
                  className="modal__wrapper"
                  aria-modal
                  aria-hidden
                  tabIndex={-1}
                  role="dialog"
                  onClick={toggleModal}
                >
                  <div className="modal__content">
                    <div className="content">
                      <h1 style={{ color: currentColor }}>{titre}</h1>
                      <RichContent
                        contenu={contenu}
                        currentColor={currentColor}
                      />
                      {logoGauche && <Img fluid={logoGauche} />}
                    </div>
                    {width > 575 ? (
                      <>
                        {logoDroite && (
                          <div className="logos">
                            <Img fluid={logoDroite.fluid} />
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {logoDroiteSmartphone && (
                          <div className="logos">
                            <Img fluid={logoDroiteSmartphone.fluid} />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <TransitionLink
                to="/contact"
                exit={exitTransition}
                entry={entryTransition}
                state={{ backUrl: backUrl }}
                onClick={() => {
                  setTransition(true)
                }}
              >
                <div
                  className={`logo__wrapper ${
                    transition ? "--transition" : ""
                  }`}
                >
                  <Logo currentColor={transition ? "#000000" : currentColor} />
                </div>
              </TransitionLink>
            </>
          )}
        </>
      )}
    </TransitionState>
  )
}

export default Modal

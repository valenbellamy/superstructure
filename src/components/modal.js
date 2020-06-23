import React, { useState, useEffect } from "react"
import Img from "gatsby-image"
import Logo from "./logo"
import RichContent from "./richContent"
import TransitionLink from "gatsby-plugin-transition-link"
import { TransitionState } from "gatsby-plugin-transition-link"

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

  const [windowWidth, setWindowWidth] = useState("")

  useEffect(() => {
    window.addEventListener("resize", computeWindowWidth)
    return () => {
      window.removeEventListener("resize", computeWindowWidth)
    }
  }, [])

  const computeWindowWidth = () => {
    setWindowWidth(window.innerWidth)
  }

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
                    isShowingModal ? "visible" : ""
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
                    {windowWidth > 575 ? (
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
                    {/* {logoDroite && (
                      <div className="logos">
                        {logoDroite.map(logo => (
                          <Img key={logo.id} fluid={logo.fluid} />
                        ))}
                      </div>
                    )} */}
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

// modal without animation

// const Modal = ({
//   isShowingModal,
//   toggleModal,
//   content,
//   currentColor,
//   backUrl,
//   imgTest,
// }) => {
//   return (
//     <>
//       {isShowingModal && (
//         <>
//           <div className={`modal-overlay ${isShowingModal ? "visible" : ""}`} />
//           <div
//             className="modal-wrapper"
//             aria-modal
//             aria-hidden
//             tabIndex={-1}
//             role="dialog"
//             onClick={toggleModal}
//           >
//             <div className="modal">
//               <div className="content">
//                 <h1 style={{ color: currentColor }}>{content}</h1>
//                 <p style={{ color: currentColor }}>
//                   Sed porta odio at libero consectetur commodo. Suspendisse quis
//                   ligula sit amet leo porta viverra. Nullam maximus ex quis
//                   magna venenatis semper. Curabitur augue orci, pretium sed
//                   libero eu, sollicitudin porttitor ipsum. Curabitur in urna a
//                   dolor lobortis hendrerit sed ut metus.
//                 </p>
//                 <Img fluid={imgTest} />
//               </div>
//               <div className="logos">
//                 <Img fluid={imgTest} />
//                 <Img fluid={imgTest} />
//               </div>
//               <Link to="/contact" state={{ backUrl: backUrl }}>
//                 <Logo currentColor={currentColor} />
//               </Link>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   )
// }

// Modal with portal

// const Modal = ({
//   isShowingModal,
//   toggleModal,
//   content,
//   currentColor,
//   backUrl,
// }) =>
//   isShowingModal
//     ? ReactDOM.createPortal(
//         <React.Fragment>
//           <div className={`modal-overlay ${isShowingModal ? "visible" : ""}`} />
//           <div
//             className="modal-wrapper"
//             aria-modal
//             aria-hidden
//             tabIndex={-1}
//             role="dialog"
//             onClick={toggleModal}
//           >
//             <div className="modal">
//               <div>
//                 <h1 style={{ color: currentColor }}>{content}</h1>
//                 <p style={{ color: currentColor }}>
//                   Sed porta odio at libero consectetur commodo. Suspendisse quis
//                   ligula sit amet leo porta viverra. Nullam maximus ex quis
//                   magna venenatis semper. Curabitur augue orci, pretium sed
//                   libero eu, sollicitudin porttitor ipsum. Curabitur in urna a
//                   dolor lobortis hendrerit sed ut metus.
//                 </p>
//               </div>
//               <Link to="/contact" state={{ backUrl: backUrl }}>
//                 <Logo currentColor={currentColor} />
//               </Link>
//             </div>
//           </div>
//         </React.Fragment>,
//         document.body
//       )
//     : null

export default Modal

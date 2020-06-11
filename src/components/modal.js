import React, { useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import Img from "gatsby-image"
import Logo from "./logo"
import { Link } from "gatsby"
import TransitionLink from "gatsby-plugin-transition-link"
import { TransitionState } from "gatsby-plugin-transition-link"
import posed from "react-pose"

const TRANSITION_LENGTH = 1

// const LogoWrapper = posed.div({
//   exiting: {
//     y: ({ element }) => {
//       const distanceToTop = element.getBoundingClientRect().top
//       console.log(distanceToTop)
//       return distanceToTop * -1
//     },
//     transition: {
//       ease: [0.59, 0.01, 0.28, 1],
//       delay: 250,
//       duration: TRANSITION_LENGTH * 1000 - 250,
//     },
//   },
// })

const getTransitionStyles = {
  // entering: {
  //   position: `absolute`,
  //   opacity: 0,
  // },
  // entered: {
  //   transition: `opacity ${TRANSITION_LENGTH}ms ease-in-out`,
  //   opacity: 1,
  // },
  exiting: {
    transition: `all ${TRANSITION_LENGTH}s ease-in-out`,
    //opacity: 0,
    top: `0%`,
    //transform: `translate(0%, -500px)`,
  },
}

const FadingContent = posed.div({
  exiting: { opacity: 0 },
})

const exitTransition = {
  length: TRANSITION_LENGTH,
  trigger: () => {
    console.log("We are exiting")
    if (document) {
      document.body.style.overflow = "hidden"
    }
  },
}

const entryTransition = {
  delay: TRANSITION_LENGTH,
  trigger: () => {
    console.log("We are entering")
    if (document && window) {
      window.scrollTo(0, 0)
      document.body.style.overflow = "visible"
    }
  },
}

const Modal = ({
  isShowingModal,
  toggleModal,
  content,
  currentColor,
  backUrl,
  imgTest,
}) => {
  return (
    <TransitionState>
      {({ transitionStatus }) => (
        <>
          {isShowingModal && (
            <>
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
                      <h1 style={{ color: currentColor }}>{content}</h1>
                      <p style={{ color: currentColor }}>
                        Sed porta odio at libero consectetur commodo.
                        Suspendisse quis ligula sit amet leo porta viverra.
                        Nullam maximus ex quis magna venenatis semper. Curabitur
                        augue orci, pretium sed libero eu, sollicitudin
                        porttitor ipsum. Curabitur in urna a dolor lobortis
                        hendrerit sed ut metus.
                      </p>
                      <Img fluid={imgTest} />
                    </div>
                    <div className="logos">
                      <Img fluid={imgTest} />
                      <Img fluid={imgTest} />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`transition__wrapper ${
                  transitionStatus === "exiting" ? "--transition" : ""
                }`}
                onClick={toggleModal}
              ></div>
              <TransitionLink
                to="/contact"
                exit={exitTransition}
                entry={entryTransition}
                state={{ backUrl: backUrl }}
              >
                <div
                  className="logo__wrapper"
                  className={`logo__wrapper ${
                    transitionStatus === "exiting" ? "--transition" : ""
                  }`}
                >
                  <Logo
                    currentColor={
                      transitionStatus === "exiting" ? "#000000" : currentColor
                    }
                  />
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
